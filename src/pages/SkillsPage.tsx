import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { site } from '../content'

const enter = { duration: 0.45, ease: [0.22, 0.7, 0.18, 1] as const }

const stagger = { duration: 0.4, ease: [0.22, 0.7, 0.18, 1] as const }

export function SkillsPage() {
  const reduce = useReducedMotion()
  const { skillsPage } = site

  useEffect(() => {
    const prev = document.title
    document.title = `${skillsPage.pageTitle} — ${site.name}`
    return () => {
      document.title = prev
    }
  }, [skillsPage.pageTitle])

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto min-h-dvh max-w-5xl px-4 pt-28 pb-24 sm:px-6 lg:px-8"
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

        <p className="eyebrow-num mb-2">02</p>
        <h1 className="font-display mt-0 max-w-2xl text-4xl font-bold tracking-tight text-balance text-stone-100 sm:text-5xl">
          {skillsPage.pageTitle}
        </h1>
        <p className="prose-calm mt-5 max-w-2xl text-balance sm:mt-6">{skillsPage.lead}</p>
      </motion.div>

      <div className="mt-14 flex flex-col gap-10 sm:mt-16 sm:gap-12">
        {skillsPage.categories.map((cat, i) => (
          <motion.section
            key={cat.title}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...stagger, delay: Math.min(i * 0.05, 0.35) }}
            className="panel-glass rounded-2xl border border-white/10 px-5 py-6 shadow-lg shadow-black/20 sm:px-7 sm:py-8"
            aria-labelledby={`skill-cat-${i}`}
          >
            <div className="mb-5 border-b border-white/10 pb-4">
              <h2 id={`skill-cat-${i}`} className="font-display m-0 text-xl font-semibold text-stone-100 sm:text-2xl">
                {cat.title}
              </h2>
              {cat.blurb && (
                <p className="text-body m-0 mt-2 max-w-prose text-sm leading-relaxed sm:text-[0.95rem]">{cat.blurb}</p>
              )}
            </div>
            <ul className="m-0 grid list-none gap-2.5 p-0 sm:grid-cols-1 sm:gap-3 md:grid-cols-2">
              {cat.items.map((item) => (
                <li
                  key={item}
                  className="relative border-l-2 border-cyan-500/35 pl-4 text-[0.9375rem] leading-relaxed text-stone-300 sm:text-base sm:leading-7"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>
        ))}
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...enter, delay: 0.15 }}
        className="mt-14 flex flex-wrap gap-4 border-t border-white/10 pt-10 sm:mt-16"
      >
        <Link to="/projects" className="btn-primary inline-flex text-sm">
          See projects
        </Link>
        <Link to="/resume" className="btn-secondary inline-flex text-sm">
          Resume
        </Link>
      </motion.div>
    </main>
  )
}
