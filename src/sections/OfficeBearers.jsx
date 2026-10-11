import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { officeBearers } from '../data/officeBearers'

/* ── Animation helpers ──────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay, ease: EASE },
})

/* ── LinkedIn SVG Icon ───────────────────────────────────── */
function LinkedinIcon({ size = 18, color = '#0077B5' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

/* ── Office Bearer Card ─────────────────────────────────── */
function OfficeBearerCard({ member, index }) {
  return (
    <motion.article
      {...fadeUp(index * 0.08)}
      aria-label={`${member.name}, ${member.designation}`}
      className="group"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.025)',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        borderRadius: '1.25rem',
        padding: '2rem 1.25rem 1.75rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 300ms ease, border-color 300ms ease, box-shadow 300ms ease',
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.25, ease: EASE },
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(246, 65, 36, 0.45)'
        e.currentTarget.style.boxShadow = '0 16px 36px rgba(246, 65, 36, 0.14), 0 0 24px rgba(246, 65, 36, 0.08)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Ambient background glow on hover */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '180px',
          height: '180px',
          background: 'radial-gradient(circle, rgba(246, 65, 36, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          opacity: 0.8,
        }}
      />

      {/* ── Profile Picture ── */}
      <div
        style={{
          position: 'relative',
          width: '136px',
          height: '136px',
          borderRadius: '50%',
          padding: '3px',
          background: 'linear-gradient(135deg, rgba(246, 65, 36, 0.6) 0%, rgba(246, 65, 36, 0.1) 100%)',
          marginBottom: '1.25rem',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            background: '#141414',
          }}
        >
          <img
            src={member.imageUrl}
            alt={`Photo of ${member.name}, ${member.designation}`}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: member.photoPosition || 'center top',
              display: 'block',
              transition: 'transform 400ms ease',
            }}
            className="group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = '/assets/team/magic-avatar.svg'
            }}
          />
        </div>
      </div>

      {/* ── Designation Badge ── */}
      <span
        style={{
          display: 'inline-block',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.7rem',
          fontWeight: 700,
          color: '#F64124',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          background: 'rgba(246, 65, 36, 0.10)',
          border: '1px solid rgba(246, 65, 36, 0.28)',
          borderRadius: '999px',
          padding: '4px 13px',
          marginBottom: '0.65rem',
        }}
      >
        {member.designation}
      </span>

      {/* ── Full Name ── */}
      <h3
        style={{
          fontFamily: 'Space Grotesk, Inter, sans-serif',
          fontSize: '1.15rem',
          fontWeight: 700,
          color: '#FFFFFF',
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
          marginBottom: '1rem',
        }}
      >
        {member.name}
      </h3>

      {/* ── Clickable LinkedIn Button / Link ── */}
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${member.name} on LinkedIn`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.5rem 1rem',
          borderRadius: '999px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'rgba(255, 255, 255, 0.85)',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.78rem',
          fontWeight: 600,
          letterSpacing: '0.02em',
          textDecoration: 'none',
          transition: 'all 250ms ease',
          marginTop: 'auto',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(0, 119, 181, 0.15)'
          e.currentTarget.style.borderColor = 'rgba(0, 119, 181, 0.45)'
          e.currentTarget.style.color = '#FFFFFF'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        <LinkedinIcon size={15} color="#0077B5" />
        <span>LinkedIn</span>
        <ExternalLink size={12} style={{ opacity: 0.5, marginLeft: '2px' }} />
      </a>
    </motion.article>
  )
}

/* ── Main Office Bearers Section Component ──────────────── */
export default function OfficeBearers() {
  return (
    <section
      id="office-bearers"
      aria-labelledby="office-bearers-heading"
      style={{
        background: '#0A0A0A',
        padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow orbs */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(246, 65, 36, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-10%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(246, 65, 36, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── Section Header ──────────────────────────────── */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: '3.5rem' }}>
          {/* Eyebrow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '2px',
                background: '#F64124',
                borderRadius: '2px',
              }}
            />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#F64124',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
              }}
            >
              Executive Leadership
            </span>
          </div>

          {/* Heading */}
          <h2
            id="office-bearers-heading"
            style={{
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '0.75rem',
            }}
          >
            Office Bearers
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.45)',
              maxWidth: '560px',
              lineHeight: 1.6,
            }}
          >
            The executive leaders directing strategic vision, operations, and initiatives for Sairam UiAutomistix Club.
          </p>
        </motion.div>

        {/* ── Member Cards Grid ───────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {officeBearers.map((member, i) => (
            <OfficeBearerCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
