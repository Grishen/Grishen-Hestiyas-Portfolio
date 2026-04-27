import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { publicUrl } from '../lib/publicUrl'
import { extractTextFromPdfUrl } from '../lib/extractPdfText'
import { site } from '../content'
import { ResumeThemedContent } from '../components/ResumeThemedContent'

const enter = { duration: 0.45, ease: [0.22, 0.7, 0.18, 1] as const }
const springUi = { type: 'spring' as const, stiffness: 360, damping: 28 }

type LoadState =
  | { kind: 'checking' }
  | { kind: 'missing' }
  | { kind: 'parsing' }
  | { kind: 'ready'; text: string }
  | { kind: 'error' }

export function ResumePage() {
  const reduce = useReducedMotion()
  const r = site.resume
  const pdfUrl = publicUrl(r.pdfPath)
  const [load, setLoad] = useState<LoadState>({ kind: 'checking' })

  useEffect(() => {
    const prev = document.title
    document.title = `${r.pageTitle} — ${site.name}`
    return () => {
      document.title = prev
    }
  }, [r.pageTitle])

  useEffect(() => {
    let cancelled = false

    void (async () => {
      try {
        const head = await fetch(pdfUrl, { method: 'HEAD' })
        if (cancelled) return
        if (!head.ok) {
          const partial = await fetch(pdfUrl, { headers: { Range: 'bytes=0-0' } })
          if (cancelled) return
          if (!partial.ok || (partial.status !== 200 && partial.status !== 206)) {
            setLoad({ kind: 'missing' })
            return
          }
        }
        if (cancelled) return
        setLoad({ kind: 'parsing' })
        const text = await extractTextFromPdfUrl(pdfUrl)
        if (cancelled) return
        if (!text || text.length < 8) {
          setLoad({ kind: 'error' })
          return
        }
        setLoad({ kind: 'ready', text })
      } catch {
        if (cancelled) return
        setLoad({ kind: 'error' })
      }
    })()

    return () => {
      cancelled = true
    }
  }, [pdfUrl])

  const showToolbar =
    load.kind === 'parsing' || load.kind === 'ready' || load.kind === 'error'
  const showThemed = load.kind === 'ready'

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto min-h-dvh max-w-5xl px-4 pt-28 pb-20 sm:px-6"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={enter}
      >
        <Link
          to="/"
          className="text-body group mb-10 inline-flex items-center gap-2 text-sm text-cyan-400/90 transition hover:text-cyan-300"
        >
          <span className="transition group-hover:-translate-x-0.5" aria-hidden>
            ←
          </span>
          Back to home
        </Link>

        <p className="eyebrow-num mb-2">Resume</p>
        <h1 className="font-display mt-0 text-4xl font-bold tracking-tight text-stone-100 sm:text-5xl">
          {r.pageTitle}
        </h1>
        <p className="prose-calm mt-4 max-w-2xl text-balance text-stone-300">{r.blurb}</p>
      </motion.div>

      <motion.div
        className="mt-10"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...enter, delay: 0.06 }}
      >
        {showToolbar && (
          <div
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2"
            role="toolbar"
            aria-label="Resume actions"
          >
            <motion.a
              href={pdfUrl}
              download={r.downloadFileName}
              className="btn-primary inline-flex w-full justify-center sm:w-auto"
              whileTap={reduce ? undefined : { scale: 0.98 }}
              transition={springUi}
            >
              Download PDF
            </motion.a>
            <motion.a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary inline-flex w-full justify-center sm:w-auto"
              whileTap={reduce ? undefined : { scale: 0.98 }}
              transition={springUi}
            >
              Open PDF in new tab
            </motion.a>
            <Link
              to="/#contact"
              className="text-center text-sm text-stone-500 underline decoration-white/20 underline-offset-4 sm:ml-2"
            >
              Get in touch
            </Link>
          </div>
        )}

        <div className="panel-glass mt-8 overflow-hidden shadow-2xl shadow-black/40">
          <div className="border-b border-white/10 bg-zinc-950/80 px-4 py-2.5 sm:px-5">
            <p className="m-0 font-mono text-[11px] font-medium tracking-wide text-stone-500 uppercase">On this page</p>
            <p className="m-0 mt-0.5 text-xs text-stone-400">
              Text parsed from your PDF and laid out to match the portfolio. The downloaded file is unchanged for
              applications.
            </p>
          </div>

          {(load.kind === 'checking' || load.kind === 'parsing') && (
            <div
              className="flex min-h-[40dvh] items-center justify-center bg-zinc-950/40 p-8 sm:min-h-[50dvh]"
              aria-busy
            >
              <p className="m-0 text-sm text-stone-500">
                {load.kind === 'parsing' ? 'Reading your résumé…' : 'Loading…'}
              </p>
            </div>
          )}

          {showThemed && (
            <div className="p-4 sm:p-6">
              <ResumeThemedContent text={load.text} />
            </div>
          )}

          {load.kind === 'error' && (
            <div className="flex min-h-[32dvh] flex-col items-center justify-center gap-3 bg-zinc-950/40 p-8 text-center">
              <p className="m-0 max-w-md text-sm text-stone-400">Couldn’t read text from the PDF. Use “Open PDF in new tab” or download instead.</p>
            </div>
          )}

          {load.kind === 'missing' && (
            <div className="flex min-h-[40dvh] flex-col items-center justify-center gap-3 bg-zinc-950/40 p-8 text-center">
              <p className="m-0 max-w-md text-sm text-stone-400">No PDF found at the configured path. Add your file to the repo to enable preview and download.</p>
              <p className="m-0 max-w-md font-mono text-xs text-cyan-200/70">public/{r.pdfPath.replace(/^public\//, '')}</p>
            </div>
          )}
        </div>
      </motion.div>
    </main>
  )
}
