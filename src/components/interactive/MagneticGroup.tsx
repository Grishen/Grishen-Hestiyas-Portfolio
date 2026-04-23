import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

const sp = { stiffness: 200, damping: 18, mass: 0.45 }

type Props = {
  children: ReactNode
  className?: string
  /** Max shift in px */
  pull?: number
}

/**
 * Subtle parallax: children shift toward the cursor, then relax on leave.
 */
export function MagneticGroup({ children, className = '', pull = 8 }: Props) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const xS = useSpring(x, reduce ? { stiffness: 1000, damping: 200 } : sp)
  const yS = useSpring(y, reduce ? { stiffness: 1000, damping: 200 } : sp)

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return
    const b = ref.current.getBoundingClientRect()
    const cx = b.left + b.width / 2
    const cy = b.top + b.height / 2
    x.set(((e.clientX - cx) / b.width) * 2 * pull)
    y.set(((e.clientY - cy) / b.height) * 2 * pull)
  }
  const onPointerLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: xS, y: yS }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.div>
  )
}
