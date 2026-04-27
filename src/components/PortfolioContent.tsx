import { useMemo, type ReactNode } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import { ProjectCard } from './ProjectCard'
import { MagneticGroup } from './interactive/MagneticGroup'
import { site } from '../content'
import { publicUrl } from '../lib/publicUrl'

const sectionTransition = { duration: 0.5, ease: [0.22, 0.7, 0.18, 1] as const }
const springUi = { type: 'spring' as const, stiffness: 360, damping: 28 }

function SectionTitle({
  id,
  num,
  eyebrow,
  title,
  subtitle,
}: {
  id: string
  num: string
  eyebrow: string
  title: string
  subtitle?: string
}) {
  const reduce = useReducedMotion()
  return (
    <div id={id} className="mb-10 max-w-3xl scroll-mt-28">
      <div className="mb-2 flex flex-wrap items-baseline gap-3">
        <span className="eyebrow-num" aria-hidden>
          {num}
        </span>
        <motion.p
          className="m-0 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/90"
          initial={reduce ? false : { opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={sectionTransition}
        >
          {eyebrow}
        </motion.p>
      </div>
      <motion.h2
        className="font-display m-0 text-3xl font-bold tracking-tight text-stone-100 sm:text-4xl"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ ...sectionTransition, delay: 0.04 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <p className="text-body mt-3 max-w-xl text-balance text-sm sm:text-base">{subtitle}</p>
      )}
    </div>
  )
}

function RevealWords({ text, className = '' }: { text: string; className?: string }) {
  const words = useMemo(() => text.split(' '), [text])
  const reduce = useReducedMotion()
  if (reduce) {
    return <p className={className}>{text}</p>
  }
  return (
    <p className={className}>
      {words.map((w, i) => (
        <span key={`${i}-${w}`} className="inline-block [vertical-align:baseline]">
          <span className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: 10, opacity: 0, filter: 'blur(2px)' }}
              whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.25, margin: '0px 0px -5% 0px' }}
              transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.85, delay: 0.02 * i }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </p>
  )
}

function FadeInView({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 8 : 16, filter: reduce ? 'none' : 'blur(2px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2, margin: '-10% 0px' }}
      transition={reduce ? { ...sectionTransition, delay } : { ...springUi, delay }}
    >
      {children}
    </motion.div>
  )
}

function HeroName() {
  const parts = useMemo(
    () => site.name.split(' ').map((w, i) => ({ w, i })),
    [],
  )
  const reduce = useReducedMotion()
  return (
    <h1
      className="font-display m-0 text-[clamp(2.5rem,6vw+1rem,4.25rem)] font-extrabold leading-[1.05] tracking-tight text-stone-100"
      id="hero-heading"
    >
      {parts.map(({ w, i }) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block bg-gradient-to-r from-stone-100 to-stone-300 bg-clip-text text-transparent"
            initial={{ y: '110%', opacity: 0.4 }}
            animate={{ y: 0, opacity: 1 }}
            transition={
              reduce
                ? { ...sectionTransition }
                : { type: 'spring', stiffness: 280, damping: 24, mass: 0.85, delay: 0.08 * i }
            }
          >
            {w}
          </motion.span>
          {i < parts.length - 1 && '\u00A0'}
        </span>
      ))}
    </h1>
  )
}

function StreamingTagline() {
  const words = useMemo(() => site.tagline.split(' '), [])
  const reduce = useReducedMotion()
  if (reduce) {
    return <p className="text-body mt-8 max-w-xl text-balance text-base sm:text-lg">{site.tagline}</p>
  }
  return (
    <p className="text-body mt-8 max-w-xl text-balance text-base sm:text-lg">
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 6, filter: 'blur(2px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ ...sectionTransition, delay: 0.04 * i + 0.15 }}
        >
          {w}
          {i < words.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </p>
  )
}

function MotionHint() {
  const reduce = useReducedMotion()
  return (
    <p className="mt-5 max-w-xl text-sm text-stone-500" role="status">
      <span
        className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]"
        aria-hidden
      />
      {reduce
        ? 'Motion is reduced to match your system settings.'
        : 'The canvas, hero card, and project tiles react to your pointer; scroll adds a little depth — content stays still.'}
    </p>
  )
}

const codeStyle =
  'rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[0.75rem] text-cyan-200/90'

/**
 * Local cyan/violet highlight that follows the pointer inside the “At a glance” card.
 */
