import { useState, useEffect } from 'react'

/**
 * useNavScroll — tracks scroll position and active section
 *
 * Returns:
 *  - scrolled: true when page is scrolled past `threshold` px
 *  - activeSection: ID string of the section currently in view
 */
export function useNavScroll(threshold = 60) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    // ── Scroll position listener ──────────────────────────────
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold)
    }

    // ── IntersectionObserver for active section ───────────────
    const sectionIds = [
      'home',
      'about',
      'activities',
      'events',
      'gallery',
      'team',
      'join-us',
      'contact',
    ]

    const observers = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        {
          // Fire when section is at least 35% visible
          threshold: 0.35,
          rootMargin: '-10% 0px -10% 0px',
        }
      )

      observer.observe(el)
      observers.push(observer)
    })

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // set initial state

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observers.forEach((o) => o.disconnect())
    }
  }, [threshold])

  return { scrolled, activeSection }
}
