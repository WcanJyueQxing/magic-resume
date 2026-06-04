import { createFileRoute } from "@tanstack/react-router";
import { exec } from "child_process";
import { writeFile, readFile, mkdir, rm, readdir, stat, access } from "fs/promises";
import { join, basename } from "path";
import { tmpdir } from "os";
import { randomUUID } from "crypto";

interface MinerUResult {
  text: string;
  images: Array<{
    data: string;
    name: string;
  }>;
  contentList: any[];
}

/**
 * 检查 MinerU 是否已安装
 */
async function checkMinerUInstalled(): Promise<boolean> {
  return new Promise((resolve) => {
    exec("magic-pdf --version", { timeout: 10000 }, (error, stdout) => {
      if (error) {
        console.error("MinerU not installed:", error.message);
        resolve(false);
        return;
      }
      console.log("MinerU version:", stdout.trim());
      resolve(true);
    });
  });
}

/**
 * 运行 MinerU 命令
 */
async function runMinerU(pdfPath: string, outputDir: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // 使用 -m auto 模式，自动检测 PDF 类型
    const cmd = `magic-pdf -p "${pdfPath}" -o "${outputDir}" -m auto`;
    console.log("Running MinerU command:", cmd);

    exec(cmd, { timeout: 180000, maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
      console.log("MinerU stdout:", stdout);
      console.log("MinerU stderr:", stderr);

      if (error) {
        console.error("MinerU error:", error);
        reject(new Error(`MinerU 执行失败: ${stderr || error.message}`));
        return;
      }

      // 返回标准输出，用于调试
      resolve(stdout || stderr || "");
    });
  });
}

/**
 * 递归查找文件
 */
async function findFile(dir: string, filename: string): Promise<string | null> {
  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        const found = await findFile(fullPath, filename);
        if (found) return found;
      } else if (entry.name === filename || entry.name.endsWith(filename)) {
        return fullPath;
      }
    }
  } catch (e) {
    // 忽略错误
  }

  return null;
}

/**
 * 递归查找所有图片文件
 */
async function findImages(dir: string): Promise<Array<{ path: string; name: string }>> {
  const images: Array<{ path: string; name: string }> = [];

  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        const subImages = await findImages(fullPath);
        images.push(...subImages);
      } else if (/\.(png|jpg|jpeg|gif|bmp)$/i.test(entry.name)) {
        images.push({ path: fullPath, name: entry.name });
      }
    }
  } catch (e) {
    // 忽略错误
  }

  return images;
}

/**
 * 读取 MinerU 输出文件
 * MinerU 输出目录结构:
 * <output_dir>/
 * └── <pdf_filename>/
 *     ├── auto/  (or "txt"/"ocr" depending on method)
 *     │   ├── images/           # Extracted images from the PDF
 *     │   ├── content_list.json # Structured content list
 *     │   ├── full_content.md   # Full content in Markdown format
 *     │   └── ...
 *     └── ...
 */
async function readOutputFiles(outputDir: string): Promise<MinerUResult> {
  const result: MinerUResult = {
    text: "",
    images: [],
    contentList: [],
  };

  console.log("Reading output from:", outputDir);

  try {
    // 列出输出目录内容
    const entries = await readdir(outputDir, { withFileTypes: true });
    console.log("Output directory contents:", entries.map(e => e.name));

    // 查找实际的输出目录（可能是 <pdf_filename>/auto/ 或 <pdf_filename>/txt/）
    let actualOutputDir = outputDir;

    // 检查是否有子目录结构
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const subDir = join(outputDir, entry.name);
        const subEntries = await readdir(subDir, { withFileTypes: true });

        // 检查是否有 auto/txt/ocr 子目录
        for (const subEntry of subEntries) {
          if (subEntry.isDirectory() && (subEntry.name === "auto" || subEntry.name === "txt" || subEntry.name === "ocr")) {
            actualOutputDir = join(subDir, subEntry.name);
            console.log("Found actual output dir:", actualOutputDir);
            break;
          }
        }

        // 如果没有找到 auto/txt/ocr，检查当前子目录是否有输出文件
        if (actualOutputDir === outputDir) {
          const hasOutputFiles = subEntries.some(e =>
            e.name.endsWith(".md") || e.name.endsWith(".json") || e.name === "images"
          );
          if (hasOutputFiles) {
            actualOutputDir = subDir;
            console.log("Found output dir (direct):", actualOutputDir);
          }
        }
      }
    }

    console.log("Using output dir:", actualOutputDir);

    // 重新列出实际输出目录的内容
    const outputEntries = await readdir(actualOutputDir, { withFileTypes: true });
    console.log("Actual output directory contents:", outputEntries.map(e => e.name));

    // 查找 Markdown 文件
    const mdFiles = outputEntries.filter(e => e.name.endsWith(".md"));
    if (mdFiles.length > 0) {
      // 优先使用 full_content.md
      const fullContentFile = mdFiles.find(e => e.name.includes("full_content"));
      const mdFile = fullContentFile || mdFiles[0];
      const mdPath = join(actualOutputDir, mdFile.name);
      result.text = await readFile(mdPath, "utf-8");
      console.log("Found markdown file:", mdPath, "Length:", result.text.length);
    } else {
      // 递归查找
      const mdPath = await findFile(actualOutputDir, ".md");
      if (mdPath) {
        result.text = await readFile(mdPath, "utf-8");
        console.log("Found markdown file (recursive):", mdPath, "Length:", result.text.length);
      }
    }

    // 查找 content_list.json
    const jsonFiles = outputEntries.filter(e => e.name.endsWith(".json"));
    if (jsonFiles.length > 0) {
      const jsonPath = join(actualOutputDir, jsonFiles[0].name);
      const jsonContent = await readFile(jsonPath, "utf-8");
      result.contentList = JSON.parse(jsonContent);
      console.log("Found JSON file:", jsonPath, "Items:", result.contentList.length);
    } else {
      // 递归查找
      const jsonPath = await findFile(actualOutputDir, ".json");
      if (jsonPath) {
        const jsonContent = await readFile(jsonPath, "utf-8");
        result.contentList = JSON.parse(jsonContent);
        console.log("Found JSON file (recursive):", jsonPath, "Items:", result.contentList.length);
      }
    }

    // 查找图片目录
    const imagesDir = join(actualOutputDir, "images");
    try {
      await access(imagesDir);
      const imageFiles = await readdir(imagesDir);
      console.log("Found images directory:", imagesDir, "Files:", imageFiles.length);

      for (const imgFile of imageFiles) {
        if (/\.(png|jpg|jpeg|gif|bmp)$/i.test(imgFile)) {
          try {
            const imgPath = join(imagesDir, imgFile);
            const imgBuffer = await readFile(imgPath);
            const ext = imgFile.split(".").pop()?.toLowerCase() || "png";
            const mimeType = ext === "jpg" ? "image/jpeg" : `image/${ext}`;
            result.images.push({
              data: `data:${mimeType};base64,${imgBuffer.toString("base64")}`,
              name: imgFile,
            });
          } catch (e) {
            console.warn("Failed to read image:", imgFile, e);
          }
        }
      }
    } catch (e) {
      // 如果没有 images 目录，递归查找所有图片
      console.log("No images directory found, searching recursively...");
      const imageFiles = await findImages(actualOutputDir);
      console.log("Found images (recursive):", imageFiles.length);

      for (const img of imageFiles) {
        try {
          const imgBuffer = await readFile(img.path);
          const ext = img.name.split(".").pop()?.toLowerCase() || "png";
          const mimeType = ext === "jpg" ? "image/jpeg" : `image/${ext}`;
          result.images.push({
            data: `data:${mimeType};base64,${imgBuffer.toString("base64")}`,
            name: img.name,
          });
        } catch (e) {
          console.warn("Failed to read image:", img.path, e);
        }
      }
    }
  } catch (error) {
    console.error("Error reading output files:", error);
  }

  return result;
}

