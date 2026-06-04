export interface PdfMetadata {
  title: string | null;
  author: string | null;
  subject: string | null;
  creator: string | null;
  producer: string | null;
  creationDate: string | null;
  modificationDate: string | null;
}

export interface PdfPageInfo {
  index: number;
  width: number;
  height: number;
  canvas: HTMLCanvasElement | null;
}

export interface PdfAnalysis {
  totalPages: number;
  fileSize: number;
  isEncrypted: boolean;
  isScanned: boolean;
  textContent: string;
  metadata: PdfMetadata;
  pages: PdfPageInfo[];
}

export interface PdfParseState {
  status: 'idle' | 'loading' | 'parsing' | 'success' | 'error';
  error?: string;
  progress: number;
  analysis?: PdfAnalysis;
  fileName?: string;
}

export type PdfType = 'text' | 'scanned' | 'encrypted';
