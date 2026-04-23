import { useMemo, type CSSProperties } from 'react'
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from 'framer-motion'
import { useViewportAtmosphere } from '../hooks/useViewportAtmosphere'

const PARTICLE_SEED = [0.12, 0.73, 0.45, 0.88, 0.22, 0.61, 0.35, 0.94, 0.08, 0.52, 0.66, 0.19, 0.77, 0.41, 0.9, 0.03, 0.58, 0.84, 0.14, 0.47, 0.7, 0.26, 0.99, 0.55, 0.31, 0.68, 0.05, 0.82, 0.24, 0.59, 0.16, 0.91]

type OrbSpec = {
  left: string
  top: string
  w: number
  c: [number, number, number]
  blur: number
  ax: number
  ay: number
}

/* Cyan, violet, emerald, warm accent — read clearly on dark, move with pointer */
const ORBS: OrbSpec[] = [
  { left: '8%', top: '12%', w: 440, c: [6, 182, 212], blur: 110, ax: 58, ay: 44 },
  { left: '78%', top: '10%', w: 340, c: [167, 139, 250], blur: 100, ax: -46, ay: 48 },
  { left: '40%', top: '64%', w: 460, c: [52, 211, 153], blur: 120, ax: 50, ay: -40 },
  { left: '88%', top: '70%', w: 280, c: [244, 114, 182], blur: 90, ax: -44, ay: 34 },
]

