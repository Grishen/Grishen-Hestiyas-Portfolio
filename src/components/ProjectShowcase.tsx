import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { ProjectEntry } from '../content'
import { publicUrl } from '../lib/publicUrl'

const sectionT = { duration: 0.5, ease: [0.22, 0.7, 0.18, 1] as const }

const codeStyle =
  'rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[0.75rem] text-cyan-200/90'

type Props = {
  project: ProjectEntry
  index: number
}

export function ProjectShowcase({ project: p, index: i }: Props) {
  const reduce = useReducedMotion()
  const [imgFailed, setImgFailed] = useState(false)
  const extended = p.extended ?? []
  const hasImage = Boolean(p.imageUrl) && !imgFailed

  return (
    <motion.article
      className="panel-glass overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_0_rgba(255,255,255,0.06)]"
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ ...sectionT, delay: 0.07 * i }}
    >
      <div
        className={
          hasImage
            ? 'grid gap-0 lg:grid-cols-[1fr_1.15fr] lg:items-stretch'
            : 'grid gap-0'
        }
      >
        {p.imageUrl && !imgFailed && (
          <div
            className={`relative min-h-[200px] border-b border-white/10 bg-zinc-950/50 lg:min-h-[280px] lg:border-b-0 ${
              i % 2 === 1 ? 'lg:order-2 lg:border-l lg:border-white/10' : 'lg:order-1 lg:border-r lg:border-white/10'
            }`}
          >
            <img
              src={publicUrl(p.imageUrl)}
              alt={p.imageAlt ?? p.title}
              className="h-full w-full object-cover"
              onError={() => setImgFailed(true)}
              loading="lazy"
              decoding="async"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/30 to-transparent"
              aria-hidden
            />
          </div>
        )}

        <div
          className={`flex min-w-0 flex-col justify-center gap-4 px-5 py-6 sm:gap-5 sm:px-7 sm:py-8 lg:max-w-none ${
            p.imageUrl && !imgFailed
              ? i % 2 === 1
                ? 'lg:order-1'
                : 'lg:order-2'
              : ''
          }`}
        >
          <h2 className="font-display m-0 text-2xl font-bold tracking-tight text-balance text-stone-100 sm:text-3xl sm:leading-tight">
            {p.title}
          </h2>

          <p className="text-body m-0 text-base leading-relaxed [text-wrap:pretty] sm:text-[1.02rem] sm:leading-8">
            {p.description}
          </p>

          {extended.length > 0 && (
            <div className="space-y-3 border-t border-white/10 pt-4 sm:space-y-4 sm:pt-5">
              {extended.map((para, j) => (
                <p
                  key={j}
                  className="text-body m-0 text-base leading-relaxed [text-wrap:pretty] sm:text-[1.02rem] sm:leading-8"
                >
                  {para}
                </p>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/10 bg-white/[0.06] px-2.5 py-1 font-mono text-[0.65rem] tracking-wider text-stone-400 uppercase"
              >
                {t}
              </span>
            ))}
          </div>

          {p.href ? (
            <a
              href={p.href}
              className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-cyan-300 underline decoration-cyan-500/40 underline-offset-4 transition hover:text-cyan-200 hover:decoration-cyan-300"
            >
              Open project
              <span aria-hidden>→</span>
            </a>
          ) : (
            <p className="text-body m-0 font-mono text-xs">
              Add a URL in <code className={codeStyle}>content.ts</code> when the project is public.
            </p>
          )}
        </div>
      </div>
    </motion.article>
  )
}
