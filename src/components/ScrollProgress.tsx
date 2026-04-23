import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const shouldReduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  if (shouldReduce) {
    return null
  }

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-emerald-400 [box-shadow:0_0_14px_rgba(34,211,238,0.4)]"
      style={{ scaleX }}
      aria-hidden
    />
  )
}
