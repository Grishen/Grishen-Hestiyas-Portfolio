import { useContext } from 'react'
import {
  type ViewportAtmosphere,
  ViewportAtmosphereContext,
} from '../context/viewportAtmosphereState'

export function useViewportAtmosphere(): ViewportAtmosphere {
  const c = useContext(ViewportAtmosphereContext)
  if (!c) {
    throw new Error('useViewportAtmosphere must be used within ViewportAtmosphereProvider')
  }
  return c
}
