import React from "react";
import { useTranslations } from "@/i18n/compat/client";
import { Braces, Loader2, FileText, Scan, FileType, FileDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface ImportResumeDialogProps {
  open: boolean;
  isImporting: boolean;
  importProgress: number;
  importStatus: string;
  isUsingOCR: boolean;
  onOpenChange: (open: boolean) => void;
  jsonFileInputRef: React.RefObject<HTMLInputElement>;
  pdfFileInputRef: React.RefObject<HTMLInputElement>;
  wordFileInputRef: React.RefObject<HTMLInputElement>;
  markdownFileInputRef: React.RefObject<HTMLInputElement>;
  onJsonFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPdfFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onWordFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMarkdownFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImportResumeDialog = ({
  open,
  isImporting,
  importProgress,
  importStatus,
  isUsingOCR,
  onOpenChange,
  jsonFileInputRef,
  pdfFileInputRef,
  wordFileInputRef,
  markdownFileInputRef,
  onJsonFileChange,
  onPdfFileChange,
  onWordFileChange,
  onMarkdownFileChange,
}: ImportResumeDialogProps) => {
  const t = useTranslations();

  return (
    <>
      <input
        ref={jsonFileInputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={onJsonFileChange}
      />
      <input
        ref={pdfFileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={onPdfFileChange}
      />
      <input
        ref={wordFileInputRef}
        type="file"
        accept=".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
        className="hidden"
        onChange={onWordFileChange}
      />
      <input
        ref={markdownFileInputRef}
        type="file"
        accept=".md,text/markdown"
        className="hidden"
        onChange={onMarkdownFileChange}
      />

      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (isImporting) return;
          onOpenChange(nextOpen);
        }}
      >
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>{t("dashboard.resumes.importDialog.title")}</DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <button
              type="button"
              disabled={isImporting}
              className={cn(
                "group relative flex w-full items-start gap-4 rounded-xl border border-border/50 bg-card p-4 text-left transition-all duration-200",
                "hover:border-primary/50 hover:bg-accent/50 hover:shadow-md",
                "active:scale-[0.98]",
                "disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
              )}
              onClick={() => jsonFileInputRef.current?.click()}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 transition-colors group-hover:bg-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400">
                <Braces className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-foreground leading-none">
                  {t("dashboard.resumes.importDialog.jsonTitle")}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("dashboard.resumes.importDialog.jsonDescription")}
                </p>
              </div>
            </button>

            <button
              type="button"
              disabled={isImporting}
              className={cn(
                "group relative flex w-full items-start gap-4 rounded-xl border border-border/50 bg-card p-4 text-left transition-all duration-200",
                "hover:border-primary/50 hover:bg-accent/50 hover:shadow-md",
                "active:scale-[0.98]",
                "disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
              )}
              onClick={() => pdfFileInputRef.current?.click()}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-600 transition-colors group-hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-400">
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-foreground leading-none">
                  {t("dashboard.resumes.importDialog.pdfTitle") || "导入 PDF"}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  使用 PyMuPDF 服务端解析，支持文本提取和图片提取
                </p>
              </div>
            </button>

            <button
              type="button"
              disabled={isImporting}
              className={cn(
                "group relative flex w-full items-start gap-4 rounded-xl border border-border/50 bg-card p-4 text-left transition-all duration-200",
                "hover:border-primary/50 hover:bg-accent/50 hover:shadow-md",
                "active:scale-[0.98]",
                "disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
              )}
              onClick={() => wordFileInputRef.current?.click()}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-600 transition-colors group-hover:bg-green-500/20 dark:bg-green-500/20 dark:text-green-400">
                <FileType className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-foreground leading-none">
                  导入 Word
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  支持 .docx 和 .doc 格式文档
                </p>
              </div>
            </button>

            <button
              type="button"
              disabled={isImporting}
              className={cn(
                "group relative flex w-full items-start gap-4 rounded-xl border border-border/50 bg-card p-4 text-left transition-all duration-200",
                "hover:border-primary/50 hover:bg-accent/50 hover:shadow-md",
                "active:scale-[0.98]",
                "disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
              )}
              onClick={() => markdownFileInputRef.current?.click()}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-600 transition-colors group-hover:bg-yellow-500/20 dark:bg-yellow-500/20 dark:text-yellow-400">
                <FileDown className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-foreground leading-none">
                  导入 Markdown
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  支持 .md 格式文档，解析结构化内容
                </p>
              </div>
            </button>
          </div>

          {isImporting && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                {isUsingOCR && <Scan className="h-4 w-4 text-purple-600" />}
                <span className="text-muted-foreground">
                  {importStatus || t("dashboard.resumes.importDialog.importing")}
                </span>
              </div>
              <Progress value={importProgress} className="h-2" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};