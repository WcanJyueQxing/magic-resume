import { useState, useCallback } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface PdfUploaderProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export function PdfUploader({ onFileSelect, disabled }: PdfUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateFile = useCallback((file: File): boolean => {
    const isValidType = file.type === 'application/pdf';
    const isValidSize = file.size <= 50 * 1024 * 1024;

    if (!isValidType) {
      setErrorMessage('请选择 PDF 文件');
      return false;
    }
    if (!isValidSize) {
      setErrorMessage('文件大小不能超过 50MB');
      return false;
    }
    return true;
  }, []);

  const handleFile = useCallback(async (file: File) => {
    if (!validateFile(file)) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    try {
      setStatus('uploading');
      onFileSelect(file);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (error) {
      setErrorMessage('文件处理失败，请重试');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  }, [validateFile, onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleClick = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf';
    input.onchange = handleFileChange;
    input.click();
  }, [handleFileChange]);

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border-2 border-dashed
        transition-all duration-300 ease-out cursor-pointer
        ${isDragging
          ? 'border-blue-500 bg-blue-50 scale-[1.02] shadow-lg shadow-blue-200'
          : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }
        ${status === 'uploading' ? 'border-blue-400 bg-blue-50' : ''}
        ${status === 'success' ? 'border-green-500 bg-green-50' : ''}
        ${status === 'error' ? 'border-red-500 bg-red-50' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={disabled ? undefined : handleClick}
    >
      <div className="p-12 text-center">
        <div className={`
          inline-flex items-center justify-center w-20 h-20 rounded-full
          transition-all duration-300 mb-6
          ${isDragging || status === 'uploading' ? 'bg-blue-500 text-white' : ''}
          ${status === 'success' ? 'bg-green-500 text-white' : ''}
          ${status === 'error' ? 'bg-red-500 text-white' : ''}
          ${status === 'idle' && !isDragging ? 'bg-gray-100 text-gray-400' : ''}
        `}>
          {status === 'uploading' && (
            <Loader2 className="w-10 h-10 animate-spin" />
          )}
          {status === 'success' && (
            <CheckCircle className="w-10 h-10" />
          )}
          {status === 'error' && (
            <AlertCircle className="w-10 h-10" />
          )}
          {status === 'idle' && (
            <Upload className="w-10 h-10" />
          )}
        </div>

        <h3 className={`
          text-xl font-semibold mb-2 transition-colors
          ${status === 'success' ? 'text-green-700' : ''}
          ${status === 'error' ? 'text-red-700' : ''}
          ${status === 'idle' ? 'text-gray-800' : ''}
        `}>
          {status === 'uploading' && '正在解析 PDF...'}
          {status === 'success' && '解析成功！'}
          {status === 'error' && '上传失败'}
          {status === 'idle' && '拖拽 PDF 文件到这里'}
        </h3>

        <p className={`
          text-sm transition-colors
          ${status === 'error' ? 'text-red-600' : 'text-gray-500'}
        `}>
          {status === 'error' && errorMessage}
          {status === 'idle' && (
            <span>
              或 <span className="text-blue-600 font-medium hover:underline">点击选择文件</span>
              <br />
              <span className="text-gray-400 mt-1 block">支持 PDF 格式，最大 50MB</span>
            </span>
          )}
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FileText className="w-4 h-4" />
            <span>PDF</span>
          </div>
        </div>
      </div>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