function PointerGlowPanel({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const xS = useSpring(x, { stiffness: 200, damping: 24 })
  const yS = useSpring(y, { stiffness: 200, damping: 24 })
  const xPct = useTransform(xS, (v) => `${v * 100}%`)
  const yPct = useTransform(yS, (v) => `${v * 100}%`)
  const glow = useMotionTemplate`radial-gradient(720px circle at ${xPct} ${yPct}, rgba(34, 211, 238, 0.22), rgba(168, 85, 247, 0.1) 45%, transparent 68%)`

  if (reduce) {
    return <div className="panel-glass p-6 sm:p-8">{children}</div>
  }

  return (
    <div
      className="panel-glass relative cursor-crosshair overflow-hidden p-6 sm:p-8"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left) / r.width)
        y.set((e.clientY - r.top) / r.height)
      }}
      onPointerLeave={() => {
        x.set(0.5)
        y.set(0.5)
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: glow }}
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export function PortfolioContent() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const heroParallaxY = useTransform(scrollY, [0, 420], [0, 40])
  const asideParallaxY = useTransform(scrollY, [0, 480], [0, -24])
  const cardHover = reduce
    ? undefined
    : { y: -2, boxShadow: '0 0 0 1px rgba(34, 211, 238, 0.25), 0 20px 50px -20px rgba(0,0,0,0.5)' }

  return (
    <main id="main-content" tabIndex={-1} className="relative">
      <section
        className="relative min-h-[min(90vh,880px)] px-4 pt-28 pb-20 sm:px-6 sm:pb-24"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
          <motion.div
            className="lg:col-span-7"
            style={{ y: reduce ? 0 : heroParallaxY }}
          >
            <h2 className="sr-only">
              {site.name} — {site.role}
            </h2>
            <p className="text-sm font-medium text-cyan-400/80 sm:text-base">
            </p>
            <div className="mt-4">
              <HeroName />
            </div>
            <p className="mt-4 font-mono text-sm text-stone-400 sm:text-base">
              <span className="text-stone-500">Role</span> · {site.role}
              <br />
              <span className="text-stone-500">Education</span> · {site.education}
            </p>
            <StreamingTagline />
            <MotionHint />
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <MagneticGroup className="inline-flex" pull={14}>
                <motion.div whileHover={cardHover} whileTap={{ scale: 0.98 }} transition={springUi}>
                  <Link to="/projects" className="btn-primary inline-flex">
                    View projects
                  </Link>
                </motion.div>
              </MagneticGroup>
              <MagneticGroup className="inline-flex" pull={11}>
                <motion.a
                  href="#contact"
                  className="btn-secondary"
                  whileHover={cardHover}
                  whileTap={{ scale: 0.98 }}
                  transition={springUi}
                >
                  Contact
                </motion.a>
              </MagneticGroup>
            </div>
          </motion.div>

          <motion.div
            className="relative lg:col-span-5"
            style={{ y: reduce ? 0 : asideParallaxY }}
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...sectionTransition, delay: 0.2 }}
            >
            <PointerGlowPanel>
              <p className="m-0 text-xs font-semibold uppercase tracking-wider text-stone-500">
                At a glance
              </p>
              <dl className="mt-4 space-y-4 text-sm text-stone-300">
                <div className="border-l-2 border-cyan-500/50 pl-4">
                  <dt className="font-mono text-xs uppercase tracking-wider text-stone-500">Focus</dt>
                  <dd className="mt-1 leading-relaxed">
                    Reliable software: APIs, UIs, and the glue between them — with tests and
                    operability in mind.
                  </dd>
                </div>
                <div className="border-l-2 border-fuchsia-500/40 pl-4">
                  <dt className="font-mono text-xs uppercase tracking-wider text-stone-500">Customize</dt>
                  <dd className="mt-1 leading-relaxed">
                    Name, story, projects, and links live in <code className={codeStyle}>content.ts</code>{' '}
                    so you can update without hunting through layout code.
                  </dd>
                </div>
                <div className="border-l-2 border-emerald-500/40 pl-4">
                  <dt className="font-mono text-xs uppercase tracking-wider text-stone-500">Motion</dt>
                  <dd className="mt-1 leading-relaxed text-stone-400">
                    Foreground is stable; the environment reacts. That keeps reading comfortable on a
                    dark canvas.
                  </dd>
                </div>
              </dl>
            </PointerGlowPanel>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-28 border-t border-white/10 bg-white/[0.02]"
      >
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <FadeInView>
            <SectionTitle
              id="about-heading"
              num="01"
              eyebrow="About"
              title="Who I am"
              /*subtitle="A short narrative — swap it for your own story in content and keep the structure for scanability."*/
            />
            <RevealWords
              className="prose-calm text-balance"
              text={`I am ${site.name}, an AI Software Engineer with a ${site.education}. I care about clear boundaries between services, code that the next person can own, and shipping work that still makes sense under load and over time.`}
            />
            {/*<div className="mt-5">
              <RevealWords
                className="prose-calm text-balance"
                text="Name teams, products, and outcomes you want remembered — concrete beats generic."
              />
            </div>*/}
            <div className="mt-8">
              <MagneticGroup className="inline-flex" pull={10}>
                <motion.div whileTap={reduce ? undefined : { scale: 0.98 }} transition={springUi}>
                  <Link to="/about" className="btn-secondary inline-flex">
                    Learn more about me
                  </Link>
                </motion.div>
              </MagneticGroup>
            </div>
          </FadeInView>
        </div>
      </section>

      <section id="skills" className="scroll-mt-28 border-t border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <FadeInView>
            <SectionTitle
              id="skills-heading"
              num="02"
              eyebrow="Skills"
              title="Tools and focus areas"
              subtitle="Grouped as pills so visitors skim before they read project detail."
            />
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0 sm:gap-3">
              {site.skills.map((s) => (
                <li key={s}>
                  <motion.span
                    className="inline-flex cursor-default items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-stone-200 will-change-transform"
                    whileHover={
                      reduce
                        ? undefined
                        : {
                            scale: 1.05,
                            borderColor: 'rgba(34, 211, 238, 0.35)',
                            boxShadow: '0 0 24px -6px rgba(34, 211, 238, 0.35)',
                          }
                    }
                    whileTap={reduce ? undefined : { scale: 0.98 }}
                    transition={springUi}
                  >
                    {s}
                  </motion.span>
                </li>
              ))}
            </ul>
          </FadeInView>
        </div>
      </section>

      <section id="projects" className="scroll-mt-28 border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <FadeInView>
            <SectionTitle
              id="projects-heading"
              num="03"
              eyebrow="Projects"
              title="Selected work"
              subtitle="One card per entry: title, summary, stack tags, then a link or edit hint."
            />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {site.projects.map((p, i) => (
                <ProjectCard key={p.title} project={p} index={i} reduce={!!reduce} truncateDescription />
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

      <section id="contact" className="scroll-mt-28 border-t border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <FadeInView>
            <SectionTitle
              id="contact-heading"
              num="04"
              eyebrow="Contact"
              title="Say hello"
              subtitle="Email first, then socials — consistent order helps people act."
            />
            <p className="prose-calm mb-8 text-balance">
              For opportunities or collaboration, reach out. Replace the placeholder email and
              social URLs in <code className={codeStyle}>src/content.ts</code>.
            </p>
            <motion.a
              href={`mailto:${site.email}`}
              className="font-display inline-block text-2xl font-bold tracking-tight text-cyan-300 underline decoration-cyan-500/30 decoration-2 underline-offset-[6px] sm:text-3xl"
              whileHover={reduce ? undefined : { scale: 1.02, color: 'rgb(165, 243, 252)' }}
              whileTap={reduce ? undefined : { scale: 0.99 }}
              transition={springUi}
            >
              {site.email}
            </motion.a>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticGroup className="inline-flex" pull={10}>
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Link to="/resume" className="btn-primary inline-flex">
                    View resume
                  </Link>
                </motion.div>
              </MagneticGroup>
              <MagneticGroup className="inline-flex" pull={10}>
                <motion.a
                  href={publicUrl(site.resume.pdfPath)}
                  download={site.resume.downloadFileName}
                  className="btn-secondary inline-flex"
                  whileTap={{ scale: 0.98 }}
                >
                  Download PDF
                </motion.a>
              </MagneticGroup>
              <MagneticGroup className="inline-flex" pull={10}>
                <motion.a
                  href={site.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  whileTap={{ scale: 0.98 }}
                >
                  GitHub
                </motion.a>
              </MagneticGroup>
              <MagneticGroup className="inline-flex" pull={10}>
                <motion.a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  whileTap={{ scale: 0.98 }}
                >
                  LinkedIn
                </motion.a>
              </MagneticGroup>
            </div>
          </FadeInView>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-zinc-950/60 px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0 text-xs text-stone-500">© {new Date().getFullYear()} {site.name}</p>
          <motion.a
            href="#top"
            className="w-fit text-xs font-medium text-cyan-500/80"
            whileHover={reduce ? undefined : { scale: 1.05, x: 2, color: 'rgb(94, 234, 212)' }}
            transition={springUi}
          >
            Back to top ↑
          </motion.a>
        </div>
      </footer>
    </main>
  )
}
