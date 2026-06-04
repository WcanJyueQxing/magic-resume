import { createFileRoute } from "@tanstack/react-router";
import { exec } from "child_process";
import { writeFile, readFile, mkdir, rm, readdir, stat, access } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { randomUUID } from "crypto";

interface PdfParseResult {
  text: string;
  images: Array<{
    data: string;
    name: string;
  }>;
  contentList: any[];
  method: "mineru" | "pymupdf" | "pdfjs";
}

/**
 * 检查 MinerU 是否已安装
 */
async function checkMinerUInstalled(): Promise<boolean> {
  return new Promise((resolve) => {
    exec("magic-pdf --version", { timeout: 10000 }, (error) => {
      resolve(!error);
    });
  });
}

/**
 * 使用 MinerU 解析 PDF
 */
async function parseWithMinerU(pdfPath: string, outputDir: string): Promise<PdfParseResult> {
  const result: PdfParseResult = {
    text: "",
    images: [],
    contentList: [],
    method: "mineru",
  };

  return new Promise((resolve, reject) => {
    const cmd = `magic-pdf -p "${pdfPath}" -o "${outputDir}" -m auto`;
    console.log("Running MinerU:", cmd);

    exec(cmd, { timeout: 180000 }, async (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`MinerU failed: ${stderr || error.message}`));
        return;
      }

      try {
        // 查找输出文件
        const entries = await readdir(outputDir, { withFileTypes: true });

        // 查找实际输出目录
        let actualDir = outputDir;
        for (const entry of entries) {
          if (entry.isDirectory()) {
            const subDir = join(outputDir, entry.name);
            const subEntries = await readdir(subDir);
            if (subEntries.some(e => e.endsWith(".md") || e.endsWith(".json"))) {
              actualDir = subDir;
              break;
            }
          }
        }

        // 读取 Markdown 文件
        const mdFiles = (await readdir(actualDir)).filter(e => e.endsWith(".md"));
        if (mdFiles.length > 0) {
          result.text = await readFile(join(actualDir, mdFiles[0]), "utf-8");
        }

        // 读取 JSON 文件
        const jsonFiles = (await readdir(actualDir)).filter(e => e.endsWith(".json"));
        if (jsonFiles.length > 0) {
          const jsonContent = await readFile(join(actualDir, jsonFiles[0]), "utf-8");
          result.contentList = JSON.parse(jsonContent);
        }

        // 读取图片
        const imagesDir = join(actualDir, "images");
        try {
          await access(imagesDir);
          const imgFiles = (await readdir(imagesDir)).filter(e => /\.(png|jpg|jpeg)$/i.test(e));
          for (const imgFile of imgFiles) {
            const imgBuffer = await readFile(join(imagesDir, imgFile));
            const ext = imgFile.split(".").pop()?.toLowerCase() || "png";
            const mime = ext === "jpg" ? "image/jpeg" : `image/${ext}`;
            result.images.push({
              data: `data:${mime};base64,${imgBuffer.toString("base64")}`,
              name: imgFile,
            });
          }
        } catch (e) {
          // 没有图片目录
        }

        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  });
}

/**
 * 使用 PyMuPDF 解析 PDF
 */
async function parseWithPyMuPDF(pdfPath: string): Promise<PdfParseResult> {
  const result: PdfParseResult = {
    text: "",
    images: [],
    contentList: [],
    method: "pymupdf",
  };

  const pythonScript = `
import fitz
import json
import base64
import sys

def extract_pdf_content(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    images = []
    content_list = []

    for page_num, page in enumerate(doc):
        page_text = page.get_text()
        if page_text.strip():
            text += page_text + "\\n\\n"

        image_list = page.get_images()
        for img_index, img in enumerate(image_list):
            xref = img[0]
            try:
                base_image = doc.extract_image(xref)
                if base_image:
                    img_bytes = base_image["image"]
                    img_ext = base_image["ext"]
                    img_base64 = base64.b64encode(img_bytes).decode("utf-8")
                    mime_type = f"image/{img_ext}" if img_ext != "jpg" else "image/jpeg"
                    images.append({
                        "data": f"data:{mime_type};base64,{img_base64}",
                        "name": f"image_{page_num}_{img_index}.{img_ext}"
                    })
            except:
                pass

        content_list.append({
            "type": "text",
            "text": page_text,
            "page": page_num
        })

    return {
        "text": text.strip(),
        "images": images,
        "contentList": content_list
    }

pdf_path = sys.argv[1]
result = extract_pdf_content(pdf_path)
print(json.dumps(result))
`;

  const { execSync } = await import("child_process");
  const tempScript = join(tmpdir(), `pymupdf_${randomUUID()}.py`);
  await writeFile(tempScript, pythonScript);

  try {
    const output = execSync(`python "${tempScript}" "${pdfPath}"`, {
      timeout: 60000,
      encoding: "utf-8",
    });

    const parsed = JSON.parse(output.trim());
    result.text = parsed.text || "";
    result.images = parsed.images || [];
    result.contentList = parsed.contentList || [];
  } finally {
    await rm(tempScript, { force: true });
  }

  return result;
}

