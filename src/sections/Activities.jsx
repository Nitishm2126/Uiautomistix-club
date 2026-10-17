import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Sparkles, Award, Play, Rocket, X, Calendar } from 'lucide-react'
import { activities } from '../data/activities'

/* ============================================================
   ANIMATION EASE & CONSTANTS
   ============================================================ */
const EASE = [0.16, 1, 0.3, 1]

// Group activities by year (dynamic)
const groupedActivities = activities.reduce((acc, activity) => {
  const { year } = activity
  if (!acc[year]) {
    acc[year] = []
  }
  acc[year].push(activity)
  return acc
}, {})

// Get years in chronological order
const sortedYears = Object.keys(groupedActivities).sort((a, b) => Number(a) - Number(b))

// Map of year/activity names to corresponding tech-themed icons
const getIconForActivity = (title) => {
  const lowerTitle = title.toLowerCase()
  if (lowerTitle.includes('hack')) return Award
  if (lowerTitle.includes('verse')) return Sparkles
  if (lowerTitle.includes('pitch')) return Cpu
  if (lowerTitle.includes('automata')) return Rocket
  if (lowerTitle.includes('global') || lowerTitle.includes('stage') || lowerTitle.includes('champion')) return Award
  if (lowerTitle.includes('inauguration') || lowerTitle.includes('launchpad')) return Rocket
  if (lowerTitle.includes('ctrl') || lowerTitle.includes('agent')) return Cpu
  return Play
}

/* ============================================================
   EVENT DETAIL DATA FOR POPUP
   ============================================================ */
