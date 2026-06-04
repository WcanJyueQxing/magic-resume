import * as pdfjsLib from "pdfjs-dist";
import type {
  PdfAnalysis,
  PdfMetadata,
  PdfPageInfo,
  PdfType,
} from "../types/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function parsePdf(
  file: File,
  onProgress?: (progress: number) => void,
): Promise<PdfAnalysis> {
  const startTime = Date.now();

  try {
    onProgress?.(10);

    const arrayBuffer = await file.arrayBuffer();
    const pdfData = new Uint8Array(arrayBuffer);

    onProgress?.(20);

    const pdf = await pdfjsLib.getDocument({
      data: pdfData,
      useSystemFonts: true,
    }).promise;

    onProgress?.(30);

    const isEncrypted = pdf.isEncrypted;

    if (isEncrypted) {
      const decryptResult = await pdf.decrypt("");
      if (decryptResult !== "success") {
        throw new Error("PDF is encrypted and requires a password");
      }
    }

    onProgress?.(40);

    const metadata = await extractMetadata(pdf);
    const totalPages = pdf.numPages;

    onProgress?.(50);

    const pages: PdfPageInfo[] = [];
    let textContent = "";

    for (let i = 1; i <= totalPages; i++) {
      const page = await pdf.getPage(i);
      onProgress?.(50 + (i / totalPages) * 40);

      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (ctx) {
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: ctx,
          viewport,
        };

        await page.render(renderContext).promise;
      }

      const pageText = await extractPageText(page);
      textContent += pageText + "\n\n";

      pages.push({
        index: i,
        width: viewport.width,
        height: viewport.height,
        canvas,
      });
    }

    onProgress?.(95);

    const isScanned = detectScannedPdf(textContent, totalPages);

    const analysis: PdfAnalysis = {
      totalPages,
      fileSize: file.size,
      isEncrypted,
      isScanned,
      textContent,
      metadata,
      pages,
    };

    onProgress?.(100);

    const endTime = Date.now();
    console.log(`PDF parsing completed in ${(endTime - startTime) / 1000}s`);

    return analysis;
  } catch (error) {
    console.error("PDF parsing error:", error);
    throw error;
  }
}

async function extractMetadata(
  pdf: pdfjsLib.PDFDocumentProxy,
): Promise<PdfMetadata> {
  const info = await pdf.getMetadata();

  return {
    title: info.info.Title || null,
    author: info.info.Author || null,
    subject: info.info.Subject || null,
    creator: info.info.Creator || null,
    producer: info.info.Producer || null,
    creationDate: info.info.CreationDate || null,
    modificationDate: info.info.ModDate || null,
  };
}

async function extractPageText(page: pdfjsLib.PDFPageProxy): Promise<string> {
  try {
    const textContent = await page.getTextContent();
    const items = textContent.items.filter(
      (item): item is pdfjsLib.TextItem => "str" in item && !!item.str.trim(),
    );

    if (items.length === 0) return "";

    // 基于文本项位置排序：先按 Y 坐标降序（PDF 坐标系 Y 轴向上），再按 X 坐标升序
    const sortedItems = [...items].sort((a, b) => {
      const yDiff = b.transform[5] - a.transform[5];
      if (Math.abs(yDiff) > 5) return yDiff;
      return a.transform[4] - b.transform[4];
    });

    const lines: string[] = [];
    let currentLine = "";
    let lastY: number | null = null;
    let lastX: number | null = null;

    sortedItems.forEach((item) => {
      const y = item.transform[5];
      const x = item.transform[4];
      const str = item.str;

      // Y 坐标差值大于阈值时，认为是新行
      if (lastY !== null && Math.abs(y - lastY) > 5) {
        if (currentLine.trim()) {
          lines.push(currentLine.trim());
        }
        currentLine = "";
      }

      // 检测列表项符号（•、-、▪、●、○ 等）
      const isBulletPoint = /^[•\-▪●○►▸]\s*/.test(str);

      // 如果是列表项开头，添加换行
      if (isBulletPoint && currentLine.trim()) {
        lines.push(currentLine.trim());
        currentLine = "";
      }

      // X 坐标判断：如果间距较大，添加空格；否则直接拼接
      if (currentLine && lastX !== null && x - lastX > 10) {
        currentLine += " " + str;
      } else if (currentLine) {
        currentLine += str;
      } else {
        currentLine = str;
      }

      lastY = y;
      lastX = x + (item.width || 0);
    });

    if (currentLine.trim()) {
      lines.push(currentLine.trim());
    }

    return lines.join("\n");
  } catch {
    return "";
  }
}

/**
 * 从 PDF 页面中提取文本项并按位置排序合并为行
 * 此函数可被其他模块复用，确保文本提取逻辑一致
 */
export async function extractTextFromPdfPage(
  page: pdfjsLib.PDFPageProxy,
): Promise<string> {
  return extractPageText(page);
}

/**
 * 从多个 PDF 页面中提取全部文本
 */
export async function extractAllTextFromPdf(
  pdf: pdfjsLib.PDFDocumentProxy,
): Promise<string> {
  const allLines: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const pageText = await extractPageText(page);
    if (pageText.trim()) {
      allLines.push(pageText);
    }
  }

  return allLines.join("\n\n");
}

/**
 * 从 PDF 中提取图片
 * 返回 Base64 编码的图片数组
 */
export async function extractImagesFromPdf(
  pdf: pdfjsLib.PDFDocumentProxy,
): Promise<
  Array<{ data: string; width: number; height: number; pageIndex: number }>
> {
  const images: Array<{
    data: string;
    width: number;
    height: number;
    pageIndex: number;
  }> = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const operatorList = await page.getOperatorList();

    for (let j = 0; j < operatorList.fnArray.length; j++) {
      // OPS.paintImageXObject = 85
      if (operatorList.fnArray[j] === 85) {
        const imgIndex = operatorList.argsArray[j][0];
        try {
          const imgData = await page.objs.get(imgIndex);
          if (imgData && imgData.bitmap) {
            // 将 ImageBitmap 转换为 Base64
            const canvas = document.createElement("canvas");
            canvas.width = imgData.width || imgData.bitmap.width;
            canvas.height = imgData.height || imgData.bitmap.height;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(imgData.bitmap, 0, 0);
              const base64 = canvas.toDataURL("image/png");
              images.push({
                data: base64,
                width: canvas.width,
                height: canvas.height,
                pageIndex: i - 1,
              });
            }
          }
        } catch (e) {
          // 某些图片可能无法提取，忽略错误
          console.warn(
            `Failed to extract image ${imgIndex} from page ${i}:`,
            e,
          );
        }
      }
    }
  }

  return images;
}

function detectScannedPdf(textContent: string, totalPages: number): boolean {
  const avgCharsPerPage = textContent.length / totalPages;
  const hasReasonableText = avgCharsPerPage > 50;

  return !hasReasonableText && totalPages > 0;
}

export function getPdfType(analysis: PdfAnalysis): PdfType {
  if (analysis.isEncrypted) return "encrypted";
  if (analysis.isScanned) return "scanned";
  return "text";
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
