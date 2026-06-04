import { createFileRoute } from "@tanstack/react-router";

interface DocumentParseResult {
  text: string;
  success: boolean;
}

// 配置后端 API 地址
const BACKEND_API = "http://localhost:8000/api";

export const Route = createFileRoute("/api/document-parse")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const formData = await request.formData();
          const file = formData.get("file") as File | null;
          const type = (formData.get("type") as string) || "word";

          if (!file) {
            return Response.json({ error: "未提供文件" }, { status: 400 });
          }

          console.log(
            "Processing document:",
            file.name,
            "Size:",
            file.size,
            "Type:",
            type,
          );

          // 创建新的 FormData 用于上传到后端
          const backendFormData = new FormData();
          backendFormData.append("file", file);

          console.log(`Uploading file: ${file.name}, size: ${file.size} bytes, type: ${file.type}`);

          // 上传到后端
          const uploadResponse = await fetch(`${BACKEND_API}/files/upload`, {
            method: "POST",
            body: backendFormData,
          });

          if (!uploadResponse.ok) {
            const errorData = await uploadResponse.json();
            console.error("Upload failed:", errorData);
            throw new Error(errorData.detail || "文件上传失败");
          }

          const uploadResult = await uploadResponse.json();
          console.log("File uploaded successfully, result:", uploadResult);

          // 内容已经在上传响应中返回，无需再次调用 extract
          const text = uploadResult.content || "";
          console.log(`Extracted text length: ${text.length}`);

          if (!text.trim()) {
            console.warn("Empty content extracted from file");
            return Response.json(
              { error: "未能提取任何内容" },
              { status: 422 },
            );
          }

          console.log("Extracted text length:", text.length);

          return Response.json({
            success: true,
            text: text,
          });
        } catch (error) {
          console.error("Document parse error:", error);
          return Response.json(
            { error: error instanceof Error ? error.message : "文档解析失败" },
            { status: 500 },
          );
        }
      },
    },
  },
});
