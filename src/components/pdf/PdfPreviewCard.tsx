import { useState } from 'react';
import { FileText, Eye, X, Loader2, AlertCircle } from 'lucide-react';
import type { PdfAnalysis, PdfParseState } from '../../types/pdf';
import { parsePdf, getPdfType, formatFileSize } from '../../utils/pdfParser';
import { PdfUploader } from './PdfUploader';
import { PdfViewer } from './PdfViewer';

export function PdfPreviewCard() {
  const [parseState, setParseState] = useState<PdfParseState>({
    status: 'idle',
    progress: 0,
  });

  const handleFileSelect = async (file: File) => {
    try {
      setParseState({
        status: 'parsing',
        progress: 0,
        fileName: file.name,
      });

      const analysis: PdfAnalysis = await parsePdf(file, (progress) => {
        setParseState((prev) => ({ ...prev, progress }));
      });

      setParseState({
        status: 'success',
        progress: 100,
        fileName: file.name,
        analysis,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '解析失败';
      setParseState({
        status: 'error',
        progress: 0,
        fileName: file.name,
        error: errorMessage,
      });
    }
  };

  const handleBack = () => {
    setParseState({
      status: 'idle',
      progress: 0,
    });
  };

  if (parseState.status === 'success' && parseState.analysis) {
    return (
      <PdfViewer
        analysis={parseState.analysis}
        fileName={parseState.fileName || ''}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            PDF 解析工具
          </h1>
          <p className="text-lg text-gray-600">
            上传 PDF 文件，实时解析并查看内容
          </p>
        </div>

        <div className="space-y-6">
          <PdfUploader
            onFileSelect={handleFileSelect}
            disabled={parseState.status === 'parsing'}
          />

          {parseState.status === 'parsing' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    正在解析 PDF...
                  </h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${parseState.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    进度: {Math.round(parseState.progress)}%
                  </p>
                </div>
              </div>
            </div>
          )}

          {parseState.status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-red-900 mb-2">
                    解析失败
                  </h3>
                  <p className="text-red-700">{parseState.error}</p>
                  <button
                    onClick={handleBack}
                    className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <X className="w-4 h-4" />
                    关闭错误提示
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">文本 PDF</span>
              </div>
              <p className="text-sm text-gray-500">
                可提取文本内容，支持搜索和复制
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">扫描 PDF</span>
              </div>
              <p className="text-sm text-gray-500">
                图片格式，无法提取文本内容
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">加密 PDF</span>
              </div>
              <p className="text-sm text-gray-500">
                需要密码才能查看内容
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
