import { useState, useRef, useCallback, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  FileText,
  Download,
  Copy,
  Check,
  AlertCircle,
  Lock,
  ImageIcon,
} from 'lucide-react';
import type { PdfAnalysis, PdfType } from '../../types/pdf';
import { getPdfType, formatFileSize } from '../../utils/pdfParser';

interface PdfViewerProps {
  analysis: PdfAnalysis;
  fileName: string;
  onBack: () => void;
}

export function PdfViewer({ analysis, fileName, onBack }: PdfViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ page: number; start: number; end: number }[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(-1);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'text'>('preview');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const pdfType: PdfType = getPdfType(analysis);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoom(1);
  }, []);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setCurrentSearchIndex(-1);
    }
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < analysis.totalPages) {
      setCurrentPage((prev) => prev + 1);
      setCurrentSearchIndex(-1);
    }
  }, [currentPage, analysis.totalPages]);

  const handlePageChange = useCallback((page: number) => {
    if (page >= 1 && page <= analysis.totalPages) {
      setCurrentPage(page);
      setCurrentSearchIndex(-1);
    }
  }, [analysis.totalPages]);

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setCurrentSearchIndex(-1);
      return;
    }

    const results: { page: number; start: number; end: number }[] = [];
    const query = searchQuery.toLowerCase();
    let accumulatedLength = 0;

    for (let i = 0; i < analysis.pages.length; i++) {
      const page = analysis.pages[i];
      const pageText = analysis.textContent.substring(
        accumulatedLength,
        accumulatedLength + (i === analysis.pages.length - 1 ? Infinity : 2000)
      );

      let start = 0;
      while ((start = pageText.toLowerCase().indexOf(query, start)) !== -1) {
        results.push({
          page: i + 1,
          start: accumulatedLength + start,
          end: accumulatedLength + start + query.length,
        });
        start += query.length;
      }

      accumulatedLength += pageText.length;
    }

    setSearchResults(results);
    setCurrentSearchIndex(results.length > 0 ? 0 : -1);
    if (results.length > 0) {
      setCurrentPage(results[0].page);
    }
  }, [searchQuery, analysis]);

  const handleNextSearch = useCallback(() => {
    if (searchResults.length > 0) {
      setCurrentSearchIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : 0
      );
      const nextResult = searchResults[
        currentSearchIndex < searchResults.length - 1 ? currentSearchIndex + 1 : 0
      ];
      setCurrentPage(nextResult.page);
    }
  }, [searchResults, currentSearchIndex]);

  const handlePrevSearch = useCallback(() => {
    if (searchResults.length > 0) {
      setCurrentSearchIndex((prev) =>
        prev > 0 ? prev - 1 : searchResults.length - 1
      );
      const prevResult = searchResults[
        currentSearchIndex > 0 ? currentSearchIndex - 1 : searchResults.length - 1
      ];
      setCurrentPage(prevResult.page);
    }
  }, [searchResults, currentSearchIndex]);

  const handleCopyText = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(analysis.textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  }, [analysis.textContent]);

  const handleExportText = useCallback(() => {
    const blob = new Blob([analysis.textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName.replace('.pdf', '')}_text.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [analysis.textContent, fileName]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevPage();
      } else if (e.key === 'ArrowRight') {
        handleNextPage();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      } else if (e.key === 'Escape') {
        handleResetZoom();
      } else if (e.key === 'Enter' && searchQuery) {
        handleNextSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevPage, handleNextPage, handleZoomIn, handleZoomOut, handleResetZoom, handleNextSearch, searchQuery]);

  const currentPageData = analysis.pages[currentPage - 1];

  // 将解析时渲染的 canvas 内容绘制到显示的 canvas 上
  useEffect(() => {
    if (currentPageData?.canvas && canvasRef.current) {
      const displayCanvas = canvasRef.current;
      const ctx = displayCanvas.getContext('2d');
      if (ctx) {
        displayCanvas.width = currentPageData.canvas.width;
        displayCanvas.height = currentPageData.canvas.height;
        ctx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
        ctx.drawImage(currentPageData.canvas, 0, 0);
      }
    }
  }, [currentPageData, currentPage]);

  const getTypeIcon = () => {
    switch (pdfType) {
      case 'text':
        return <FileText className="w-5 h-5" />;
      case 'scanned':
        return <ImageIcon className="w-5 h-5" />;
      case 'encrypted':
        return <Lock className="w-5 h-5" />;
    }
  };

  const getTypeLabel = () => {
    switch (pdfType) {
      case 'text':
        return '文本 PDF';
      case 'scanned':
        return '扫描件 PDF';
      case 'encrypted':
        return '加密 PDF';
    }
  };

  const getTypeColor = () => {
    switch (pdfType) {
      case 'text':
        return 'bg-green-100 text-green-700';
      case 'scanned':
        return 'bg-orange-100 text-orange-700';
      case 'encrypted':
        return 'bg-red-100 text-red-700';
    }
  };

  const highlightText = (text: string) => {
    if (!searchQuery.trim() || searchResults.length === 0) {
      return text;
    }

    let highlighted = '';
    let lastIndex = 0;

    searchResults.forEach((result) => {
      if (result.page === currentPage) {
        highlighted += text.substring(lastIndex, result.start);
        highlighted += `<mark class="bg-yellow-200 text-yellow-900 px-0.5 rounded">${text.substring(result.start, result.end)}</mark>`;
        lastIndex = result.end;
      }
    });

    highlighted += text.substring(lastIndex);
    return highlighted;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-semibold text-gray-900 truncate">
                  {fileName}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'preview'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                预览
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'text'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                文本内容
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                文档信息
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">文件大小</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatFileSize(analysis.fileSize)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">页数</span>
                  <span className="text-sm font-medium text-gray-900">
                    {analysis.totalPages} 页
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">是否加密</span>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    analysis.isEncrypted ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {analysis.isEncrypted ? '是' : '否'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">文档类型</span>
                  <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-2 py-1 rounded-full ${getTypeColor()}`}>
                    {getTypeIcon()}
                    {getTypeLabel()}
                  </span>
                </div>
              </div>
            </div>

            {analysis.metadata && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  元数据
                </h2>
                <div className="space-y-3">
                  {analysis.metadata.title && (
                    <div>
                      <span className="text-xs text-gray-500">标题</span>
                      <p className="text-sm text-gray-900">{analysis.metadata.title}</p>
                    </div>
                  )}
                  {analysis.metadata.author && (
                    <div>
                      <span className="text-xs text-gray-500">作者</span>
                      <p className="text-sm text-gray-900">{analysis.metadata.author}</p>
                    </div>
                  )}
                  {analysis.metadata.subject && (
                    <div>
                      <span className="text-xs text-gray-500">主题</span>
                      <p className="text-sm text-gray-900">{analysis.metadata.subject}</p>
                    </div>
                  )}
                  {analysis.metadata.creator && (
                    <div>
                      <span className="text-xs text-gray-500">创建工具</span>
                      <p className="text-sm text-gray-900">{analysis.metadata.creator}</p>
                    </div>
                  )}
                  {analysis.metadata.creationDate && (
                    <div>
                      <span className="text-xs text-gray-500">创建日期</span>
                      <p className="text-sm text-gray-900">{analysis.metadata.creationDate}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'text' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  操作
                </h2>
                <div className="space-y-3">
                  <button
                    onClick={handleCopyText}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        已复制
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        复制文本
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleExportText}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-medium text-white transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    导出文本
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'preview' ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={currentPage}
                        onChange={(e) => handlePageChange(parseInt(e.target.value) || 1)}
                        min={1}
                        max={analysis.totalPages}
                        className="w-16 px-3 py-1.5 text-center border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-500">
                        / {analysis.totalPages}
                      </span>
                    </div>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === analysis.totalPages}
                      className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleZoomOut}
                      className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                      title="缩小"
                    >
                      <ZoomOut className="w-5 h-5 text-gray-600" />
                    </button>
                    <span className="text-sm font-medium text-gray-700 w-16 text-center">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                      title="放大"
                    >
                      <ZoomIn className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={handleResetZoom}
                      className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                      title="重置"
                    >
                      <RotateCcw className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-200">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="搜索文本..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    搜索
                  </button>
                </div>

                {searchResults.length > 0 && (
                  <div className="flex items-center justify-between px-6 py-2 bg-blue-50 border-b border-blue-100">
                    <span className="text-sm text-blue-700">
                      找到 {searchResults.length} 个结果
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrevSearch}
                        className="p-1.5 rounded hover:bg-blue-100 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4 text-blue-600" />
                      </button>
                      <span className="text-sm text-blue-700">
                        {currentSearchIndex + 1} / {searchResults.length}
                      </span>
                      <button
                        onClick={handleNextSearch}
                        className="p-1.5 rounded hover:bg-blue-100 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex justify-center items-center min-h-[600px] p-8 bg-gray-100 overflow-auto">
                  {currentPageData?.canvas ? (
                    <div className="transition-transform duration-200" style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}>
                      <canvas
                        ref={canvasRef}
                        width={currentPageData.width}
                        height={currentPageData.height}
                        className="max-w-full rounded-lg shadow-lg"
                        style={{
                          imageRendering: 'crisp-edges',
                        }}
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">页面加载失败</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-2 px-6 py-4 border-t border-gray-200">
                  {analysis.pages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === index + 1
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-sm font-semibold text-gray-700">提取的文本内容</h2>
                  <span className="text-xs text-gray-500">
                    {analysis.textContent.length} 字符
                  </span>
                </div>

                <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-200">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="搜索文本..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    搜索
                  </button>
                </div>

                {searchResults.length > 0 && (
                  <div className="flex items-center justify-between px-6 py-2 bg-blue-50 border-b border-blue-100">
                    <span className="text-sm text-blue-700">
                      找到 {searchResults.length} 个结果
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrevSearch}
                        className="p-1.5 rounded hover:bg-blue-100 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4 text-blue-600" />
                      </button>
                      <span className="text-sm text-blue-700">
                        {currentSearchIndex + 1} / {searchResults.length}
                      </span>
                      <button
                        onClick={handleNextSearch}
                        className="p-1.5 rounded hover:bg-blue-100 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
                  </div>
                )}

                <div className="p-6 max-h-[700px] overflow-auto">
                  <div className="prose prose-sm max-w-none">
                    <pre
                      className="whitespace-pre-wrap break-all text-sm text-gray-800 leading-relaxed font-sans"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(analysis.textContent) || '<p class="text-gray-400 italic">无法提取文本内容</p>',
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
