import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Users } from 'lucide-react'

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */
const EASE_OUT = [0.16, 1, 0.3, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: EASE_OUT },
})

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.65, delay, ease: 'easeOut' },
})

/* ============================================================
   CIRCUIT BOARD SVG VISUAL
   A lightweight, CSS-animated automation/circuit illustration.
   Logo loads from /assets/logo/logo.svg — falls back to icon.
   ============================================================ */
function CircuitVisual({ shouldReduceMotion }) {
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: '100%', maxWidth: '480px', aspectRatio: '1/1' }}
      aria-hidden="true"
    >
      {/* ── Outer glow backdrop ─────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: '15%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(246,65,36,0.18) 0%, rgba(246,65,36,0.04) 55%, transparent 75%)',
          filter: 'blur(18px)',
        }}
      />

      {/* ── SVG circuit board ───────────────────── */}
      <svg
        viewBox="0 0 420 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
      >
        <defs>
          {/* Primary glow filter */}
          <filter id="glow-primary" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          {/* Soft glow */}
          <filter id="glow-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          {/* Radial gradient fills */}
          <radialGradient id="center-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="#F64124" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#F64124" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F64124" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F64124" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="line-grad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F64124" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F64124" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* ── Outermost ring (faint) ── */}
        <circle cx="210" cy="210" r="190" stroke="rgba(246,65,36,0.07)" strokeWidth="1" />

        {/* ── Outer dashed ring ── */}
        <circle
          cx="210" cy="210" r="168"
          stroke="rgba(246,65,36,0.14)"
          strokeWidth="1"
          strokeDasharray="6 10"
        />

        {/* ── Outer solid ring ── */}
        <circle cx="210" cy="210" r="148" stroke="rgba(246,65,36,0.22)" strokeWidth="1.2" />

        {/* ── Mid ring ── */}
        <circle cx="210" cy="210" r="116" stroke="rgba(246,65,36,0.30)" strokeWidth="1.5" />

        {/* ── Inner ring ── */}
        <circle cx="210" cy="210" r="82" stroke="rgba(246,65,36,0.40)" strokeWidth="1.8" />

        {/* ── Center circle ── */}
        <circle cx="210" cy="210" r="60" fill="url(#center-grad)" />
        <circle cx="210" cy="210" r="60" stroke="rgba(246,65,36,0.6)" strokeWidth="2" />

        {/* ── Radial circuit lines ── */}
        {/* Top */}
        <line x1="210" y1="148" x2="210" y2="42" stroke="url(#line-grad)" strokeWidth="1.2" />
        {/* Bottom */}
        <line x1="210" y1="272" x2="210" y2="378" stroke="url(#line-grad2)" strokeWidth="1.2" />
        {/* Left */}
        <line x1="148" y1="210" x2="42" y2="210" stroke="url(#line-grad2)" strokeWidth="1.2" />
        {/* Right */}
        <line x1="272" y1="210" x2="378" y2="210" stroke="url(#line-grad)" strokeWidth="1.2" />
        {/* Diagonals */}
        <line x1="167" y1="167" x2="78" y2="78" stroke="rgba(246,65,36,0.25)" strokeWidth="1" />
        <line x1="253" y1="253" x2="342" y2="342" stroke="rgba(246,65,36,0.25)" strokeWidth="1" />
        <line x1="253" y1="167" x2="342" y2="78" stroke="rgba(246,65,36,0.25)" strokeWidth="1" />
        <line x1="167" y1="253" x2="78" y2="342" stroke="rgba(246,65,36,0.25)" strokeWidth="1" />

        {/* ── Circuit corner segments ── */}
        {/* Top-right L-bend */}
        <path d="M 280 42 L 310 42 L 310 72" stroke="rgba(246,65,36,0.35)" strokeWidth="1.2" fill="none" />
        {/* Bottom-left L-bend */}
        <path d="M 140 378 L 110 378 L 110 348" stroke="rgba(246,65,36,0.35)" strokeWidth="1.2" fill="none" />
        {/* Top-left */}
        <path d="M 140 42 L 110 42 L 110 72" stroke="rgba(246,65,36,0.25)" strokeWidth="1" fill="none" />
        {/* Bottom-right */}
        <path d="M 280 378 L 310 378 L 310 348" stroke="rgba(246,65,36,0.25)" strokeWidth="1" fill="none" />

        {/* ── Nodes at ring intersections (primary axis) ── */}
        {/* Top mid */}
        <circle cx="210" cy="94"  r="3.5" fill="#F64124" filter="url(#glow-primary)" />
        <circle cx="210" cy="94"  r="1.8" fill="#ffffff" />
        {/* Bottom mid */}
        <circle cx="210" cy="326" r="3.5" fill="#F64124" filter="url(#glow-primary)" />
        <circle cx="210" cy="326" r="1.8" fill="#ffffff" />
        {/* Left mid */}
        <circle cx="94"  cy="210" r="3.5" fill="#F64124" filter="url(#glow-primary)" />
        <circle cx="94"  cy="210" r="1.8" fill="#ffffff" />
        {/* Right mid */}
        <circle cx="326" cy="210" r="3.5" fill="#F64124" filter="url(#glow-primary)" />
        <circle cx="326" cy="210" r="1.8" fill="#ffffff" />

        {/* ── Small dots on outer ring at 45° ── */}
        <circle cx="316" cy="104" r="2.5" fill="rgba(246,65,36,0.7)" />
        <circle cx="316" cy="316" r="2.5" fill="rgba(246,65,36,0.5)" />
        <circle cx="104" cy="104" r="2.5" fill="rgba(246,65,36,0.5)" />
        <circle cx="104" cy="316" r="2.5" fill="rgba(246,65,36,0.7)" />

        {/* ── Small squares (pads) at L-bend corners ── */}
        <rect x="306" y="38" width="8" height="8" rx="1.5" fill="rgba(246,65,36,0.5)" />
        <rect x="306" y="374" width="8" height="8" rx="1.5" fill="rgba(246,65,36,0.4)" />
        <rect x="106" y="38" width="8" height="8" rx="1.5" fill="rgba(246,65,36,0.4)" />
        <rect x="106" y="374" width="8" height="8" rx="1.5" fill="rgba(246,65,36,0.5)" />

        {/* ── Dots at terminal ends of radial lines ── */}
        <circle cx="210" cy="42"  r="3" fill="rgba(246,65,36,0.5)" />
        <circle cx="210" cy="378" r="3" fill="rgba(246,65,36,0.5)" />
        <circle cx="42"  cy="210" r="3" fill="rgba(246,65,36,0.5)" />
        <circle cx="378" cy="210" r="3" fill="rgba(246,65,36,0.5)" />

        {/* ── Animated scan arc (outer ring) ── */}
        {!shouldReduceMotion && (
          <circle
            cx="210" cy="210" r="148"
            stroke="#F64124"
            strokeWidth="2"
            strokeDasharray="40 900"
            strokeOpacity="0.7"
            filter="url(#glow-primary)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 210 210"
              to="360 210 210"
              dur="8s"
              repeatCount="indefinite"
            />
          </circle>
        )}

        {/* ── Animated scan arc (inner ring, opposite dir) ── */}
        {!shouldReduceMotion && (
          <circle
            cx="210" cy="210" r="82"
            stroke="#F64124"
            strokeWidth="1.5"
            strokeDasharray="25 530"
            strokeOpacity="0.5"
            filter="url(#glow-soft)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360 210 210"
              to="0 210 210"
              dur="6s"
              repeatCount="indefinite"
            />
          </circle>
        )}

        {/* ── Pulsing center dot ── */}
        {!shouldReduceMotion && (
          <circle cx="210" cy="210" r="8" fill="#F64124" opacity="0.3">
            <animate
              attributeName="r"
              values="8;14;8"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.3;0.08;0.3"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
        )}
      </svg>

      {/* ── Logo centered over the SVG ───────────────── */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '104px',
          height: '104px',
          borderRadius: '50%',
          background: '#FFFFFF',
          border: '3px solid #F64124',
          boxShadow: '0 0 30px rgba(246,65,36,0.6), 0 0 10px rgba(255,255,255,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          zIndex: 2,
          padding: '6px',
        }}
      >
        <img
          src="/assets/logo/logo.png"
          alt="Sairam UiAutomistix Club official logo"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
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
        {/* Fallback when logo file is absent */}
        <div
          style={{
            display: 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            background: 'rgba(246,65,36,0.12)',
          }}
        >
          <svg
            width="40" height="40" viewBox="0 0 40 40" fill="none"
            aria-hidden="true"
          >
            <rect x="10" y="14" width="20" height="16" rx="3" stroke="#F64124" strokeWidth="2" />
            <rect x="15" y="8" width="10" height="8" rx="2" stroke="#F64124" strokeWidth="2" />
            <circle cx="16" cy="22" r="2.5" fill="#F64124" />
            <circle cx="24" cy="22" r="2.5" fill="#F64124" />
            <line x1="20" y1="30" x2="20" y2="34" stroke="#F64124" strokeWidth="2" strokeLinecap="round" />
            <line x1="10" y1="20" x2="6" y2="20" stroke="#F64124" strokeWidth="2" strokeLinecap="round" />
            <line x1="30" y1="20" x2="34" y2="20" stroke="#F64124" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   CTA BUTTON
   ============================================================ */
