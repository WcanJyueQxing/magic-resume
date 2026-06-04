import { useState, useCallback, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { createWorker } from 'tesseract.js';
import { FileText, Lock, Loader2, Eye, EyeOff, Scan, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { extractAllTextFromPdf } from '@/utils/pdfParser';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

interface UniversalPdfParserProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  onParseComplete: (content: string, type: 'text' | 'ocr') => void;
  isImporting: boolean;
  importProgress: number;
  importStatus: string;
}

export function UniversalPdfParser({
  file,
  onFileChange,
  onParseComplete,
  isImporting,
  importProgress,
  importStatus,
}: UniversalPdfParserProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [password, setPassword] = useState('');
  const [showPreview, setShowPreview] = useState(true);
  const [parseType, setParseType] = useState<'text' | 'ocr' | ''>('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [scale, setScale] = useState(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      onFileChange(selected);
      setContent('');
      setParseType('');
      setError('');
      setNumPages(null);
    }
  };

  const parsePDF = useCallback(async (totalPages: number) => {
    if (!file) return;

    try {
      setError('');
      const pdf = await pdfjs.getDocument({
        data: file,
        password: password,
      }).promise;

      // 使用统一的文本提取函数
      const fullText = await extractAllTextFromPdf(pdf as any);

      if (fullText.trim().length > 10) {
        setParseType('text');
        setContent(fullText);
        onParseComplete(fullText, 'text');
      } else {
        setParseType('ocr');
        await ocrParse(pdf, totalPages);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : '解析失败';
      if (errorMsg.includes('password')) {
        setError('PDF已加密，请输入密码');
      } else {
        setError('解析失败：' + errorMsg);
      }
    }
  }, [file, password, onParseComplete]);

  const ocrParse = useCallback(async (pdf: any, totalPages: number) => {
    const worker = await createWorker(['chi_sim', 'eng']);
    let ocrText = '';

    try {
      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('无法创建canvas上下文');

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport }).promise;

        const result = await worker.recognize(canvas);
        ocrText += result.data.text + '\n\n';
      }

      setContent(ocrText);
      onParseComplete(ocrText, 'ocr');
    } finally {
      await worker.terminate();
    }
  }, [onParseComplete]);

  useEffect(() => {
    if (numPages && !isImporting && file) {
      parsePDF(numPages);
    }
  }, [numPages, file, isImporting, parsePDF]);

  const handleRetry = () => {
    if (numPages && file) {
      setError('');
      parsePDF(numPages);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            PDF 文件选择
          </CardTitle>
          <CardDescription>支持文本型和图片型PDF（自动OCR识别）</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="cursor-pointer"
              disabled={isImporting}
            />

            {file && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{file.name}</span>
                  <span className="text-xs text-gray-400">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFileChange(null)}
                  disabled={isImporting}
                >
                  取消
                </Button>
              </div>
            )}

            {file && (
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-gray-500" />
                <Input
                  type="password"
                  placeholder="PDF密码（无密码留空）"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1"
                  disabled={isImporting}
                />
                {password && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRetry}
                    disabled={isImporting}
                  >
                    重试
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {file && numPages && showPreview && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-600" />
              PDF 预览
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(false)}
            >
              <EyeOff className="h-4 w-4 mr-1" />
              隐藏预览
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-gray-500">缩放:</span>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-12 text-right">
                {(scale * 100).toFixed(0)}%
              </span>
            </div>
            <div className="overflow-auto bg-gray-50 rounded-lg p-4 max-h-[400px]">
              <Document
                file={file}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                password={password}
              >
                {Array.from({ length: numPages }, (_, i) => (
                  <Page
                    key={i}
                    pageNumber={i + 1}
                    width={600 * scale}
                    renderAnnotationLayer={false}
                  />
                ))}
              </Document>
            </div>
          </CardContent>
        </Card>
      )}

      {!showPreview && numPages && (
        <Button variant="outline" onClick={() => setShowPreview(true)}>
          <Eye className="h-4 w-4 mr-2" />
          显示预览
        </Button>
      )}

      {isImporting && (
        <Card>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              <span className="text-sm text-gray-600">{importStatus}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${importProgress}%` }}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="text-red-600">
            {error}
          </CardContent>
        </Card>
      )}

      {content && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {parseType === 'ocr' ? (
                <Scan className="h-5 w-5 text-purple-600" />
              ) : (
                <FileText className="h-5 w-5 text-blue-600" />
              )}
              解析结果
            </CardTitle>
            <span className={cn(
              "px-2 py-1 text-xs rounded-full",
              parseType === 'ocr'
                ? "bg-purple-100 text-purple-700"
                : "bg-green-100 text-green-700"
            )}>
              {parseType === 'ocr' ? '图片PDF (OCR)' : '文本PDF'}
            </span>
          </CardHeader>
          <CardContent>
            <div
              className="bg-gray-50 rounded-lg p-4 max-h-[400px] overflow-auto whitespace-pre-wrap text-sm text-gray-700"
            >
              {content}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                共 {content.length} 字符
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(content);
                }}
              >
                复制内容
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
