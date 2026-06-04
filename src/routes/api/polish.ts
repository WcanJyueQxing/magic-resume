import { createFileRoute } from "@tanstack/react-router";
import { AIModelType } from "@/config/ai";

const BACKEND_URL = "http://localhost:8000";

export const Route = createFileRoute("/api/polish")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { apiKey, model, content, modelType, apiEndpoint, customInstructions } = body as {
            apiKey: string;
            model: string;
            content: string;
            modelType: AIModelType;
            apiEndpoint?: string;
            customInstructions?: string;
          };

          const response = await fetch(`${BACKEND_URL}/api/polish`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              content,
              provider: modelType,
              model_id: model,
              api_endpoint: apiEndpoint,
              custom_instructions: customInstructions
            })
          });

          if (!response.ok) {
            const errorData = await response.json();
            return Response.json(
              { error: errorData },
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
                    if (!trimmed.startsWith("data:")) continue;

                    try {
                      const payload = trimmed.slice(5).trim();
                      if (!payload || payload === "[DONE]") continue;

                      controller.enqueue(encoder.encode(payload));
                    } catch (e) {
                      console.error("Error parsing stream:", e);
                    }
                  }
                }

                controller.close();
              } catch (error) {
                console.error("Stream reading error:", error);
                controller.error(error);
              }
            }
          });

          return new Response(stream, {
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              Connection: "keep-alive"
            }
          });
        } catch (error) {
          console.error("Polish error:", error);
          return Response.json(
            { error: { message: "Failed to polish content" } },
            { status: 500 }
          );
        }
      }
    }
  }
});
