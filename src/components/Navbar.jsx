import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Cpu } from 'lucide-react'
import { useNavScroll } from '../hooks/useNavScroll'

/* ============================================================
   NAV LINKS — single source of truth
   ============================================================ */
const NAV_LINKS = [
  { label: 'Home',       href: '#home'       },
  { label: 'About',      href: '#about'      },
  { label: 'Activities', href: '#activities' },
  { label: 'Events',     href: '#events'     },
  { label: 'Team',       href: '#team'       },
  { label: 'Join Us',    href: '#join-us'    },
  { label: 'Contact',    href: '#contact'    },
]

/* ============================================================
   SMOOTH SCROLL HELPER
   ============================================================ */
function scrollToSection(href) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    // Section not yet built — gracefully scroll to top for #home
    if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

/* ============================================================
   LOGO — uses actual file if available, falls back to SVG placeholder
   ============================================================ */
function Logo() {
  return (
    <a
      href="#home"
      onClick={(e) => {
        e.preventDefault()
        scrollToSection('#home')
      }}
      className="flex items-center gap-3 flex-shrink-0 focus-ring rounded-lg"
      aria-label="Sairam UiAutomistix Club — Go to home"
    >
      {/* Logo image — official uploaded logo */}
      <div
        className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden flex-shrink-0 bg-white p-0.5 shadow-sm border border-white/20"
        aria-hidden="true"
      >
        <img
          src="/assets/logo/logo.png"
          alt="Sairam UiAutomistix Club Logo"
          className="w-full h-full object-contain"
          onError={(e) => {
            if (!e.currentTarget.dataset.fallbackTried) {
              e.currentTarget.dataset.fallbackTried = 'true'
              e.currentTarget.src = '/assets/logo/logo.jpg'
            } else {
              e.currentTarget.style.display = 'none'
              if (e.currentTarget.nextElementSibling) {
                e.currentTarget.nextElementSibling.style.display = 'flex'
              }
            }
          }}
        />
        {/* Fallback icon — hidden when real logo loads */}
        <span
          className="absolute inset-0 items-center justify-center hidden bg-[#F64124]"
          aria-hidden="true"
        >
          <Cpu size={20} color="#ffffff" strokeWidth={1.8} />
        </span>
      </div>

      {/* Club name text */}
      <span
        className="font-semibold leading-tight select-none"
        style={{
          fontFamily: 'Space Grotesk, Inter, sans-serif',
          fontSize: '0.95rem',
          letterSpacing: '-0.01em',
          color: '#FFFFFF',
          transition: 'color 300ms ease',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ color: '#F64124' }}>Sairam</span>
        {' '}
        <span>UiAutomistix Club</span>
      </span>
    </a>
  )
}

/* ============================================================
   DESKTOP NAV LINK
   ============================================================ */
function DesktopNavLink({ link, isActive }) {
  const textColor = isActive
    ? '#F64124'
    : 'rgba(255, 255, 255, 0.82)'

  return (
    <a
      href={link.href}
      onClick={(e) => {
        e.preventDefault()
        scrollToSection(link.href)
      }}
      className="relative group flex items-center py-1 focus-ring rounded"
      aria-current={isActive ? 'page' : undefined}
      style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: textColor,
        transition: 'color 250ms ease',
        letterSpacing: '0.01em',
        textDecoration: 'none',
      }}
    >
      {link.label}

      {/* Animated underline */}
      <span
        className="absolute bottom-0 left-0 h-[2px] rounded-full"
        style={{
          background: '#F64124',
          width: isActive ? '100%' : '0%',
          transition: 'width 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
      {/* Hover underline (separate layer so active + hover don't conflict) */}
      <span
        className="absolute bottom-0 left-0 h-[2px] rounded-full opacity-0 group-hover:opacity-100 group-hover:w-full"
        style={{
          background: '#F64124',
          width: '0%',
          transition: 'width 250ms cubic-bezier(0.16, 1, 0.3, 1), opacity 150ms ease',
        }}
      />
    </a>
  )
}

/* ============================================================
   MOBILE NAV LINK
   ============================================================ */
function MobileNavLink({ link, isActive, index, onClose }) {
  return (
    <motion.div
      key={link.href}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ delay: index * 0.045, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: '100%' }}
    >
      <a
        href={link.href}
        onClick={(e) => {
          e.preventDefault()
          onClose()
          // Small delay so menu closes first, then scrolls
          setTimeout(() => scrollToSection(link.href), 180)
        }}
        className="focus-ring"
        aria-current={isActive ? 'page' : undefined}
        style={{
          display: 'block',
          width: '100%',
          fontFamily: 'Inter, sans-serif',
          fontSize: '1rem',
          fontWeight: isActive ? 600 : 500,
          color: isActive ? '#F64124' : 'rgba(255, 255, 255, 0.9)',
          background: isActive ? 'rgba(246, 65, 36, 0.1)' : 'transparent',
          borderLeft: isActive ? '3px solid #F64124' : '3px solid transparent',
          borderRadius: '0.625rem',
          padding: '0.75rem 1rem',
          transition: 'background 200ms ease, color 200ms ease',
          textDecoration: 'none',
          letterSpacing: '0.01em',
          boxSizing: 'border-box',
        }}
      >
        {link.label}
      </a>
    </motion.div>
  )
}

