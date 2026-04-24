import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { site } from '../content'

const enter = { duration: 0.45, ease: [0.22, 0.7, 0.18, 1] as const }
const springUi = { type: 'spring' as const, stiffness: 360, damping: 28 }

export function AboutMePage() {
  const reduce = useReducedMotion()
  const [imageFailed, setImageFailed] = useState(false)
  const a = site.aboutMe

  useEffect(() => {
    const prev = document.title
    document.title = `${a.pageTitle} — ${site.name}`
    return () => {
      document.title = prev
    }
  }, [a.pageTitle])

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto min-h-dvh max-w-3xl px-4 pt-28 pb-20 sm:px-6"
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

        <p className="eyebrow-num mb-2">About</p>
        <h1 className="font-display mt-0 text-4xl font-bold tracking-tight text-stone-100 sm:text-5xl">
          {a.pageTitle}
        </h1>
        <p className="prose-calm mt-4 text-balance">{a.lead}</p>
      </motion.div>

      <motion.div
        className="mt-10"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...enter, delay: 0.08 }}
      >
        <figure className="m-0">
          {!imageFailed ? (
            <img
              src={a.imageUrl}
              alt={a.imageAlt}
              width={800}
              height={1000}
              className="aspect-[4/5] w-full max-w-md rounded-2xl border border-white/10 object-cover object-center shadow-2xl shadow-black/50 sm:max-w-lg"
              onError={() => setImageFailed(true)}
              loading="eager"
              decoding="async"
            />
          ) : (
            <div
              className="panel-glass flex aspect-[4/5] w-full max-w-md flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 p-6 text-center sm:max-w-lg"
              role="img"
              aria-label="Photo placeholder"
            >
              <span className="font-display text-2xl font-bold text-stone-500">
                {site.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </span>
              <p className="m-0 max-w-xs text-sm text-stone-500">
                Add your photo at <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-cyan-200/80">public/images/profile.jpg</code> or update <code className="rounded border border-white/10 bg-white/5 px-1.5 font-mono text-xs text-cyan-200/80">imageUrl</code> in{' '}
                <code className="font-mono text-xs text-cyan-200/80">content.ts</code>.
              </p>
            </div>
          )}
          {!imageFailed && (
            <figcaption className="mt-3 text-sm text-stone-500">{a.imageAlt}</figcaption>
          )}
        </figure>
      </motion.div>

      <div className="prose-calm mt-12 space-y-6">
        {a.paragraphs.map((p, i) => (
          <p key={i} className="m-0 text-balance">
            {p}
          </p>
        ))}
      </div>

      <ul className="mt-12 list-none space-y-8 p-0">
        {a.highlights.map((h) => (
          <li key={h.title} className="border-l-2 border-cyan-500/50 pl-5">
            <h2 className="m-0 font-display text-lg font-semibold text-stone-100">{h.title}</h2>
            <p className="text-body m-0 mt-2 text-balance">{h.text}</p>
          </li>
        ))}
      </ul>

      <motion.div
        className="mt-14 flex flex-wrap gap-3"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...enter, delay: 0.2 }}
      >
        <motion.div whileTap={reduce ? undefined : { scale: 0.98 }} transition={springUi}>
          <Link to="/#contact" className="btn-primary inline-flex">
            Get in touch
          </Link>
        </motion.div>
        <motion.div whileTap={reduce ? undefined : { scale: 0.98 }} transition={springUi}>
          <a href={site.social.linkedin} className="btn-secondary inline-flex" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </motion.div>
      </motion.div>
    </main>
  )
}
