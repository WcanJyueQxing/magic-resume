import type { ParsedResumeData } from "./pdfResumeParser";

export interface MinerUExtractResult {
  success: boolean;
  markdown: string;
  text: string;
  error?: string;
}

export async function extractPdfWithMinerU(
  file: File,
): Promise<MinerUExtractResult> {
  try {
    const { MinerU } = await import("mineru-open-sdk");

    const client = new MinerU();

    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: "application/pdf" });

    const result = await client.flashExtract(blob);

    if (result.error) {
      return {
        success: false,
        markdown: "",
        text: "",
        error: result.error,
      };
    }

    const textContent = extractTextFromMarkdown(result.markdown || "");

    return {
      success: true,
      markdown: result.markdown || "",
      text: textContent,
    };
  } catch (error) {
    console.error("MinerU extraction failed (browser not supported):", error);
    return {
      success: false,
      markdown: "",
      text: "",
      error: "MinerU 在浏览器环境中暂不支持，请使用其他解析方式",
    };
  }
}

function extractTextFromMarkdown(markdown: string): string {
  let text = markdown;

  text = text.replace(/```[\s\S]*?```/g, "");
  text = text.replace(/`[^`]+`/g, "");
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  text = text.replace(/\*\*/g, "");
  text = text.replace(/\*/g, "");
  text = text.replace(/#+/g, "");
  text = text.replace(/---+/g, "");
  text = text.replace(/>\s*/g, "");
  text = text.replace(/\n{3,}/g, "\n\n");
  text = text.replace(/^\s+|\s+$/g, "");

  return text;
}

export async function parseResumeFromMinerU(
  file: File,
): Promise<ParsedResumeData> {
  const { parseResumeFromText } = await import("./pdfResumeParser");

  const result = await extractPdfWithMinerU(file);

  if (!result.success) {
    return {
      education: [],
      experience: [],
      projects: [],
      skills: [],
      summary: "",
      fullText: "",
    };
  }

  return parseResumeFromText(result.text);
}
