import { createContext } from 'react'
import { type MotionValue } from 'framer-motion'

export type ViewportAtmosphere = {
  sx: MotionValue<number>
  sy: MotionValue<number>
  rawX: MotionValue<number>
  rawY: MotionValue<number>
  reduced: boolean
}

export const ViewportAtmosphereContext = createContext<ViewportAtmosphere | null>(null)
