export type ResumeBlock =
  | { type: 'name'; text: string }
  | { type: 'title'; text: string }
  | { type: 'contact'; text: string }
  | { type: 'section'; text: string }
  | { type: 'p'; text: string }
  | { type: 'bullet'; text: string }
  | { type: 'bullets'; items: string[] }

const SECTION_RE =
  /^(EDUCATION|EXPERIENCE|EMPLOYMENT|WORK(\s+EXPERIENCE|)|SKILLS|PROJECTS?|PUBLICATIONS?|AWARDS?|CERTIFICATIONS?|LANGUAGES?|INTERESTS?|RESEARCH|LEADERSHIP|SUMMARY|OBJECTIVE|REFERENCES?|COURSEWORK|TEACHING)(\s*[:|—–-]|\s*$)/i

function isSectionHeader(s: string): boolean {
  const t = s.trim()
  if (SECTION_RE.test(t)) return true
  if (t.length > 0 && t.length < 38 && isAllCapsHeading(t) && t.split(/\s+/).length <= 4) return true
  return false
}

function isAllCapsHeading(s: string): boolean {
  const letters = s.replace(/[^A-Za-z]+/g, '')
  if (letters.length < 3) return false
  return letters === letters.toUpperCase()
}

function isContactish(s: string): boolean {
  return (
    /[@]|linkedin|github|\.(com|io|org)\b|https?:\/\//i.test(s) ||
    /^\s*(\+1\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/.test(s) ||
    (/[|·]/.test(s) && s.length < 160)
  )
}

function isBulletLine(s: string): boolean {
  return /^[\s•\-*▪‣·\u2022]\s*\S+/.test(s) || /^\d{1,2}[).]\s+\S+/.test(s)
}

function stripBullet(s: string): string {
  return s.replace(/^[\s•\-*▪‣·\u2022]+\s*|\d{1,2}[).]\s+/u, '').trim()
}

function mergeConsecutiveBullets(blocks: ResumeBlock[]): ResumeBlock[] {
  const out: ResumeBlock[] = []
  let run: string[] = []

  const flush = () => {
    if (run.length === 0) return
    if (run.length === 1) out.push({ type: 'bullet', text: run[0]! })
    else out.push({ type: 'bullets', items: [...run] })
    run = []
  }

  for (const b of blocks) {
    if (b.type === 'bullet') {
      run.push(b.text)
      continue
    }
    flush()
    out.push(b)
  }
  flush()
  return out
}

/**
 * If a long line is clearly skill chips (many · or •), split for nicer display.
 */
function expandSkillishParagraphs(blocks: ResumeBlock[]): ResumeBlock[] {
  const out: ResumeBlock[] = []
  for (const b of blocks) {
    if (b.type !== 'p') {
      out.push(b)
      continue
    }
    const t = b.text
    const dotParts = t.split(/\s*·\s*/).map((s) => s.trim()).filter(Boolean)
    if (dotParts.length >= 4 && t.length < 500 && !t.includes('.')) {
      out.push({ type: 'bullets', items: dotParts })
      continue
    }
    if (t.includes(' • ') && t.split(' • ').length >= 4) {
      const items = t.split(/\s*•\s*/).map((s) => s.trim()).filter(Boolean)
      if (items.length >= 4) {
        out.push({ type: 'bullets', items })
        continue
      }
    }
    out.push(b)
  }
  return out
}

/**
 * Heuristic layout from extracted PDF text — tuned for typical résumé PDFs.
 */
export function structureResumeText(raw: string): ResumeBlock[] {
  const lines = raw
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter((l) => l.length > 0)

  if (lines.length === 0) return []
  if (lines.length === 1) {
    return expandSkillishParagraphs(mergeConsecutiveBullets([{ type: 'p', text: lines[0] }]))
  }

  const blocks: ResumeBlock[] = []
  let i = 0

  if (!isSectionHeader(lines[0]) && !isContactish(lines[0]) && !isBulletLine(lines[0])) {
    blocks.push({ type: 'name', text: lines[0] })
    i = 1
  }

  if (
    i < lines.length &&
    !isSectionHeader(lines[i]) &&
    !isContactish(lines[i]) &&
    !isBulletLine(lines[i]) &&
    lines[i].length < 100 &&
    !/^(\d{4}\s*[-–—])|(\bJan\b|\bPresent\b)/i.test(lines[i])
  ) {
    blocks.push({ type: 'title', text: lines[i] })
    i += 1
  }

  const contactLines: string[] = []
  while (i < lines.length && contactLines.length < 5) {
    const l = lines[i]
    if (isSectionHeader(l) || isBulletLine(l)) break
    if (isContactish(l)) {
      contactLines.push(l)
      i += 1
      continue
    }
    if (contactLines.length > 0) break
    break
  }
  if (contactLines.length) {
    blocks.push({ type: 'contact', text: contactLines.join(' · ').replace(/\s*·\s*·\s*/g, ' · ') })
  }

  while (i < lines.length) {
    const line = lines[i]
    if (isSectionHeader(line)) {
      blocks.push({ type: 'section', text: line })
      i += 1
      continue
    }
    if (isBulletLine(line)) {
      blocks.push({ type: 'bullet', text: stripBullet(line) })
      i += 1
      continue
    }
    const para: string[] = [line]
    i += 1
    while (i < lines.length) {
      const next = lines[i]
      if (isSectionHeader(next) || isBulletLine(next)) break
      if (isAllCapsHeading(next) && next.length < 50 && SECTION_RE.test(next)) break
      para.push(next)
      i += 1
    }
    blocks.push({ type: 'p', text: para.join(' ') })
  }

  if (blocks.length < 2 && raw.length > 40) {
    return expandSkillishParagraphs(mergeConsecutiveBullets([{ type: 'p', text: raw.replace(/\n{2,}/g, '\n\n') }]))
  }

  return expandSkillishParagraphs(mergeConsecutiveBullets(blocks))
}
