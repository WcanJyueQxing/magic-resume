import React from "react";
import { useTranslations } from "@/i18n/compat/client";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ImportResultDialogProps {
  open: boolean;
  success: boolean;
  message: string;
  resumeId?: string;
  fileName?: string;
  format?: string;
  onOpenChange: (open: boolean) => void;
  onNavigate: () => void;
}

export const ImportResultDialog = ({
  open,
  success,
  message,
  resumeId,
  fileName,
  format,
  onOpenChange,
  onNavigate,
}: ImportResultDialogProps) => {
  const t = useTranslations();

  const formatNames: Record<string, string> = {
    pdf: "PDF",
    word: "Word",
    docx: "Word",
    markdown: "Markdown",
    md: "Markdown",
    json: "JSON",
  };

  const displayFormat = formatNames[format?.toLowerCase() || ""] || format || "未知格式";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className={cn(
            "mx-auto flex h-16 w-16 items-center justify-center rounded-full",
            success 
              ? "bg-green-100 text-green-600" 
              : "bg-red-100 text-red-600"
          )}>
            {success ? (
              <CheckCircle className="h-8 w-8" />
            ) : (
              <XCircle className="h-8 w-8" />
            )}
          </div>
          <DialogTitle className={cn(
            "mt-4 text-xl font-semibold",
            success ? "text-green-600" : "text-red-600"
          )}>
            {success 
              ? t("dashboard.resumes.importSuccessTitle") || "导入成功" 
              : t("dashboard.resumes.importFailedTitle") || "导入失败"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {message}
          </DialogDescription>
          
          {fileName && (
            <p className="mt-2 text-sm text-gray-500">
              {t("dashboard.resumes.importFileName", { fileName }) || `文件名: ${fileName}`}
            </p>
          )}
          
          {format && (
            <p className="text-sm text-gray-500">
              {t("dashboard.resumes.importFormat", { format: displayFormat }) || `导入格式: ${displayFormat}`}
            </p>
          )}
        </DialogHeader>
        
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            {t("common.cancel") || "取消"}
          </Button>
          {success && resumeId && (
            <Button className="flex-1" onClick={onNavigate}>
              {t("dashboard.resumes.editResume") || "编辑简历"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};