/**
 * 使用 pdfjs-dist 解析 PDF（客户端方式的服务端实现）
 */
async function parseWithPdfJs(pdfPath: string): Promise<PdfParseResult> {
  const result: PdfParseResult = {
    text: "",
    images: [],
    contentList: [],
    method: "pdfjs",
  };

  // 使用 PyMuPDF 作为 pdfjs 的服务端等效实现
  return parseWithPyMuPDF(pdfPath);
}

export const Route = createFileRoute("/api/pdf-parse")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let tempDir = "";

        try {
          const formData = await request.formData();
          const file = formData.get("pdf") as File | null;
          const method = (formData.get("method") as string) || "auto";

          if (!file) {
            return Response.json(
              { error: "未提供 PDF 文件" },
              { status: 400 }
            );
          }

          console.log("Processing PDF:", file.name, "Size:", file.size, "Method:", method);

          // 创建临时目录
          const jobId = randomUUID();
          tempDir = join(tmpdir(), `pdf-parse-${jobId}`);
          await mkdir(tempDir, { recursive: true });

          // 保存上传的 PDF 文件
          const pdfBuffer = Buffer.from(await file.arrayBuffer());
          const pdfPath = join(tempDir, file.name);
          await writeFile(pdfPath, pdfBuffer);

          let result: PdfParseResult = {
            text: "",
            images: [],
            contentList: [],
            method: "pdfjs",
          };

          // 根据选择的方法解析
          if (method === "mineru" || method === "auto") {
            // 尝试使用 MinerU
            const isMinerUInstalled = await checkMinerUInstalled();
            if (isMinerUInstalled) {
              try {
                const outputDir = join(tempDir, "output");
                await mkdir(outputDir, { recursive: true });
                result = await parseWithMinerU(pdfPath, outputDir);
              } catch (mineruError) {
                console.warn("MinerU failed:", mineruError);
                if (method === "mineru") {
                  throw mineruError;
                }
              }
            } else if (method === "mineru") {
              throw new Error("MinerU 未安装");
            }
          }

          // 如果 MinerU 失败或选择了其他方法
          if (!result.text) {
            if (method === "pymupdf" || method === "auto") {
              try {
                result = await parseWithPyMuPDF(pdfPath);
              } catch (pymupdfError) {
                console.warn("PyMuPDF failed:", pymupdfError);
                if (method === "pymupdf") {
                  throw pymupdfError;
                }
              }
            }
          }

          // 如果仍然没有内容
          if (!result.text && result.images.length === 0) {
            return Response.json(
              { error: "未能提取任何内容" },
              { status: 422 }
            );
          }

          console.log("Parsed with method:", result.method);
          console.log("Text length:", result.text.length);
          console.log("Images:", result.images.length);

          return Response.json({
            success: true,
            text: result.text,
            images: result.images,
            contentList: result.contentList,
            method: result.method,
          });
        } catch (error) {
          console.error("PDF parse error:", error);
          return Response.json(
            { error: error instanceof Error ? error.message : "PDF 解析失败" },
            { status: 500 }
          );
        } finally {
          if (tempDir) {
            try {
              await rm(tempDir, { recursive: true, force: true });
            } catch (e) {
              console.warn("Failed to clean temp dir:", e);
            }
          }
        }
      },
    },
  },
});