/**
 * 使用 PyMuPDF 提取 PDF 内容（后备方案）
 */
async function extractWithPyMuPDF(pdfPath: string): Promise<MinerUResult> {
  const result: MinerUResult = {
    text: "",
    images: [],
    contentList: [],
  };

  try {
    // 使用 Python 脚本提取文本
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
        # 提取文本
        page_text = page.get_text()
        if page_text.strip():
            text += page_text + "\\n\\n"

        # 提取图片
        image_list = page.get_images()
        for img_index, img in enumerate(image_list):
            xref = img[0]
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

        # 添加到内容列表
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
    const tempScript = join(tmpdir(), `pymupdf_extract_${randomUUID()}.py`);
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
  } catch (error) {
    console.error("PyMuPDF extraction failed:", error);
  }

  return result;
}

export const Route = createFileRoute("/api/mineru-parse")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let tempDir = "";

        try {
          const formData = await request.formData();
          const file = formData.get("pdf") as File | null;

          if (!file) {
            return Response.json(
              { error: "未提供 PDF 文件" },
              { status: 400 }
            );
          }

          console.log("Processing PDF:", file.name, "Size:", file.size);

          // 创建临时目录
          const jobId = randomUUID();
          tempDir = join(tmpdir(), `mineru-${jobId}`);
          await mkdir(tempDir, { recursive: true });

          // 保存上传的 PDF 文件
          const pdfBuffer = Buffer.from(await file.arrayBuffer());
          const pdfPath = join(tempDir, file.name);
          await writeFile(pdfPath, pdfBuffer);
          console.log("Saved PDF to:", pdfPath);

          let result: MinerUResult = {
            text: "",
            images: [],
            contentList: [],
          };

          // 尝试使用 MinerU
          const isInstalled = await checkMinerUInstalled();
          if (isInstalled) {
            try {
              const outputDir = join(tempDir, "output");
              await mkdir(outputDir, { recursive: true });

              console.log("Starting MinerU...");
              const mineruOutput = await runMinerU(pdfPath, outputDir);
              console.log("MinerU completed.");

              result = await readOutputFiles(outputDir);
            } catch (mineruError) {
              console.warn("MinerU failed, falling back to PyMuPDF:", mineruError);
            }
          }

          // 如果 MinerU 失败或未安装，使用 PyMuPDF
          if (!result.text && result.images.length === 0) {
            console.log("Using PyMuPDF as fallback...");
            result = await extractWithPyMuPDF(pdfPath);
          }

          // 如果仍然没有提取到内容，返回错误
          if (!result.text && result.images.length === 0) {
            return Response.json(
              {
                error: "未能提取任何内容。请检查 PDF 文件是否有效。",
              },
              { status: 422 }
            );
          }

          console.log("Extracted text length:", result.text.length);
          console.log("Extracted images:", result.images.length);

          return Response.json({
            success: true,
            text: result.text,
            images: result.images,
            contentList: result.contentList,
          });
        } catch (error) {
          console.error("PDF parse error:", error);
          return Response.json(
            {
              error: error instanceof Error ? error.message : "PDF 解析失败",
            },
            { status: 500 }
          );
        } finally {
          // 清理临时目录
          if (tempDir) {
            try {
              await rm(tempDir, { recursive: true, force: true });
              console.log("Cleaned up temp dir:", tempDir);
            } catch (e) {
              console.warn("Failed to clean temp dir:", e);
            }
          }
        }
      },
    },
  },
});
