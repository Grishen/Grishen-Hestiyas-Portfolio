import { useEffect, useMemo, type ReactNode } from 'react'
import { useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { ViewportAtmosphereContext } from './viewportAtmosphereState'

export function ViewportAtmosphereProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion() ?? false
  const rawX = useMotionValue(0.5)
  const rawY = useMotionValue(0.5)
  /* Snappier follow so the ambient field feels connected to the cursor */
  const springOpts = { stiffness: 92, damping: 22, mass: 0.32, restDelta: 0.0004 }
  const sx = useSpring(rawX, reduced ? { stiffness: 1000, damping: 200 } : springOpts)
  const sy = useSpring(rawY, reduced ? { stiffness: 1000, damping: 200 } : springOpts)

  useEffect(() => {
    if (reduced) {
      rawX.set(0.5)
      rawY.set(0.5)
      return
    }
    const onPointer = (e: PointerEvent) => {
      rawX.set(e.clientX / window.innerWidth)
      rawY.set(e.clientY / window.innerHeight)
    }
    const onWindowLeave = () => {
      rawX.set(0.5)
      rawY.set(0.5)
    }
    const onDocOut = (e: MouseEvent) => {
      if (e.relatedTarget === null) onWindowLeave()
    }
    window.addEventListener('pointermove', onPointer, { passive: true })
    document.addEventListener('mouseout', onDocOut)
    return () => {
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('mouseout', onDocOut)
    }
  }, [rawX, rawY, reduced])

  const value = useMemo(
    () => ({ sx, sy, rawX, rawY, reduced }),
    [sx, sy, rawX, rawY, reduced],
  )

  return (
    <ViewportAtmosphereContext.Provider value={value}>
      {children}
    </ViewportAtmosphereContext.Provider>
  )
}
