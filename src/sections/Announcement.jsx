import { motion } from 'framer-motion'
import { BellOff, Calendar, Clock, MapPin, ExternalLink, Megaphone } from 'lucide-react'
import { announcement } from '../data/announcement'

/* ============================================================
   SHARED ANIMATION EASE
   ============================================================ */
const EASE = [0.16, 1, 0.3, 1]

/* ============================================================
   EMPTY STATE
   Shown when isActive = false or no announcement data exists.
   ============================================================ */
function EmptyAnnouncement() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE }}
      className="flex flex-col items-center justify-center text-center"
      style={{
        padding: '2.5rem 2rem',
        borderRadius: '1.25rem',
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(246,65,36,0.1)',
        maxWidth: '520px',
        margin: '0 auto',
      }}
    >
      {/* Icon container */}
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '14px',
          background: 'rgba(246,65,36,0.08)',
          border: '1px solid rgba(246,65,36,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.125rem',
          flexShrink: 0,
        }}
      >
        <BellOff size={22} color="#F64124" strokeWidth={1.6} aria-hidden="true" />
      </div>

      {/* Message */}
      <p
        style={{
          fontFamily: 'Space Grotesk, Inter, sans-serif',
          fontWeight: 600,
          fontSize: '1rem',
          color: 'rgba(255,255,255,0.7)',
          marginBottom: '0.4rem',
          letterSpacing: '-0.01em',
        }}
      >
        No upcoming announcements at the moment.
      </p>
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.825rem',
          color: 'rgba(255,255,255,0.28)',
          lineHeight: 1.6,
        }}
      >
        Check back soon for events and updates from the club.
      </p>
    </motion.div>
  )
}

/* ============================================================
   DETAIL ROW
   Reusable icon + label row for date / time / venue.
   ============================================================ */
function DetailRow({ icon: Icon, label, value }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-3">
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'rgba(246,65,36,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '1px',
        }}
      >
        <Icon size={15} color="#F64124" strokeWidth={2} aria-hidden="true" />
      </div>
      <div>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.7rem',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '0.15rem',
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.85)',
          }}
        >
          {value}
        </p>
      </div>
    </div>
  )
}

/* ============================================================
   ANNOUNCEMENT CARD
   Shown when isActive = true and data is present.
   ============================================================ */
function AnnouncementCard({ data }) {
  const hasPoster = Boolean(data.posterUrl)
  const hasRegLink = Boolean(data.registrationUrl)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: EASE }}
      style={{
        borderRadius: '1.25rem',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(246,65,36,0.18)',
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
      }}
    >
      {/* Top accent stripe */}
      <div
        style={{
          height: '3px',
          background: 'linear-gradient(90deg, #F64124 0%, rgba(246,65,36,0.25) 100%)',
        }}
      />

      <div
        className="flex flex-col lg:flex-row"
        style={{ gap: '0' }}
      >
        {/* ── LEFT: Event Poster ──────────────────────── */}
        {hasPoster && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
            style={{
              flex: '0 0 auto',
              width: '100%',
              maxWidth: '320px',
              position: 'relative',
              overflow: 'hidden',
            }}
            className="lg:max-w-xs xl:max-w-sm"
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '3/4',
                overflow: 'hidden',
                background: 'rgba(246,65,36,0.06)',
                position: 'relative',
              }}
            >
              <img
                src={data.posterUrl}
                alt={`Event poster for ${data.title}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 400ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.04)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          </motion.div>
        )}

        {/* ── RIGHT: Event Details ─────────────────────── */}
        <div
          style={{
            flex: 1,
            padding: 'clamp(1.5rem, 4vw, 2.25rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '1.25rem',
          }}
        >
          {/* "Upcoming Event" label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '99px',
                background: 'rgba(246,65,36,0.1)',
                border: '1px solid rgba(246,65,36,0.25)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#F64124',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#F64124',
                  animation: 'pulse 2s infinite',
                }}
              />
              Upcoming Event
            </span>
          </motion.div>

          {/* Event title */}
          {data.title && (
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
              style={{
                fontFamily: 'Space Grotesk, Inter, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              {data.title}
            </motion.h3>
          )}

          {/* Date / Time / Venue rows */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28, duration: 0.5, ease: EASE }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            <DetailRow icon={Calendar} label="Date"  value={data.date}  />
            <DetailRow icon={Clock}    label="Time"  value={data.time}  />
            <DetailRow icon={MapPin}   label="Venue" value={data.venue} />
          </motion.div>

          {/* Description */}
          {data.description && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.7,
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '1rem',
              }}
            >
              {data.description}
            </motion.p>
          )}

          {/* Register button */}
          {hasRegLink && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.42, duration: 0.45, ease: EASE }}
            >
              <a
                href={data.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Register for ${data.title || 'this event'} — opens Google Form in new tab`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.75rem 1.75rem',
                  borderRadius: '99px',
                  background: '#F64124',
                  color: '#FFFFFF',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  letterSpacing: '0.01em',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(246,65,36,0.3)',
                  transition: 'background 220ms ease, box-shadow 220ms ease, transform 140ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#d43010'
                  e.currentTarget.style.boxShadow = '0 6px 28px rgba(246,65,36,0.45)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F64124'
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(246,65,36,0.3)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Register Now
                <ExternalLink size={14} strokeWidth={2.2} aria-hidden="true" />
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ============================================================
   ANNOUNCEMENT SECTION — main export
   ============================================================ */
export default function AnnouncementSection() {
  const isActive = announcement.isActive === true

  return (
    <section
      id="announcement"
      aria-label="Upcoming Announcements"
      style={{
        background: '#0A0A0A',
        padding: 'clamp(2.5rem, 5vw, 4rem) 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top separator line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          maxWidth: '600px',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(246,65,36,0.25), transparent)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* ── Section header ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '1.75rem',
          }}
        >
          <Megaphone
            size={18}
            color="#F64124"
            strokeWidth={1.8}
            aria-hidden="true"
          />
          <h2
            style={{
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Announcements
          </h2>

          {/* Accent divider */}
          <div
            style={{
              flex: 1,
              height: '1px',
              background:
                'linear-gradient(90deg, rgba(246,65,36,0.3), transparent)',
              marginLeft: '4px',
            }}
            aria-hidden="true"
          />
        </motion.div>

        {/* ── Content: Card or Empty state ────────────── */}
        {isActive ? (
          <AnnouncementCard data={announcement} />
        ) : (
          <EmptyAnnouncement />
        )}
      </div>

      {/* Pulse keyframe reuse (same as Hero) */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }
      `}</style>
    </section>
  )
}
