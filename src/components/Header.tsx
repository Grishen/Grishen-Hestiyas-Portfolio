import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { site } from '../content'
import { useActiveSection } from '../hooks/useActiveSection'

const sectionLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
] as const

function sectionHref(hash: string, pathname: string) {
  return pathname === '/' ? hash : `/${hash}`
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()
  const location = useLocation()
  const active = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 border-b transition-colors ${
        scrolled
          ? 'border-white/10 bg-zinc-950/90 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl'
          : 'border-transparent bg-zinc-950/50 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex min-h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          to="/"
          className="min-w-0 shrink focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:outline-none"
        >
          <span className="font-display block truncate text-sm font-semibold text-stone-100">
            {site.name}
          </span>
          <span className="text-xs text-stone-500">Engineer &amp; builder</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex md:gap-3">
          <nav className="flex items-center gap-0.5" aria-label="Page sections">
            {sectionLinks.map((l) => {
              if (l.href === '#about') {
                const aboutPageActive = location.pathname === '/about'
                return (
                  <motion.div
                    key="about-page"
                    whileHover={reduce ? undefined : { y: -1, scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 26 }}
                  >
                    <Link
                      to="/about"
                      className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:outline-none ${
                        aboutPageActive
                          ? 'bg-cyan-500/20 text-cyan-100'
                          : 'text-stone-400 hover:bg-white/5 hover:text-stone-100'
                      }`}
                      aria-current={aboutPageActive ? 'page' : undefined}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                )
              }
              if (l.href === '#projects') {
                const projectsActive =
                  location.pathname === '/projects' ||
                  (location.pathname === '/' && active === 'projects')
                return (
                  <motion.div
                    key="projects"
                    whileHover={reduce ? undefined : { y: -1, scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 26 }}
                  >
                    <Link
                      to="/projects"
                      className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:outline-none ${
                        projectsActive
                          ? 'bg-cyan-500/20 text-cyan-100'
                          : 'text-stone-400 hover:bg-white/5 hover:text-stone-100'
                      }`}
                      aria-current={projectsActive ? 'page' : undefined}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                )
              }
              const id = l.href.replace('#', '')
              const isActive = location.pathname === '/' && active === id
              return (
                <motion.a
                  key={l.href}
                  href={sectionHref(l.href, location.pathname)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:outline-none ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-100'
                      : 'text-stone-400 hover:bg-white/5 hover:text-stone-100'
                  }`}
                  whileHover={reduce ? undefined : { y: -1, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 26 }}
                  aria-current={isActive ? true : undefined}
                >
                  {l.label}
                </motion.a>
              )
            })}
          </nav>
          <p
            className="hidden max-w-[15rem] border-l border-white/10 pl-3 text-xs leading-snug text-stone-500 lg:block"
            aria-hidden
          >
          </p>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/12 bg-white/5 text-stone-200 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="flex flex-col gap-1.5">
            <span
              className={`h-0.5 w-5 origin-center rounded bg-stone-200 transition ${
                open ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`h-0.5 w-5 rounded bg-stone-200 transition ${open ? 'scale-0 opacity-0' : ''}`}
            />
            <span
              className={`h-0.5 w-5 origin-center rounded bg-stone-200 transition ${
                open ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="max-h-[min(70dvh,420px)] overflow-y-auto border-t border-white/10 bg-zinc-950/98 backdrop-blur-xl md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col gap-1 p-3">
              {sectionLinks.map((l) => {
                if (l.href === '#about') {
                  const aboutPageActive = location.pathname === '/about'
                  return (
                    <Link
                      key="about-page"
                      to="/about"
                      onClick={() => setOpen(false)}
                      className={`min-h-12 content-center rounded-lg px-3 py-2 text-base ${
                        aboutPageActive ? 'bg-cyan-500/15 text-cyan-100' : 'text-stone-200 hover:bg-white/5'
                      }`}
                      aria-current={aboutPageActive ? 'page' : undefined}
                    >
                      {l.label}
                    </Link>
                  )
                }
                if (l.href === '#projects') {
                  const projectsActive =
                    location.pathname === '/projects' ||
                    (location.pathname === '/' && active === 'projects')
                  return (
                    <Link
                      key="projects"
                      to="/projects"
                      onClick={() => setOpen(false)}
                      className={`min-h-12 content-center rounded-lg px-3 py-2 text-base ${
                        projectsActive ? 'bg-cyan-500/15 text-cyan-100' : 'text-stone-200 hover:bg-white/5'
                      }`}
                      aria-current={projectsActive ? 'page' : undefined}
                    >
                      {l.label}
                    </Link>
                  )
                }
                const id = l.href.replace('#', '')
                const isActive = location.pathname === '/' && active === id
                return (
                  <a
                    key={l.href}
                    href={sectionHref(l.href, location.pathname)}
                    onClick={() => setOpen(false)}
                    className={`min-h-12 content-center rounded-lg px-3 py-2 text-base ${
                      isActive ? 'bg-cyan-500/15 text-cyan-100' : 'text-stone-200 hover:bg-white/5'
                    }`}
                    aria-current={isActive ? true : undefined}
                  >
                    {l.label}
                  </a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
