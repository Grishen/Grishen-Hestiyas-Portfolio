import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { site } from '../content'
import { ProjectCard } from '../components/ProjectCard'

const enter = { duration: 0.45, ease: [0.22, 0.7, 0.18, 1] as const }

export function ProjectsPage() {
  const reduce = useReducedMotion()
  const { projectsPage: copy } = site

  useEffect(() => {
    const prev = document.title
    document.title = `${copy.title} — ${site.name}`
    return () => {
      document.title = prev
    }
  }, [copy.title])

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto min-h-dvh max-w-5xl px-4 pt-28 pb-24 sm:px-6"
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

        <p className="eyebrow-num mb-2">03</p>
        <h1 className="font-display mt-0 text-4xl font-bold tracking-tight text-stone-100 sm:text-5xl">
          {copy.title}
        </h1>
        <p className="prose-calm mt-4 max-w-2xl text-balance">{copy.lead}</p>
      </motion.div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {site.projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} reduce={!!reduce} />
        ))}
      </div>
    </main>
  )
}