const EVENT_DETAILS = {
  "SAIRAM AUTOMATA – FUTURE IN AUTOMATION": {
    title: "SAIRAM AUTOMATA \u2013 FUTURE IN AUTOMATION",
    posterUrl: "/assets/events/event%202026-1.jpg",
    date: "22/08/2026",
    description: [
      { text: "Sairam UiAutomistix Club", bold: true },
      { text: " organized " },
      { text: "\u201CSairam AUTOMATA \u2013 Future in Automation,\u201D", bold: true },
      { text: " an online technical session held via " },
      { text: "Google Meet on 22 August 2026", bold: true },
      { text: "." },
      { text: "\n\n" },
      { text: "The session featured " },
      { text: "Mr. H. Sallavudeen, Senior RPA Developer at BMW", bold: true },
      { text: ", who shared valuable insights into " },
      { text: "Robotic Process Automation, industry practices, emerging automation trends, and career opportunities", bold: true },
      { text: ". The interaction gave students direct exposure to industry perspectives and encouraged them to strengthen their " },
      { text: "technical skills, industry awareness, and interest in automation", bold: true },
      { text: "." },
    ],
  },
  "CLUB INAUGURATION & LAUNCHPAD": {
    title: "CLUB INAUGURATION & LAUNCHPAD",
    posterUrl: "/assets/events/club-inauguration-launchpad.jpg",
    date: "07/10/2026",
    venue: "SSR Hall, Sri Sairam Engineering College",
    description: [
      { text: "The " },
      { text: "Sairam UiAutomistix Club", bold: true },
      { text: " proudly inaugurated its journey with the " },
      { text: "Club Inauguration & Launchpad", bold: true },
      { text: ", marking a new chapter in " },
      { text: "learning, innovation, and automation", bold: true },
      { text: " at " },
      { text: "Sri Sairam Engineering College", bold: true },
      { text: "." },
      { text: "\n\n" },
      { text: "The event officially launched the club and introduced students to the exciting world of " },
      { text: "Artificial Intelligence and Robotic Process Automation", bold: true },
      { text: ". As part of the Launchpad initiative, a hands-on workshop titled " },
      { text: "\u201CYour First AI Agent\u201D", bold: true },
      { text: " was conducted to introduce students to " },
      { text: "Agentic AI", bold: true },
      { text: " and demonstrate how intelligent agents can automate tasks and solve real-world problems." },
      { text: "\n\n" },
      { text: "The initiative encouraged students to " },
      { text: "explore emerging technologies, develop practical skills, and begin their journey towards building innovative AI-powered solutions", bold: true },
      { text: "." },
    ],
  },
  "CTRL + AI 1.0 — UNLEASH YOUR AGENTS": {
    title: "CTRL + AI 1.0 \u2014 UNLEASH YOUR AGENTS",
    posterUrl: "/assets/events/ctrl-ai-unleash-your-agents.jpg",
    date: "09/10/2026",
    venue: "Alpha Hall, Sri Sairam Engineering College",
    description: [
      { text: "The " },
      { text: "Sairam UiAutomistix Club", bold: true },
      { text: " organized " },
      { text: "CTRL + AI 1.0 \u2014 Unleash Your Agents", bold: true },
      { text: ", an intensive " },
      { text: "six-hour Agentic AI challenge", bold: true },
      { text: " designed to encourage innovation, creativity, and hands-on learning among students." },
      { text: "\n\n" },
      { text: "Held on " },
      { text: "9 October 2026 at Alpha Hall, Sri Sairam Engineering College", bold: true },
      { text: ", the event provided participants with an opportunity to explore the power of " },
      { text: "Artificial Intelligence", bold: true },
      { text: " and develop " },
      { text: "intelligent AI agents through practical challenges", bold: true },
      { text: "." },
      { text: "\n\n" },
      { text: "The six-hour challenge encouraged students to apply their technical knowledge, experiment with AI-driven solutions, strengthen their problem-solving abilities, and gain practical exposure to the emerging field of " },
      { text: "Agentic AI", bold: true },
      { text: "." },
      { text: "\n\n" },
      { text: "The event fostered collaboration, technical exploration, and innovation, inspiring students to move beyond traditional AI applications and discover the potential of " },
      { text: "autonomous intelligent agents", bold: true },
      { text: "." },
    ],
  },
  "5th Consecutive Year on the Global Stage!": {
    title: "5th Consecutive Year on the Global Stage!",
    posterUrl: "/assets/events/global-stage-champions.jpg",
    date: "Academic Year 2026 - 2027",
    description: [
      { text: "Our " },
      { text: "Student Developer Champions", bold: true },
      { text: " continue to shine on the global stage through the " },
      { text: "UiPath Community", bold: true },
      { text: ", showcasing excellence in " },
      { text: "automation, innovation, and technology", bold: true },
      { text: " for the " },
      { text: "fifth consecutive year", bold: true },
      { text: "." },
    ],
  },
}

// Resilient key lookup for event details
const normalizeKey = (str) =>
  (str || '')
    .toLowerCase()
    .replace(/[—–-]/g, '-')
    .replace(/[^a-z0-9]/g, '')

const getEventDetail = (title) => {
  if (!title) return null
  if (EVENT_DETAILS[title]) return EVENT_DETAILS[title]
  const target = normalizeKey(title)
  for (const [key, val] of Object.entries(EVENT_DETAILS)) {
    if (normalizeKey(key) === target) return val
  }
  return null
}

/* ============================================================
   EVENT POPUP MODAL COMPONENT
   ============================================================ */