/* ============================================================
   NAVBAR — main component
   ============================================================ */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrolled, activeSection } = useNavScroll(60)

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), [])

  // Navbar background styles
  const navbarBg = scrolled
    ? 'rgba(10, 10, 10, 0.88)'
    : 'transparent'

  const navbarBorder = scrolled
    ? '1px solid rgba(255, 255, 255, 0.08)'
    : '1px solid transparent'

  const navbarShadow = scrolled
    ? '0 4px 24px rgba(0, 0, 0, 0.45)'
    : 'none'

  const navbarBackdrop = scrolled ? 'blur(16px)' : 'none'

  return (
    <>
      {/*
        ── NAVBAR BAR ──────────────────────────────────────────────
        z-index: 1001 — highest layer, always sits above the menu panel
        and the backdrop so the hamburger / X button is always clickable.
      */}
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 w-full"
        style={{
          zIndex: 1001,
          background: navbarBg,
          backdropFilter: navbarBackdrop,
          WebkitBackdropFilter: navbarBackdrop,
          borderBottom: navbarBorder,
          boxShadow: navbarShadow,
          transition:
            'background 350ms ease, box-shadow 350ms ease, border-color 350ms ease, backdrop-filter 350ms ease',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="w-full mx-auto flex items-center justify-between"
          style={{ maxWidth: '1280px', padding: '0 1.25rem', height: '68px' }}
        >
          {/* Logo */}
          <Logo />

          {/* ── DESKTOP LINKS ─────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-7" role="menubar">
            {NAV_LINKS.map((link) => (
              <DesktopNavLink
                key={link.href}
                link={link}
                isActive={activeSection === link.href.replace('#', '')}
              />
            ))}
          </div>

          {/* ── HAMBURGER (mobile/tablet) ──────────────────────── */}
          <button
            type="button"
            onClick={toggleMenu}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl focus-ring"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            style={{
              flexShrink: 0,
              background: menuOpen
                ? 'rgba(246, 65, 36, 0.12)'
                : scrolled
                ? 'rgba(255, 255, 255, 0.06)'
                : 'rgba(255, 255, 255, 0.1)',
              border: menuOpen
                ? '1px solid rgba(246, 65, 36, 0.3)'
                : '1px solid rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              transition: 'background 250ms ease, border-color 250ms ease',
              cursor: 'pointer',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={20} strokeWidth={2} color="#FFFFFF" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Menu size={20} strokeWidth={2} color="#FFFFFF" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* ── MOBILE MENU DROPDOWN ──────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/*
              Backdrop overlay.
              top: 68px — starts BELOW the navbar so the nav bar and hamburger
              button are never covered and always remain clickable.
              z-index: 998 — below the menu panel (1000) and navbar (1001).
            */}
            <motion.div
              key="mobile-backdrop"
              className="fixed left-0 right-0 bottom-0 lg:hidden"
              style={{
                top: '68px',
                zIndex: 998,
                background: 'rgba(10, 10, 10, 0.65)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/*
              Menu panel.
              top: 68px — placed directly under the navbar with no gap.
              z-index: 1000 — above backdrop (998) but below navbar bar (1001).
              marginLeft/Right: 12px — breathing room on all widths (320 px+).
              maxHeight + overflowY: auto — scrollable on very short viewports.
            */}
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              role="menu"
              className="fixed left-0 right-0 lg:hidden"
              style={{
                top: '68px',
                zIndex: 1000,
                marginLeft: '12px',
                marginRight: '12px',
                background: 'rgba(14, 14, 14, 0.97)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(246, 65, 36, 0.15)',
                borderRadius: '1rem',
                boxShadow: '0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)',
                maxHeight: 'calc(100dvh - 88px)',
                overflowY: 'auto',
                overflowX: 'hidden',
              }}
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Top accent bar */}
              <div
                aria-hidden="true"
                style={{
                  height: '2px',
                  background: 'linear-gradient(90deg, #F64124, rgba(246,65,36,0.2))',
                  flexShrink: 0,
                }}
              />

              {/* Nav links — 8px container padding, 2px gap between items */}
              <div
                role="none"
                style={{
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                }}
              >
                {NAV_LINKS.map((link, i) => (
                  <MobileNavLink
                    key={link.href}
                    link={link}
                    index={i}
                    isActive={activeSection === link.href.replace('#', '')}
                    onClose={closeMenu}
                  />
                ))}
              </div>

              {/* Bottom club name strip */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  padding: '10px 20px',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: 'Space Grotesk, Inter, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.35)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  Sairam UiAutomistix Club
                </span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    background: '#F64124',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <Cpu size={13} color="#fff" strokeWidth={2} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
