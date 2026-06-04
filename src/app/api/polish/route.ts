import { NextResponse } from "next/server";
import { AIModelType } from "@/config/ai";
import { AI_MODEL_CONFIGS } from "@/config/ai";

const parseUpstreamError = (raw: string, fallback: string) => {
  if (!raw) return { message: fallback };
  try {
    const data = JSON.parse(raw) as {
      error?: { message?: string; code?: string };
      message?: string;
    };
    return {
      message: data.error?.message || data.message || fallback,
      code: data.error?.code
    };
  } catch {
    return { message: raw };
  }
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { apiKey, model, content, modelType, apiEndpoint, customInstructions } = body;

    const modelConfig = AI_MODEL_CONFIGS[modelType as AIModelType];
    if (!modelConfig) {
      throw new Error("Invalid model type");
    }

    // Check if it's Ollama model
    const isOllama = modelType === "ollama";

    let response: Response;
    let requestBody: any;

    const systemPrompt = `你是一个专业的简历优化助手。请帮助优化以下文本，使其更加专业和有吸引力。
              
              优化原则：
              1. 使用更专业的词汇和表达方式
              2. 突出关键成就和技能
              3. 保持简洁清晰
              4. 使用主动语气
              5. 保持原有信息的完整性
              6. 保留我输入的格式

              输出强约束（必须遵守）：
              1. 只能输出“润色后的正文内容”本身。
              2. 禁止输出任何前言、说明、总结、附加建议。
              3. 禁止出现这类引导语：如“以下是...”“根据您提供...”“这是...”“特点：”“说明：”“总结：”等。
              4. 禁止新增与原文无关的章节标题或收尾段落。
              5. 不要使用 Markdown 代码块（\`\`\`）包裹结果。
              6. 若你产生了解释性内容，必须在输出前自检并删除，只保留最终正文。${customInstructions ? `\n\n用户自定义指令：${customInstructions}` : ''}`;

    if (isOllama) {
      // Ollama uses a different format
      requestBody = {
        model: modelConfig.requiresModelId ? model : modelConfig.defaultModel,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content,
          },
        ],
        stream: true,
      };
      
      response = await fetch(modelConfig.url(apiEndpoint), {
        method: "POST",
        headers: modelConfig.headers(apiKey),
        body: JSON.stringify(requestBody),
      });
    } else {
      // Original format for other models
      response = await fetch(modelConfig.url(apiEndpoint), {
        method: "POST",
        headers: modelConfig.headers(apiKey),
        body: JSON.stringify({
          model: modelConfig.requiresModelId ? model : modelConfig.defaultModel,
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content,
            },
          ],
          stream: true,
        }),
      });
    }

    if (!response.ok) {
      const fallbackMessage = `Upstream API error: ${response.status} ${response.statusText}`;
      const rawError = await response.text();
      const parsedError = parseUpstreamError(rawError, fallbackMessage);
      return NextResponse.json(
        { error: parsedError },
        { status: response.status }
      );
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        if (!response.body) {
          controller.close();
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let pending = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }

            pending += decoder.decode(value, { stream: true });
            const lines = pending.split(/\r?\n/);
            pending = lines.pop() ?? "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed) continue;

              try {
                if (isOllama) {
                  // Ollama uses different format
                  const data = JSON.parse(trimmed) as {
                    done?: boolean;
                    message?: { content?: string };
                  };
                  
                  if (data.done) continue;
                  
                  const content = data.message?.content;
                  if (content) {
                    controller.enqueue(encoder.encode(content));
                  }
                } else {
                  // Original OpenAI format
                  if (!trimmed.startsWith("data:")) continue;
                  
                  const payload = trimmed.slice(5).trim();
                  if (!payload || payload === "[DONE]") continue;

                  const data = JSON.parse(payload) as {
                    error?: { message?: string };
                    choices?: Array<{ delta?: { content?: string } }>;
                  };
                  if (data.error?.message) {
                    controller.error(new Error(data.error.message));
                    return;
                  }

                  const content = data.choices?.[0]?.delta?.content;
                  if (content) {
                    controller.enqueue(encoder.encode(content));
                  }
                }
              } catch (e) {
                console.error("Error parsing JSON:", e);
              }
            }
          }

          // Process remaining data if needed
          const tail = (pending + decoder.decode()).trim();
          if (tail) {
            try {
              if (isOllama) {
                const data = JSON.parse(tail);
                const content = data.message?.content;
                if (content && !data.done) {
                  controller.enqueue(encoder.encode(content));
                }
              } else {
                if (tail.startsWith("data:")) {
                  const payload = tail.slice(5).trim();
                  if (payload && payload !== "[DONE]") {
                    const data = JSON.parse(payload) as {
                      choices?: Array<{ delta?: { content?: string } }>;
                    };
                    const content = data.choices?.[0]?.delta?.content;
                    if (content) {
                      controller.enqueue(encoder.encode(content));
                    }
                  }
                }
              }
            } catch (e) {
              console.error("Error parsing tail data:", e);
            }
          }

          controller.close();
        } catch (error) {
          console.error("Stream reading error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Polish error:", error);
    return NextResponse.json(
      { error: "Failed to polish content" },
      { status: 500 }
    );
  }
}

export const runtime = "edge";