function EventPopup({ activity, onClose }) {
  const detail = getEventDetail(activity?.title)

  // Close on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (!detail) return
    document.addEventListener('keydown', handleKeyDown)
    // Prevent background scrolling
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown, detail])

  if (!detail) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: '680px',
          maxHeight: '90vh',
          background: '#111111',
          border: '1px solid rgba(246,65,36,0.2)',
          borderRadius: '1.25rem',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(246,65,36,0.08)',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close popup"
          className="absolute top-4 right-4 z-50 flex items-center justify-center transition-all duration-200"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.15)',
            cursor: 'pointer',
            color: '#fff',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(246,65,36,0.3)'
            e.currentTarget.style.borderColor = 'rgba(246,65,36,0.5)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.6)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
          }}
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        {/* Event Poster */}
        <div
          style={{
            width: '100%',
            background: '#0A0A0A',
            borderBottom: '1px solid rgba(246,65,36,0.12)',
          }}
        >
          <img
            src={detail.posterUrl}
            alt={`Poster for ${activity.title}`}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
          {/* Title */}
          <h3
            style={{
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              fontSize: 'clamp(1.15rem, 3vw, 1.5rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.3,
              marginBottom: '1rem',
            }}
          >
            {detail.title || activity.title}
          </h3>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2" style={{ marginBottom: '1.25rem' }}>
            {detail.date && (
              <div
                className="inline-flex items-center gap-2"
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '8px',
                  background: 'rgba(246,65,36,0.1)',
                  border: '1px solid rgba(246,65,36,0.2)',
                }}
              >
                <Calendar size={14} color="#F64124" strokeWidth={2} />
                <span
                  style={{
                    fontFamily: 'Space Grotesk, Inter, sans-serif',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#F64124',
                  }}
                >
                  {detail.date}
                </span>
              </div>
            )}
            {detail.venue && (
              <div
                className="inline-flex items-center gap-2"
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.82rem',
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  📍 {detail.venue}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.875rem, 2vw, 0.95rem)',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.7)',
              whiteSpace: 'pre-line',
            }}
          >
            {detail.description.map((segment, i) =>
              segment.bold ? (
                <strong key={i} style={{ color: 'rgba(255,255,255,0.95)', fontWeight: 600 }}>
                  {segment.text}
                </strong>
              ) : (
                <span key={i}>{segment.text}</span>
              )
            )}
          </p>

          {/* Date footer */}
          <div
            style={{
              marginTop: '1.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span
              style={{
                fontFamily: 'Space Grotesk, Inter, sans-serif',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: '#F64124',
              }}
            >
              Date: {detail.date}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ============================================================
   MAIN ACTIVITIES SECTION COMPONENT
   ============================================================ */
export default function ActivitiesSection() {
  const [selectedActivity, setSelectedActivity] = useState(null)

  // Check if an activity has popup detail
  const hasDetail = (title) => Boolean(getEventDetail(title))

  return (
    <section
      id="activities"
      aria-label="Our Activities"
      className="relative overflow-hidden"
      style={{
        background: '#0D0D0D', // Alternating background from #0A0A0A
        padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
      }}
    >
      {/* ── Background accents ────────────────────────── */}
      <div
        className="absolute top-1/2 left-1/4 pointer-events-none"
        style={{
          width: '45vw',
          height: '45vw',
          background: 'radial-gradient(circle, rgba(246,65,36,0.03) 0%, transparent 70%)',
          filter: 'blur(80px)',
          transform: 'translate(-50%, -50%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* ── Section Header ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-16 lg:mb-24"
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
            Milestones & Initiatives
          </span>
          <h2
            style={{
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
            }}
          >
            Activities
          </h2>
        </motion.div>

        {/* ── Timeline Track ──────────────────────────── */}
        <div className="relative">
          {/* Vertical central-ish track line (Desktop: aligned with year column) */}
          <div
            className="absolute left-4 md:left-[120px] top-4 bottom-4 w-[1px] hidden sm:block"
            style={{
              background: 'linear-gradient(180deg, rgba(246,65,36,0.4) 0%, rgba(246,65,36,0.05) 100%)',
            }}
            aria-hidden="true"
          />

          {/* ── Timeline Years ────────────────────────── */}
          <div className="flex flex-col gap-12 sm:gap-16">
            {sortedYears.map((year) => {
              const yearItems = groupedActivities[year]

              return (
                <div
                  key={year}
                  className="flex flex-col sm:flex-row relative gap-6 sm:gap-8"
                >
                  {/* Left Column: Year Indicator */}
                  <div
                    className="flex sm:flex-col items-center sm:items-end justify-start sm:justify-start w-full sm:w-[100px] flex-shrink-0 relative z-20"
                    style={{ gap: '0.75rem' }}
                  >
                    {/* Circle icon marker on track (only shows on desktop, aligned correctly) */}
                    <div
                      className="absolute right-[-27px] top-[14px] w-3 h-3 rounded-full hidden sm:block"
                      style={{
                        background: '#0D0D0D',
                        border: '2px solid #F64124',
                        boxShadow: '0 0 8px #F64124',
                      }}
                      aria-hidden="true"
                    />

                    {/* Mobile tiny indicator dot */}
                    <div
                      className="w-2.5 h-2.5 rounded-full sm:hidden"
                      style={{
                        background: '#F64124',
                        boxShadow: '0 0 6px #F64124',
                      }}
                      aria-hidden="true"
                    />

                    {/* The Year Text */}
                    <motion.div
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <h3
                        style={{
                          fontFamily: 'Space Grotesk, Inter, sans-serif',
                          fontSize: '1.75rem',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          lineHeight: 1,
                        }}
                      >
                        {year}
                      </h3>
                    </motion.div>
                  </div>

                  {/* Right Column: Cards Grid */}
                  <div className="flex-1 flex flex-col gap-4 pl-4 sm:pl-8">
                    {yearItems.map((activity, itemIdx) => {
                      const Icon = getIconForActivity(activity.title)
                      const clickable = hasDetail(activity.title)
                      return (
                        <motion.div
                          key={activity.title}
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-40px' }}
                          transition={{
                            duration: 0.55,
                            delay: itemIdx * 0.1,
                            ease: EASE,
                          }}
                          className="group relative overflow-hidden transition-all duration-300 rounded-xl"
                          style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            padding: '1.25rem 1.5rem',
                            cursor: clickable ? 'pointer' : 'default',
                          }}
                          onClick={() => clickable && setSelectedActivity(activity)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(246,65,36,0.03)'
                            e.currentTarget.style.borderColor = 'rgba(246,65,36,0.25)'
                            e.currentTarget.style.transform = 'translateY(-3px)'
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(246,65,36,0.08)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = 'none'
                          }}
                        >
                          {/* Card left color accent strip */}
                          <div
                            className="absolute left-0 top-0 bottom-0 w-[2px] transition-transform duration-300 scale-y-0 group-hover:scale-y-100"
                            style={{ background: '#F64124' }}
                            aria-hidden="true"
                          />

                          <div className="flex items-center gap-4">
                            {/* Visual Icon Box */}
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300"
                              style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.08)',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(246,65,36,0.2)'
                                e.currentTarget.style.background = 'rgba(246,65,36,0.08)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                              }}
                            >
                              <Icon
                                size={18}
                                color="#F64124"
                                strokeWidth={2}
                                className="transition-transform duration-300 group-hover:rotate-[15deg]"
                                aria-hidden="true"
                              />
                            </div>

                            {/* Card Content */}
                            <div className="flex-1">
                              <span
                                style={{
                                  fontFamily: 'Inter, sans-serif',
                                  fontSize: '0.72rem',
                                  fontWeight: 600,
                                  color: 'rgba(255,255,255,0.3)',
                                  letterSpacing: '0.05em',
                                  textTransform: 'uppercase',
                                }}
                              >
                                {year} Activity
                              </span>
                              <h4
                                style={{
                                  fontFamily: 'Space Grotesk, Inter, sans-serif',
                                  fontSize: '1.05rem',
                                  fontWeight: 600,
                                  color: '#FFFFFF',
                                  letterSpacing: '-0.01em',
                                  marginTop: '0.15rem',
                                }}
                              >
                                {activity.title}
                              </h4>
                            </div>

                            {/* Click hint for clickable cards */}
                            {clickable && (
                              <div
                                className="flex-shrink-0 opacity-70 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                  fontFamily: 'Inter, sans-serif',
                                  fontSize: '0.75rem',
                                  color: '#F64124',
                                  fontWeight: 600,
                                }}
                              >
                                View Details →
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Event Popup Modal ─────────────────────────── */}
      <AnimatePresence>
        {selectedActivity && (
          <EventPopup
            activity={selectedActivity}
            onClose={() => setSelectedActivity(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
