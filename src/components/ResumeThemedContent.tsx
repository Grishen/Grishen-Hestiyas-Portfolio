import { Fragment, useMemo } from 'react'
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import { structureResumeText, type ResumeBlock } from '../lib/structureResumeText'

const fade = { duration: 0.35, ease: [0.22, 0.7, 0.18, 1] as const }

type MotionIn = Pick<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'transition'>

function splitHeaderBody(blocks: ResumeBlock[]): { header: ResumeBlock[]; body: ResumeBlock[] } {
  const header: ResumeBlock[] = []
  let i = 0
  while (i < blocks.length && (blocks[i]!.type === 'name' || blocks[i]!.type === 'title' || blocks[i]!.type === 'contact')) {
    header.push(blocks[i]!)
    i++
  }
  const body = blocks.slice(i)
  if (header.length === 0) return { header: [], body: blocks }
  return { header, body }
}

function ContactLine({ text, motionProps }: { text: string; motionProps: MotionIn }) {
  const parts = text
    .split(/\s*·\s*/)
    .map((p) => p.trim())
    .filter(Boolean)
  if (parts.length <= 1) {
    return (
      <motion.p
        {...motionProps}
        className="m-0 max-w-2xl text-sm leading-relaxed text-stone-400 [text-wrap:balance] sm:text-[0.9375rem]"
      >
        {text}
      </motion.p>
    )
  }
  return (
    <motion.div {...motionProps} className="flex max-w-2xl flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3 sm:gap-y-1.5">
      {parts.map((part, j) => (
        <Fragment key={j}>
          {j > 0 && <span className="hidden self-center sm:inline" aria-hidden><span className="text-stone-600">|</span></span>}
          <span className="text-sm leading-relaxed font-mono text-stone-400 [text-wrap:balance] sm:text-[0.9375rem]">{part}</span>
        </Fragment>
      ))}
    </motion.div>
  )
}

function SectionHeading({ text, motionProps, isFirst }: { text: string; motionProps: MotionIn; isFirst: boolean }) {
  return (
    <motion.div
      {...motionProps}
      className={isFirst ? 'pt-0.5' : 'mt-2 border-t border-white/[0.08] pt-9 sm:pt-10'}
    >
      <h3 className="m-0 font-mono text-[0.7rem] font-semibold tracking-[0.2em] text-cyan-400/90 uppercase">{text}</h3>
    </motion.div>
  )
}

function BulletList({ items, motionProps }: { items: string[]; motionProps: MotionIn }) {
  return (
    <motion.div {...motionProps} className="pl-0 sm:pl-0.5">
      <ul className="m-0 list-none space-y-2.5 p-0 sm:space-y-3">
        {items.map((item, j) => (
          <li
            key={j}
            className="relative pl-5 text-[0.9375rem] leading-relaxed [text-wrap:pretty] sm:pl-6 sm:text-base sm:leading-7"
          >
            <span
              className="absolute top-2.5 left-0 h-1.5 w-1.5 shrink-0 rounded-sm bg-cyan-400/80 sm:top-3"
              aria-hidden
            />
            <span className="text-stone-300">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function buildMotion(
  index: number,
  reduce: boolean,
  baseDelay: number,
): { initial: false | { opacity: number; y: number }; animate: { opacity: number; y: number }; transition: { duration: number; delay: number; ease: readonly [number, number, number, number] } } {
  return {
    initial: reduce ? false : { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    transition: { ...fade, delay: baseDelay + index * 0.02 },
  }
}

function BlockView({
  b,
  blockIndex,
  reduce,
  baseDelay,
  isFirstSection,
}: {
  b: ResumeBlock
  blockIndex: number
  reduce: boolean
  baseDelay: number
  isFirstSection: boolean
}) {
  const m = buildMotion(blockIndex, reduce, baseDelay)
  const motionProps: MotionIn = { initial: m.initial, animate: m.animate, transition: m.transition }

  if (b.type === 'name') {
    return (
      <motion.h2
        initial={m.initial}
        animate={m.animate}
        transition={m.transition}
        className="font-display m-0 text-3xl font-bold tracking-tight text-balance text-stone-100 sm:text-[2.15rem] sm:leading-tight"
      >
        {b.text}
      </motion.h2>
    )
  }
  if (b.type === 'title') {
    return (
      <motion.p
        initial={m.initial}
        animate={m.animate}
        transition={m.transition}
        className="m-0 text-lg font-medium text-cyan-300/90 sm:text-xl [text-wrap:balance]"
      >
        {b.text}
      </motion.p>
    )
  }
  if (b.type === 'contact') {
    return <ContactLine text={b.text} motionProps={motionProps} />
  }
  if (b.type === 'section') {
    return <SectionHeading text={b.text} motionProps={motionProps} isFirst={isFirstSection} />
  }
  if (b.type === 'bullets') {
    return <BulletList items={b.items} motionProps={motionProps} />
  }
  if (b.type === 'bullet') {
    return <BulletList items={[b.text]} motionProps={motionProps} />
  }
  return (
    <motion.p
      initial={m.initial}
      animate={m.animate}
      transition={m.transition}
      className="text-body m-0 max-w-prose text-pretty text-[0.9375rem] leading-7 text-stone-300 sm:text-base sm:leading-8"
    >
      {b.text}
    </motion.p>
  )
}

export function ResumeThemedContent({ text }: { text: string }) {
  const reduce = useReducedMotion()
  const blocks = useMemo(() => structureResumeText(text), [text])
  const { header, body } = useMemo(() => splitHeaderBody(blocks), [blocks])
  const display = header.length > 0 ? body : blocks
  const firstSectionInDisplay = useMemo(() => display.findIndex((x) => x.type === 'section'), [display])

  if (blocks.length === 0) {
    return <p className="text-body m-0 p-6 text-stone-500">No text could be read from this PDF.</p>
  }

  return (
    <article className="mx-auto max-w-2xl">
      {header.length > 0 && (
        <header className="mb-8 rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent px-4 py-6 sm:mb-10 sm:px-7 sm:py-7">
          <div className="flex flex-col gap-3.5 sm:gap-4">
            {header.map((b, i) => (
              <BlockView
                key={`h-${i}`}
                b={b}
                blockIndex={i}
                reduce={!!reduce}
                baseDelay={0}
                isFirstSection={false}
              />
            ))}
          </div>
        </header>
      )}

      <div className="flex flex-col gap-5 sm:gap-6">
        {display.map((b, i) => (
          <BlockView
            key={`d-${i}`}
            b={b}
            blockIndex={i}
            reduce={!!reduce}
            baseDelay={0.04 * i + (header.length > 0 ? 0.06 : 0)}
            isFirstSection={b.type === 'section' && i === firstSectionInDisplay}
          />
        ))}
      </div>
    </article>
  )
}
