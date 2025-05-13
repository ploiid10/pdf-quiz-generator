// utils/pdfReader.ts
import * as pdfjsLib from 'pdfjs-dist';
import { TextItem } from 'pdfjs-dist/types/src/display/api';
// found this fix on react-pdf docs
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
interface IExtractResult {
  error?: string
  pages: string[]
}

export async function extractText(file: File): Promise<IExtractResult> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const pages: string[] = [];

  if (pdf.numPages > 3) {
    return { error: 'PDF must have  less than 3 pages.', pages: []}
  }

  for (let i = 1; i <= pdf.numPages && i <= 10; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items.map((item) => (item as TextItem).str).join(' ');
    pages.push(text);
  }

  return { pages };
}
