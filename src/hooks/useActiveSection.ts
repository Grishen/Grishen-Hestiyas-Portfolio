import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const SECTION_IDS = ['about', 'skills', 'projects', 'contact'] as const

/**
 * Which in-page section is most aligned with the viewport center (readability / wayfinding).
 */
export function useActiveSection() {
  const [active, setActive] = useState<string>('')
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/') return

    const setFromScroll = () => {
      if (window.scrollY < 200) {
        setActive('')
      }
    }
    setFromScroll()

    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (n): n is HTMLElement => n !== null,
    )
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { root: null, rootMargin: '-42% 0px -42% 0px', threshold: 0 },
    )
    for (const el of elements) {
      observer.observe(el)
    }
    window.addEventListener('scroll', setFromScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', setFromScroll)
    }
  }, [location.pathname])

  if (location.pathname !== '/') return ''
  return active
}
