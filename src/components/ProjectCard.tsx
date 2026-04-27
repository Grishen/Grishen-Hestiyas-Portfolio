import { motion } from 'framer-motion'
import { Tilt3DFrame } from './interactive/Tilt3DFrame'
import type { ProjectEntry } from '../content'

const sectionTransition = { duration: 0.5, ease: [0.22, 0.7, 0.18, 1] as const }

const codeStyle =
  'rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[0.75rem] text-cyan-200/90'

type Props = {
  project: ProjectEntry
  index: number
  reduce: boolean
  /** Limit description to a few lines with an ellipsis (e.g. home page preview). */
  truncateDescription?: boolean
}

export function ProjectCard({ project: p, index: i, reduce, truncateDescription }: Props) {
  return (
    <Tilt3DFrame className="h-full min-h-[200px]" max={6}>
      <motion.article
        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-zinc-900/50 p-5 shadow-lg shadow-black/30 backdrop-blur-sm"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ ...sectionTransition, delay: 0.05 * i }}
        whileHover={reduce ? undefined : { boxShadow: '0 0 0 1px rgba(34, 211, 238, 0.2), 0 24px 50px -24px rgba(0,0,0,0.6)' }}
      >
        <h3 className="m-0 font-display text-lg font-bold text-stone-100">{p.title}</h3>
        <p
          className={
            truncateDescription
              ? 'text-body mt-2 line-clamp-4 min-h-0 flex-1 text-sm sm:line-clamp-5 sm:text-[0.95rem]'
              : 'text-body mt-2 flex-1 text-sm sm:text-[0.95rem]'
          }
        >
          {p.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/8 bg-white/5 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-stone-400"
            >
              {t}
            </span>
          ))}
        </div>
        {p.href ? (
          <a
            href={p.href}
            className="mt-4 inline-flex w-fit text-sm font-semibold text-cyan-300 underline decoration-cyan-500/40 underline-offset-4 transition hover:text-cyan-200 hover:decoration-cyan-300"
          >
            Open project →
          </a>
        ) : (
          <p className="text-body mt-4 font-mono text-xs">
            Add a URL in <code className={codeStyle}>content.ts</code>
          </p>
        )}
      </motion.article>
    </Tilt3DFrame>
  )
}
