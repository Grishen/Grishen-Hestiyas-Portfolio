type TextLike = { str: string; hasEOL: boolean }

function asTextItem(item: unknown): TextLike | null {
  if (typeof item !== 'object' || item === null || !('str' in item)) return null
  const o = item as { str: unknown; hasEOL?: unknown }
  if (typeof o.str !== 'string') return null
  return { str: o.str, hasEOL: Boolean(o.hasEOL) }
}

/**
 * Extracts plain text from a PDF URL (e.g. public resume) using PDF.js, preserving line breaks where possible.
 * Loaded on demand so the main bundle stays small.
 */
export async function extractTextFromPdfUrl(url: string): Promise<string> {
  const pdfjs = await import('pdfjs-dist')
  const workerModule = await import('pdfjs-dist/build/pdf.worker.min.mjs?url')
  const workerUrl = workerModule.default as string
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl

  const task = pdfjs.getDocument({ url, withCredentials: false })
  const pdf = await task.promise
  const pageChunks: string[] = []

  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p)
    const { items } = await page.getTextContent()
    let line = ''
    for (const item of items) {
      const ti = asTextItem(item)
      if (!ti) continue
      line += ti.str
      if (ti.hasEOL) {
        if (line.trim()) pageChunks.push(line.trim())
        line = ''
      } else {
        line += ' '
      }
    }
    if (line.trim()) pageChunks.push(line.trim())
  }

  return pageChunks
    .join('\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
