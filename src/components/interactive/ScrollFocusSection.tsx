import { useRef, type ReactNode } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

type Props = {
  id: string
  className?: string
  children: ReactNode
  /** Section padding/wrapper classes */
  innerClassName?: string
}

/**
 * As the section moves through the viewport, a soft edge glow “follows” the scroll
 * so it feels like you’re “bringing each block into focus.”
 */
export function ScrollFocusSection({ id, className = '', innerClassName = '', children }: Props) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.88', 'end 0.12'],
  })
  const glow = useTransform(scrollYProgress, [0, 0.2, 0.45, 0.7, 1], [0, 0.18, 0.28, 0.18, 0])

  if (reduce) {
    return (
      <section id={id} className={className}>
        <div className={innerClassName}>{children}</div>
      </section>
    )
  }

  return (
    <section id={id} className={`relative ${className}`} ref={ref}>
      <motion.div
        className="pointer-events-none absolute inset-0 -z-0 rounded-sm"
        style={{ opacity: glow }}
        aria-hidden
      >
        <div
          className="absolute inset-0 rounded-[inherit] opacity-40"
          style={{
            background:
              'radial-gradient(100% 80% at 50% 0%, rgba(34, 211, 238, 0.14), transparent 55%), linear-gradient(180deg, rgba(6, 182, 212, 0.08) 0%, transparent 42%)',
            boxShadow: 'inset 0 0 0 1px rgba(34, 211, 238, 0.1), 0 0 48px -10px rgba(6, 182, 212, 0.18)',
          }}
        />
      </motion.div>
      <div className={`relative z-10 ${innerClassName}`}>{children}</div>
    </section>
  )
}