export function AnimatedBackdrop() {
  const { sx, sy, reduced: reduce } = useViewportAtmosphere()
  const { scrollYProgress } = useScroll()
  const scrollS = useSpring(scrollYProgress, { stiffness: 80, damping: 35, mass: 0.2 })

  const xPct = useTransform(sx, (v) => `${v * 100}%`)
  const yPct = useTransform(sy, (v) => `${v * 100}%`)
  const xOff = useTransform(sx, (v) => `${(v * 0.62 + 0.19) * 100}%`)
  const yOff = useTransform(sy, (v) => `${(v * 0.48 + 0.14) * 100}%`)

  /* Strong pointer “spotlight” on dark (screen blend reads as light) */
  const focusA = useMotionTemplate`radial-gradient(1000px circle at ${xPct} ${yPct}, rgba(34, 211, 238, 0.38) 0%, rgba(6, 182, 212, 0.1) 30%, transparent 55%)`
  const focusB = useMotionTemplate`radial-gradient(820px circle at ${xOff} ${yOff}, rgba(167, 139, 250, 0.28) 0%, transparent 52%)`
  const focusC = useMotionTemplate`radial-gradient(520px at ${xPct} ${yPct}, rgba(52, 211, 153, 0.16) 0%, transparent 48%)`
  const focusD = useMotionTemplate`radial-gradient(480px at ${xOff} ${yPct}, rgba(244, 114, 182, 0.16) 0%, transparent 42%)`
  const focusE = useMotionTemplate`radial-gradient(1200px at ${xPct} ${yOff}, rgba(6, 182, 212, 0.06) 0%, transparent 45%)`

  const meshX = useTransform(sx, (v) => (v - 0.5) * -62)
  const meshY = useTransform(sy, (v) => (v - 0.5) * -46)
  const meshScroll = useTransform(scrollS, (p) => p * 64)
  const meshYParallax = useTransform([meshY, meshScroll], ([a, b]) => (a as number) + (b as number))
  const meshRot = useTransform(sx, (v) => (v - 0.5) * 0.75)
  const meshXScroll = useTransform(scrollS, (p) => p * 18)
  const meshXTotal = useTransform([meshX, meshXScroll], ([a, b]) => (a as number) + (b as number))

  const o0x = useTransform(sx, (v) => (v - 0.5) * ORBS[0]!.ax)
  const o0y = useTransform(sy, (v) => (v - 0.5) * ORBS[0]!.ay)
  const o1x = useTransform(sx, (v) => (v - 0.5) * ORBS[1]!.ax)
  const o1y = useTransform(sy, (v) => (v - 0.5) * ORBS[1]!.ay)
  const o2x = useTransform(sx, (v) => (v - 0.5) * ORBS[2]!.ax)
  const o2y = useTransform(sy, (v) => (v - 0.5) * ORBS[2]!.ay)
  const o3x = useTransform(sx, (v) => (v - 0.5) * ORBS[3]!.ax)
  const o3y = useTransform(sy, (v) => (v - 0.5) * ORBS[3]!.ay)
  const orbX = [o0x, o1x, o2x, o3x]
  const orbY = [o0y, o1y, o2y, o3y]

  const orbScale = useTransform([sx, sy], ([vx, vy]) => {
    const px = (vx as number) - 0.5
    const py = (vy as number) - 0.5
    return 1 + 0.1 * (px * px + py * py) ** 0.5
  })

  const partX = useTransform(sx, (v) => (v - 0.5) * 40)
  const partY = useTransform(sy, (v) => (v - 0.5) * 32)

  const particles = useMemo(
    () =>
      PARTICLE_SEED.map((r, i) => ({
        id: i,
        left: `${(r * 97) % 100}%`,
        top: `${(r * 83 + i * 2.7) % 100}%`,
        delay: (i * 0.17) % 4,
        size: 1 + (i % 3),
        duration: 10 + (i % 8),
        drift: (i % 2 === 0 ? 1 : -1) * (8 + (i % 5)),
      })),
    [],
  )

  return (
    <div className="editorial-backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Deep base + static ambient (scroll shifts warmth slightly) */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 55% at 50% -25%, rgba(6, 78, 95, 0.45), transparent 55%),
            radial-gradient(ellipse 50% 45% at 100% 40%, rgba(88, 28, 135, 0.18), transparent 52%),
            radial-gradient(ellipse 45% 40% at 0% 80%, rgba(6, 78, 59, 0.12), transparent 50%),
            #080705
          `,
        }}
        initial={false}
        animate={
          reduce
            ? { opacity: 1 }
            : { opacity: [0.95, 1, 0.98, 0.95] as const }
        }
        transition={reduce ? { duration: 0 } : { duration: 10, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
      />

      {reduce ? (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(900px circle at 50% 45%, rgba(34, 211, 238, 0.15), transparent 50%),
            radial-gradient(700px at 32% 38%, rgba(167, 139, 250, 0.1), transparent 50%)`,
          }}
        />
      ) : (
        <>
          <motion.div className="absolute inset-0 will-change-[background]" style={{ background: focusA }} />
          <motion.div
            className="absolute inset-0 will-change-[background] mix-blend-screen opacity-95"
            style={{ background: focusB }}
          />
          <motion.div
            className="absolute inset-0 will-change-[background] mix-blend-screen opacity-80"
            style={{ background: focusC }}
          />
          <motion.div
            className="absolute inset-0 will-change-[background] mix-blend-screen opacity-60"
            style={{ background: focusD }}
          />
          <motion.div
            className="absolute inset-0 will-change-[background] mix-blend-screen opacity-50"
            style={{ background: focusE }}
          />
        </>
      )}

      <motion.div
        className="will-change-transform"
        style={{ x: meshXTotal, y: meshYParallax, rotate: meshRot, transformOrigin: '50% 18%' }}
      >
        <div
          className="absolute -inset-[100%] top-0 opacity-[0.4] [mask-image:linear-gradient(to_bottom,transparent,rgba(0,0,0,0.6),black,transparent)] animate-mesh-drift-light"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
            backgroundSize: '52px 52px',
            transform: 'perspective(500px) rotateX(55deg)',
          }}
        />
      </motion.div>

      {!reduce &&
        ORBS.map((o, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full will-change-transform"
            style={{
              left: o.left,
              top: o.top,
              width: o.w,
              height: o.w,
              marginLeft: -o.w / 2,
              marginTop: -o.w / 2,
              background: `radial-gradient(circle, rgba(${o.c[0]},${o.c[1]},${o.c[2]},0.3) 0%, transparent 65%)`,
              filter: `blur(${o.blur}px)`,
              x: orbX[i],
              y: orbY[i],
              scale: orbScale,
            }}
          />
        ))}

      {!reduce &&
        particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute will-change-transform"
            style={{ left: p.left, top: p.top, x: partX, y: partY }}
          >
            <span
              className="part-particle block rounded-full bg-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
              style={
                {
                  width: p.size,
                  height: p.size,
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                  ['--drift' as string]: `${p.drift}px`,
                } as CSSProperties
              }
            />
          </motion.div>
        ))}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.06) 1px, rgba(255,255,255,0.06) 2px)`,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,transparent,oklch(0.05_0.02_260_/_0.92))]"
        aria-hidden
      />
    </div>
  )
}