function CTAButton({ label, href, variant = 'primary', icon: Icon }) {
  function handleClick(e) {
    e.preventDefault()
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (variant === 'primary') {
    return (
      <a
        href={href}
        onClick={handleClick}
        className="group inline-flex items-center justify-center gap-2 font-semibold rounded-full focus-ring cursor-pointer"
        style={{
          padding: 'clamp(0.72rem, 1.8vw, 0.8rem) clamp(1.4rem, 3vw, 2rem)',
          background: '#F64124',
          color: '#FFFFFF',
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(0.875rem, 1.5vw, 0.925rem)',
          letterSpacing: '0.01em',
          textDecoration: 'none',
          transition: 'background 250ms ease, box-shadow 250ms ease, transform 150ms ease',
          boxShadow: '0 4px 20px rgba(246,65,36,0.35)',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#d43010'
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(246,65,36,0.5)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#F64124'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(246,65,36,0.35)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        <span>{label}</span>
        {Icon && (
          <Icon
            size={16}
            strokeWidth={2.2}
            style={{ transition: 'transform 200ms ease' }}
            className="group-hover:translate-x-0.5"
          />
        )}
      </a>
    )
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className="group inline-flex items-center justify-center gap-2 font-semibold rounded-full focus-ring cursor-pointer"
      style={{
        padding: 'clamp(0.72rem, 1.8vw, 0.8rem) clamp(1.4rem, 3vw, 2rem)',
        background: 'transparent',
        color: '#FFFFFF',
        fontFamily: 'Inter, sans-serif',
        fontSize: 'clamp(0.875rem, 1.5vw, 0.925rem)',
        letterSpacing: '0.01em',
        border: '1.5px solid rgba(255,255,255,0.25)',
        textDecoration: 'none',
        transition: 'border-color 250ms ease, background 250ms ease, transform 150ms ease',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#F64124'
        e.currentTarget.style.background = 'rgba(246,65,36,0.1)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {Icon && <Icon size={16} strokeWidth={2.2} />}
      <span>{label}</span>
    </a>
  )
}

/* ============================================================
   FEATURE CHIP — refined professional UI chip
   Consistent heights, padding, border radius, font size, and gaps.
   Subtle dark background, thin border, glowing red indicator dot.
   ============================================================ */
function FeatureChip({ label }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full select-none transition-all duration-200"
      style={{
        padding: 'clamp(0.36rem, 1vw, 0.45rem) clamp(0.75rem, 2vw, 0.95rem)',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
        boxSizing: 'border-box',
        cursor: 'default',
        maxWidth: '100%',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(246, 65, 36, 0.06)'
        e.currentTarget.style.borderColor = 'rgba(246, 65, 36, 0.25)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#F64124',
          boxShadow: '0 0 6px rgba(246, 65, 36, 0.7)',
          flexShrink: 0,
          display: 'inline-block',
        }}
        aria-hidden="true"
      />
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(0.74rem, 1.6vw, 0.8rem)',
          fontWeight: 500,
          color: 'rgba(255, 255, 255, 0.75)',
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        {label}
      </span>
    </div>
  )
}

/* ============================================================
   HERO SECTION — main export
   ============================================================ */
export default function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const heroRef = useRef(null)

  return (
    <section
      id="home"
      ref={heroRef}
      aria-label="Hero — Sairam UiAutomistix Club"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#0A0A0A' }}
    >
      {/* ── BACKGROUND LAYERS ─────────────────────────────── */}

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(246,65,36,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(246,65,36,0.045) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px',
        }}
      />

      {/* Bottom-right radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%',
          right: '-5%',
          width: '60%',
          height: '70%',
          background:
            'radial-gradient(ellipse at center, rgba(246,65,36,0.1) 0%, rgba(246,65,36,0.02) 50%, transparent 75%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Top-left subtle glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-5%',
          left: '-5%',
          width: '40%',
          height: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(246,65,36,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Bottom gradient fade (for smooth transition into next section) */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '120px',
          background: 'linear-gradient(to bottom, transparent, rgba(10,10,10,0.6))',
        }}
      />

      {/* ── CONTENT ───────────────────────────────────────── */}
      <div
        className="relative z-10 w-full mx-auto"
        style={{
          maxWidth: '1280px',
          padding: '0 clamp(1rem, 4vw, 1.5rem)',
          paddingTop: 'clamp(90px, 12vh, 120px)', /* clear fixed navbar */
          paddingBottom: 'clamp(3rem, 6vh, 4.5rem)',
        }}
      >
        <div
          className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-14 xl:gap-16"
        >
          {/* ════════════════════════════════════════
              LEFT — Text content
              Strictly aligned to the left edge across all elements
          ════════════════════════════════════════ */}
          <div className="flex-1 w-full flex flex-col items-start text-left max-w-full lg:max-w-[620px]">

            {/* Club category top badge */}
            <motion.div
              {...fadeIn(0.1)}
              style={{ marginBottom: '1.25rem' }}
            >
              <div
                className="inline-flex items-center gap-2.5 rounded-full select-none"
                style={{
                  background: 'rgba(246, 65, 36, 0.08)',
                  border: '1px solid rgba(246, 65, 36, 0.28)',
                  padding: '0.4rem 0.95rem',
                  boxShadow: '0 0 16px rgba(246, 65, 36, 0.08)',
                }}
              >
                {/* Glowing red indicator dot */}
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#F64124',
                    boxShadow: '0 0 8px #F64124, 0 0 12px rgba(246, 65, 36, 0.7)',
                    display: 'inline-block',
                    flexShrink: 0,
                    animation: shouldReduceMotion ? 'none' : 'pulse 2s infinite',
                  }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    color: '#F64124',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.06em',
                    fontSize: 'clamp(0.72rem, 1.8vw, 0.78rem)',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    lineHeight: 1,
                  }}
                >
                  College Automation Club · Sairam
                </span>
              </div>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              {...fadeUp(0.2)}
              style={{
                fontFamily: 'Space Grotesk, Inter, sans-serif',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                fontSize: 'clamp(2.3rem, 5vw, 4.2rem)',
                marginBottom: '1rem',
                wordBreak: 'normal',
                overflowWrap: 'break-word',
              }}
            >
              <span style={{ display: 'block' }}>Sairam</span>
              <span
                style={{
                  display: 'block',
                  backgroundImage: 'linear-gradient(135deg, #F64124 0%, #ff7b5c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  paddingBottom: '0.04em',
                }}
              >
                UiAutomistix
              </span>
              <span style={{ display: 'block', color: 'rgba(255,255,255,0.88)' }}>
                Club
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              {...fadeUp(0.35)}
              style={{
                fontFamily: 'Space Grotesk, Inter, sans-serif',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.6)',
                fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
                letterSpacing: '0.03em',
                marginBottom: '1.25rem',
              }}
            >
              Innovate.&nbsp; Automate.&nbsp; Elevate.
            </motion.p>

            {/* Supporting text */}
            <motion.p
              {...fadeUp(0.48)}
              style={{
                fontFamily: 'Inter, sans-serif',
                color: 'rgba(255,255,255,0.55)',
                fontSize: 'clamp(0.925rem, 1.5vw, 1.05rem)',
                lineHeight: 1.75,
                maxWidth: '520px',
                marginBottom: '2rem',
              }}
            >
              A student-driven community at Sairam Institute, focused on
              robotics, RPA, and intelligent automation. We learn together,
              build real projects, and prepare for a technology-first future.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE_OUT }}
              className="flex flex-wrap items-center gap-3 sm:gap-3.5 justify-start mb-6 sm:mb-8 w-full"
            >
              <CTAButton
                label="Explore Events"
                href="#events"
                variant="primary"
                icon={ArrowRight}
              />
              <CTAButton
                label="Join Us"
                href="#join-us"
                variant="outline"
                icon={Users}
              />
            </motion.div>

            {/* Feature tags — refined professional UI chips placed neatly below Join Us */}
            <motion.div
              {...fadeIn(0.75)}
              className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full justify-start"
            >
              <FeatureChip label="Student-led Club" />
              <FeatureChip label="Automation & RPA" />
              <FeatureChip label="Robotics & Innovation" />
            </motion.div>
          </div>

          {/* ════════════════════════════════════════
              RIGHT — Circuit visual
          ════════════════════════════════════════ */}
          <motion.div
            className="flex-shrink-0 flex items-center justify-center w-full lg:w-auto"
            style={{ maxWidth: '440px' }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT }}
          >
            {/* Floating wrapper */}
            <motion.div
              style={{ width: '100%', maxWidth: '100%' }}
              animate={
                shouldReduceMotion
                  ? {}
                  : { y: [0, -14, 0] }
              }
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <CircuitVisual shouldReduceMotion={shouldReduceMotion} />
            </motion.div>
          </motion.div>
        </div>

        {/* ── SCROLL INDICATOR ────────────────────────────── */}
        <motion.div
          {...fadeIn(1.1)}
          className="flex flex-col items-center mt-12 lg:mt-16"
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.6rem',
            }}
          >
            Scroll
          </span>
          <motion.div
            style={{
              width: '1.5px',
              height: '40px',
              background: 'linear-gradient(to bottom, rgba(246,65,36,0.7), transparent)',
              borderRadius: '2px',
            }}
            animate={shouldReduceMotion ? {} : { scaleY: [1, 0.4, 1], opacity: [0.7, 0.2, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      {/* Global keyframe for indicator pulse */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.45;
            transform: scale(0.92);
          }
        }
      `}</style>
    </section>
  )
}
