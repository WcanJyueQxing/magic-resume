import { useEffect, useState, useRef } from "react";
import { Loader2, Sparkles, AlertCircle, X } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "@/i18n/compat/client";
import { Streamdown } from "streamdown";
import "streamdown/styles.css";
import { createMarkdownExit } from "markdown-exit";
import TurndownService from "turndown";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAIConfigStore } from "@/store/useAIConfigStore";
import { AI_MODEL_CONFIGS } from "@/config/ai";
import { cn } from "@/lib/utils";

interface AIPolishDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: string;
  onApply: (content: string) => void;
}

// AI 错误信息结构
interface AIErrorResponse {
  error?: {
    code?: string;
    message?: string;
    detail?: string;
    provider?: string;
  };
  message?: string;
}

// markdown-exit 实例，用于将 AI 返回的 Markdown 转换为 Tiptap 兼容的 HTML
const md = createMarkdownExit({
  html: true,       // 允许 HTML 标签透传
  breaks: true,     // 将换行符转换为 <br>
  linkify: false,   // 简历内容不需要自动识别链接
});

// turndown 实例，用于将 Tiptap HTML 转换为 Markdown 发给 AI
const turndownService = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
});

export default function AIPolishDialog({
  open,
  onOpenChange,
  content,
  onApply
}: AIPolishDialogProps) {
  const t = useTranslations("aiPolishDialog");
  const [isPolishing, setIsPolishing] = useState(false);
  const [polishedContent, setPolishedContent] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");
  const [error, setError] = useState<{ message: string; detail?: string; code?: string } | null>(null);
  const {
    selectedModel,
    doubaoApiKey,
    doubaoModelId,
    deepseekApiKey,
    deepseekModelId,
    openaiApiKey,
    openaiModelId,
    openaiApiEndpoint,
    geminiApiKey,
    geminiModelId,
    ollamaApiEndpoint,
    ollamaModelId,
    isConfigured
  } = useAIConfigStore();
  const abortControllerRef = useRef<AbortController | null>(null);
  const polishedContentRef = useRef<HTMLDivElement>(null);

  const getPolishErrorMessage = async (response: Response): Promise<{ message: string; detail?: string; code?: string }> => {
    const fallback = { message: `${t("error.polishFailed")} (${response.status})` };

    try {
      const contentType = response.headers.get("content-type") || "";
      const rawText = await response.text();

      if (!rawText) {
        if (response.status === 401) {
          return {
            message: "认证失败",
            detail: "请检查 API Key、模型和 API Endpoint 配置",
            code: "AI_API_KEY_ERROR"
          };
        }
        return fallback;
      }

      // 尝试解析 JSON 错误响应
      if (contentType.includes("application/json") || rawText.startsWith("{")) {
        const data = JSON.parse(rawText) as AIErrorResponse;

        // 处理后端封装的错误格式
        if (data.error) {
          return {
            message: data.error.message || fallback.message,
            detail: data.error.detail,
            code: data.error.code
          };
        }

        // 处理简单错误格式
        if (typeof data.message === "string") {
          return { message: data.message };
        }
      } else if (rawText.trim()) {
        return { message: rawText.trim() };
      }
    } catch {
      // 解析失败，使用默认错误信息
    }

    if (response.status === 401) {
      return {
        message: "认证失败",
        detail: "请检查 API Key、模型和 API Endpoint 配置",
        code: "AI_API_KEY_ERROR"
      };
    }

    return fallback;
  };

  const handlePolish = async () => {
    try {
      if (!isConfigured()) {
        toast.error(t("error.configRequired"));
        return;
      }

      setIsPolishing(true);
      setPolishedContent("");
      setError(null);

      abortControllerRef.current = new AbortController();

      const config = AI_MODEL_CONFIGS[selectedModel];
      const apiKey =
        selectedModel === "doubao"
          ? doubaoApiKey
          : selectedModel === "openai"
            ? openaiApiKey
            : selectedModel === "gemini"
              ? geminiApiKey
              : deepseekApiKey;
      const modelId =
        selectedModel === "doubao"
          ? doubaoModelId
          : selectedModel === "openai"
            ? openaiModelId
            : selectedModel === "gemini"
              ? geminiModelId
              : selectedModel === "ollama"
                ? ollamaModelId
                : deepseekModelId;
      const apiEndpoint =
        selectedModel === "openai"
          ? openaiApiEndpoint
          : selectedModel === "ollama"
            ? ollamaApiEndpoint
            : undefined;

      const response = await fetch("/api/polish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: turndownService.turndown(content),
          apiKey,
          apiEndpoint,
          model: config.requiresModelId ? modelId : config.defaultModel,
          modelType: selectedModel,
          customInstructions: customInstructions.trim() || undefined
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        const errorInfo = await getPolishErrorMessage(response);
        setError(errorInfo);
        return;
      }

      if (!response.body) {
        setError({ message: "未收到响应数据" });
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        // 检查是否包含错误标记
        if (chunk.includes("[ERROR]")) {
          const errorMsg = chunk.replace("[ERROR]", "").trim();
          setError({ message: errorMsg });
          return;
        }
        setPolishedContent((prev) => prev + chunk);
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        console.log("Polish aborted");
        return;
      }
      console.error("Polish error:", err);
      setError({
        message: err instanceof Error ? err.message : t("error.polishFailed")
      });
    } finally {
      setIsPolishing(false);
    }
  };

  // 自动滚动到底部
  useEffect(() => {
    if (polishedContent && polishedContentRef.current) {
      const container = polishedContentRef.current;
      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight;
      });
    }
  }, [polishedContent]);

  useEffect(() => {
    if (!open) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      setPolishedContent("");
      setCustomInstructions("");
      setError(null);
    }
  }, [open]);

  const handleClose = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    onOpenChange(false);
    setPolishedContent("");
    setError(null);
  };

  const handleApply = () => {
    const htmlContent = md.render(polishedContent);
    onApply(htmlContent);
    handleClose();
    toast.success(t("error.applied"));
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && !isPolishing) {
      onOpenChange(open);
    }
  };

  // 根据错误代码获取建议
  const getErrorSuggestion = (code?: string): string | null => {
    switch (code) {
      case "AI_API_KEY_ERROR":
      case "AI_API_KEY_NOT_FOUND":
        return "请前往「AI 服务商」设置页面检查 API Key 配置";
      case "AI_QUOTA_EXCEEDED":
        return "API 配额已用尽，请充值或更换 API Key";
      case "AI_RATE_LIMIT":
        return "请求过于频繁，请等待片刻后重试";
      case "AI_REQUEST_TIMEOUT":
        return "请求超时，可能是网络问题或服务繁忙，请稍后重试";
      case "AI_SERVICE_UNAVAILABLE":
        return "AI 服务暂时不可用，请稍后重试或检查网络连接";
      case "AI_MODEL_NOT_FOUND":
        return "模型配置有误，请前往设置页面检查模型 ID";
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "sm:max-w-[1000px]",
          "bg-white dark:bg-neutral-900",
          "border-neutral-200 dark:border-neutral-800",
          "rounded-2xl shadow-2xl dark:shadow-none"
        )}
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader className="pb-6">
          <DialogTitle
            className={cn(
              "flex items-center gap-2 text-2xl",
              "text-neutral-800 dark:text-neutral-100"
            )}
          >
            <Sparkles
              className={cn(
                "h-6 w-6 text-primary animate-pulse",
                "dark:text-primary-400"
              )}
            />
            {t("title")}
          </DialogTitle>
          <DialogDescription
            className={cn(
              "text-base",
              "text-neutral-600 dark:text-neutral-400"
            )}
          >
            {isPolishing
              ? t("description.polishing")
              : polishedContent
                ? t("description.finished")
                : t("description.ready")}
          </DialogDescription>
        </DialogHeader>

        {/* 错误提示框 */}
        {error && (
          <div
            className={cn(
              "relative rounded-xl border p-4",
              "bg-red-50 dark:bg-red-500/10",
              "border-red-200 dark:border-red-500/30",
              "text-red-700 dark:text-red-300",
              "animate-in fade-in-0 slide-in-from-top-2 duration-300"
            )}
          >
            <button
              onClick={() => setError(null)}
              className="absolute top-3 right-3 p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="space-y-1 pr-6">
                <p className="font-medium">{error.message}</p>
                {error.detail && (
                  <p className="text-sm text-red-600 dark:text-red-400">{error.detail}</p>
                )}
                {error.code && getErrorSuggestion(error.code) && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-2 flex items-center gap-1.5">
                    <span className="text-xs bg-red-100 dark:bg-red-500/20 px-1.5 py-0.5 rounded">
                      建议
                    </span>
                    {getErrorSuggestion(error.code)}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label
            htmlFor="custom-instructions"
            className={cn(
              "text-sm font-medium",
              "text-neutral-600 dark:text-neutral-400"
            )}
          >
            {t("customInstructions")}
          </Label>
          <Textarea
            id="custom-instructions"
            placeholder={t("customInstructionsPlaceholder")}
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            disabled={isPolishing}
            rows={2}
            className={cn(
              "resize-none rounded-xl border",
              "bg-neutral-50 dark:bg-neutral-800/50",
              "border-neutral-200 dark:border-neutral-800",
              "text-neutral-700 dark:text-neutral-300",
              "placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-3">
              <div
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  "bg-neutral-500 dark:bg-neutral-600"
                )}
              ></div>
              <span
                className={cn(
                  "text-sm font-medium",
                  "text-neutral-600 dark:text-neutral-400"
                )}
              >
                {t("content.original")}
              </span>
            </div>
            <div
              className={cn(
                "relative rounded-xl border",
                "bg-neutral-50 dark:bg-neutral-800/50",
                "border-neutral-200 dark:border-neutral-800",
                "p-6 h-[400px] overflow-auto shadow-sm"
              )}
            >
              <Streamdown
                className={cn(
                  "prose dark:prose-invert max-w-none",
                  "text-neutral-700 dark:text-neutral-300"
                )}
              >
                {turndownService.turndown(content)}
              </Streamdown>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 px-3">
              <div
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  "bg-primary animate-pulse"
                )}
              ></div>
              <span
                className={cn(
                  "text-sm font-medium",
                  "text-primary dark:text-primary-400"
                )}
              >
                {t("content.polished")}
              </span>
            </div>
            <div
              ref={polishedContentRef}
              className={cn(
                "relative rounded-xl border",
                "bg-primary/[0.03] dark:bg-primary/[0.1]",
                "border-primary/20 dark:border-primary/30",
                "p-6 h-[400px] overflow-auto shadow-sm scroll-smooth"
              )}
            >
              <Streamdown
                animated
                isAnimating={isPolishing}
                className={cn(
                  "prose dark:prose-invert max-w-none",
                  "text-neutral-800 dark:text-neutral-200"
                )}
              >
                {polishedContent}
              </Streamdown>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6 flex items-center gap-3">
          <Button
            onClick={handlePolish}
            disabled={isPolishing}
            className="flex-1 bg-gradient-to-r from-[#9333EA] to-[#EC4899] hover:opacity-90 text-white border-none h-11 shadow-lg shadow-purple-500/20"
          >
            {isPolishing ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("button.generating")}
              </div>
            ) : !polishedContent ? (
              t("button.start")
            ) : (
              t("button.regenerate")
            )}
          </Button>

          <Button
            onClick={handleApply}
            disabled={!polishedContent || isPolishing}
            className="flex-1 bg-primary hover:bg-primary/90 text-white h-11 shadow-lg shadow-primary/20"
          >
            {t("button.apply")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
