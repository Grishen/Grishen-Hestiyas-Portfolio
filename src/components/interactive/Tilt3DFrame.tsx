import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

const spring = { stiffness: 200, damping: 22, mass: 0.4 }

type Props = {
  children: ReactNode
  className?: string
  max?: number
}

/**
 * 3D tilt that follows pointer inside the box — “you control the angle” feel.
 */
export function Tilt3DFrame({ children, className = '', max = 4 }: Props) {
  const reduce = useReducedMotion()
  const r = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, reduce ? { stiffness: 1000, damping: 200 } : spring)
  const sry = useSpring(ry, reduce ? { stiffness: 1000, damping: 200 } : spring)
  const rotateY = useTransform(sry, (v) => -v)

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduce || !r.current) return
    const b = r.current.getBoundingClientRect()
    const x = (e.clientX - b.left) / b.width
    const y = (e.clientY - b.top) / b.height
    rx.set((y - 0.5) * 2 * max)
    ry.set((x - 0.5) * 2 * max)
  }

  const onPointerLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <div className={className} ref={r} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} style={{ perspective: '1000px' }}>
      <motion.div
        className="h-full w-full will-change-transform"
        style={{ rotateX: srx, rotateY, transformStyle: 'preserve-3d' as const }}
        transition={spring}
      >
        {children}
      </motion.div>
    </div>
  )
}
