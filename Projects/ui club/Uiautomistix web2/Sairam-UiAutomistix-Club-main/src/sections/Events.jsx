import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, ExternalLink, CalendarDays, Bot } from 'lucide-react'
import { events } from '../data/events'

/* ============================================================
   ANIMATION EASE
   ============================================================ */
const EASE = [0.16, 1, 0.3, 1]

/* ============================================================
   EMPTY STATE COMPONENT
   ============================================================ */
function EmptyEvents() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE }}
      className="flex flex-col items-center justify-center text-center max-w-[540px]"
      style={{
        padding: '3rem 2rem',
        borderRadius: '1.25rem',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(246,65,36,0.12)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        margin: '0 auto',
      }}
    >
      <div
        className="flex items-center justify-center mb-6"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'rgba(246,65,36,0.08)',
          border: '1px solid rgba(246,65,36,0.18)',
        }}
      >
        <CalendarDays size={24} color="#F64124" strokeWidth={1.8} aria-hidden="true" />
      </div>

      <h3
        style={{
          fontFamily: 'Space Grotesk, Inter, sans-serif',
          fontSize: '1.15rem',
          fontWeight: 600,
          color: '#FFFFFF',
          marginBottom: '0.5rem',
        }}
      >
        Stay tuned for upcoming events, workshops, hackathons and activities.
      </h3>
      
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.875rem',
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        No events to display at the moment.
      </p>
    </motion.div>
  )
}

/* ============================================================
   POSTER PLACEHOLDER COMPONENT
   ============================================================ */
function PosterPlaceholder() {
  return (
    <div
      className="w-full flex flex-col items-center justify-center"
      style={{
        aspectRatio: '16/10',
        background: 'linear-gradient(135deg, rgba(246,65,36,0.05) 0%, rgba(246,65,36,0.01) 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        position: 'relative',
      }}
    >
      {/* Grid Pattern overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(246,65,36,0.2) 1px, transparent 0)',
          backgroundSize: '16px 16px',
        }}
        aria-hidden="true"
      />
      <Bot size={36} color="#F64124" strokeWidth={1.2} className="mb-2 opacity-60" aria-hidden="true" />
      <span
        style={{
          fontFamily: 'Space Grotesk, Inter, sans-serif',
          fontSize: '0.72rem',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        Sairam UiAutomistix Club
      </span>
    </div>
  )
}

/* ============================================================
   EVENT CARD COMPONENT
   ============================================================ */
function EventCard({ event, index }) {
  const isUpcoming = event.status === 'upcoming'
  const hasPoster = Boolean(event.posterUrl)
  const hasRegUrl = Boolean(event.registrationUrl)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      className="group flex flex-col h-full rounded-2xl overflow-hidden"
      style={{
        background: isUpcoming ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.01)',
        border: isUpcoming ? '1px solid rgba(246,65,36,0.15)' : '1px solid rgba(255,255,255,0.04)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
        opacity: isUpcoming ? 1 : 0.65,
        transition: 'border-color 300ms ease, box-shadow 300ms ease, transform 300ms ease, opacity 300ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        if (isUpcoming) {
          e.currentTarget.style.borderColor = 'rgba(246,65,36,0.3)'
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(246,65,36,0.12)'
        } else {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = isUpcoming ? 'rgba(246,65,36,0.15)' : 'rgba(255,255,255,0.04)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.25)'
      }}
    >
      {/* ── Card Media / Image Header ── */}
      <div className="relative overflow-hidden flex-shrink-0">
        {hasPoster ? (
          <div className="overflow-hidden" style={{ aspectRatio: '16/10' }}>
            <img
              src={event.posterUrl}
              alt={`Poster for ${event.title}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              onError={(e) => {
                // If image fails, fallback gracefully to placeholder
                e.currentTarget.style.display = 'none'
                const fallback = e.currentTarget.parentElement?.querySelector('.fallback-placeholder')
                if (fallback) fallback.style.display = 'flex'
              }}
            />
            <div className="fallback-placeholder hidden absolute inset-0">
              <PosterPlaceholder />
            </div>
          </div>
        ) : (
          <PosterPlaceholder />
        )}

        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 10px',
              borderRadius: '99px',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              background: isUpcoming ? 'rgba(246,65,36,0.15)' : 'rgba(255,255,255,0.08)',
              border: isUpcoming ? '1px solid rgba(246,65,36,0.3)' : '1px solid rgba(255,255,255,0.1)',
              color: isUpcoming ? '#F64124' : 'rgba(255,255,255,0.5)',
            }}
          >
            {isUpcoming && (
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: '#F64124',
                  animation: 'pulse 1.8s infinite',
                }}
              />
            )}
            {event.status}
          </span>
        </div>
      </div>

      {/* ── Card Content Body ── */}
      <div className="flex-1 p-6 flex flex-col justify-between gap-5">
        <div className="flex flex-col gap-3">
          {/* Title */}
          <h4
            style={{
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              fontSize: '1.2rem',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.3,
            }}
          >
            {event.title}
          </h4>

          {/* Details Row Info */}
          <div className="flex flex-col gap-2 mt-1">
            {event.date && (
              <div className="flex items-center gap-2.5 text-xs text-white/50">
                <Calendar size={13} className="text-[#F64124]" aria-hidden="true" />
                <span>{event.date}</span>
              </div>
            )}
            {event.time && (
              <div className="flex items-center gap-2.5 text-xs text-white/50">
                <Clock size={13} className="text-[#F64124]" aria-hidden="true" />
                <span>{event.time}</span>
              </div>
            )}
            {event.venue && (
              <div className="flex items-center gap-2.5 text-xs text-white/50">
                <MapPin size={13} className="text-[#F64124]" aria-hidden="true" />
                <span>{event.venue}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {event.description && (
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.6,
                marginTop: '0.5rem',
              }}
            >
              {event.description}
            </p>
          )}
        </div>

        {/* ── Card Action Footer ── */}
        {isUpcoming && hasRegUrl && (
          <div className="pt-2">
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl text-center"
              style={{
                padding: '0.7rem 1.25rem',
                background: '#F64124',
                color: '#FFFFFF',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '0.85rem',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(246,65,36,0.2)',
                transition: 'background 200ms ease, box-shadow 200ms ease, transform 150ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#d43010'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(246,65,36,0.35)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#F64124'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(246,65,36,0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Register Now
              <ExternalLink size={13} strokeWidth={2.2} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ============================================================
   MAIN EVENTS SECTION COMPONENT
   ============================================================ */
export default function EventsSection() {
  const hasEvents = events.length > 0

  return (
    <section
      id="events"
      aria-label="Events and Workshops"
      style={{
        background: '#0A0A0A', // Alternates back to #0A0A0A
        padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Background Accent Glow ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '60%',
          height: '50%',
          background: 'radial-gradient(ellipse at top, rgba(246,65,36,0.04) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
        aria-hidden="true"
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-16 lg:mb-20"
        >
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#F64124',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            Get Involved
          </span>
          <h2
            style={{
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
            }}
          >
            Events
          </h2>
        </motion.div>

        {/* ── Section Content ── */}
        {hasEvents ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {events.map((event, idx) => (
              <EventCard key={event.id || idx} event={event} index={idx} />
            ))}
          </div>
        ) : (
          <EmptyEvents />
        )}
      </div>

      {/* Embedded Pulse Keyframe */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }
      `}</style>
    </section>
  )
}
