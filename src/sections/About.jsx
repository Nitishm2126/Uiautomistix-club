import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Target, CheckCircle2, Bot, Layers, Zap, Trophy, Award, Maximize2, ExternalLink, X } from 'lucide-react'

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */
const EASE = [0.16, 1, 0.3, 1]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

/* ============================================================
   DATA
   ============================================================ */
const VISION_TEXT = "To empower students to explore and master automation technologies through UiPath, fostering innovative thinking and practical problem-solving in real-world processes. We aim to create a community where automation drives efficiency, creativity, and positive impact across industries and society."

const MISSION_POINTS = [
  {
    icon: Bot,
    text: "To provide students with hands-on experience in RPA and UiPath, enabling them to design and implement intelligent automation solutions.",
  },
  {
    icon: Layers,
    text: "To develop teamwork, technical skills, and leadership through mentor-led workshops and projects.",
  },
  {
    icon: Zap,
    text: "To inspire innovation and a passion for automation by organizing events, hackathons, and training programs.",
  },
  {
    icon: Target,
    text: "To create solutions that enhance productivity, optimize workflows, and contribute to societal and industrial growth.",
  },
]

const OBJECTIVES = [
  "To equip students with industry-ready skills in UiPath and automation technologies.",
  "To encourage participation in automation challenges, competitions, and Techfest\u2019s to foster excellence.",
  "To promote awareness of RPA among young minds and inspire them to leverage automation for positive change.",
  "To support the development of innovative automation projects addressing business and societal challenges.",
]

/* ============================================================
   SHARED CARD STYLES
   ============================================================ */
const sectionCardStyle = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.05)',
  borderRadius: '1.25rem',
  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}

const sectionHeadingStyle = {
  fontFamily: 'Space Grotesk, Inter, sans-serif',
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#FFFFFF',
  lineHeight: 1.2,
}

const listItemTextStyle = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.92rem',
  lineHeight: 1.7,
  color: 'rgba(255,255,255,0.7)',
  flex: 1,
  minWidth: 0,
}

/* ============================================================
   ABOUT SECTION COMPONENT
   ============================================================ */
export default function AboutSection() {
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false)

  // Escape key listener for poster modal
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') setIsPosterModalOpen(false)
  }, [])

  useEffect(() => {
    if (!isPosterModalOpen) return
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isPosterModalOpen, handleKeyDown])

  return (
    <section
      id="about"
      aria-label="About Us"
      style={{
        background: '#0A0A0A',
        padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Background Elements ───────────────────────── */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: '50%',
          height: '60%',
          background: 'radial-gradient(ellipse at top right, rgba(246,65,36,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      
      <div
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: '40%',
          height: '50%',
          background: 'radial-gradient(ellipse at bottom left, rgba(246,65,36,0.05) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
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
            Discover Our Purpose
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
            About The Club
          </h2>
        </motion.div>

        {/* ── Main Content Layout ─────────────────────── */}
        <div className="flex flex-col gap-12 lg:gap-16">
          
          {/* ── VISION ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="w-full relative overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(246,65,36,0.15)',
              borderRadius: '1.5rem',
              padding: 'clamp(2rem, 5vw, 3.5rem)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
            }}
          >
            <div
              className="absolute top-0 left-0 w-full h-1"
              style={{ background: 'linear-gradient(90deg, #F64124, rgba(246,65,36,0.1))' }}
            />
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div 
                className="flex-shrink-0 flex items-center gap-4 md:w-1/4"
              >
                <div 
                  className="flex items-center justify-center rounded-2xl flex-shrink-0"
                  style={{
                    width: '64px',
                    height: '64px',
                    background: 'rgba(246,65,36,0.1)',
                    border: '1px solid rgba(246,65,36,0.2)'
                  }}
                >
                  <Eye size={32} color="#F64124" strokeWidth={1.5} />
                </div>
                <h3
                  style={{
                    fontFamily: 'Space Grotesk, Inter, sans-serif',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Vision
                </h3>
              </div>
              
              <div className="md:w-3/4">
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                    lineHeight: 1.8,
                    color: 'rgba(255,255,255,0.85)',
                    fontWeight: 400,
                  }}
                >
                  {VISION_TEXT}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── MISSION & OBJECTIVES ROW ────────────────── */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
            style={{ alignItems: 'stretch' }}
          >
            
            {/* ── MISSION ─────────────────────────────── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              style={sectionCardStyle}
            >
              {/* Section Heading */}
              <div
                className="flex items-center gap-3"
                style={{ marginBottom: '1.5rem' }}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-xl"
                  style={{
                    width: '44px',
                    height: '44px',
                    background: 'rgba(246,65,36,0.08)',
                    border: '1px solid rgba(246,65,36,0.15)',
                  }}
                >
                  <Target size={22} color="#F64124" strokeWidth={2} />
                </div>
                <h3 style={sectionHeadingStyle}>
                  Mission
                </h3>
              </div>

              {/* Mission Items */}
              <div className="flex flex-col gap-3" style={{ flex: 1 }}>
                {MISSION_POINTS.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="group flex gap-4 rounded-xl transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        padding: '1rem 1.15rem',
                        alignItems: 'flex-start',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(246,65,36,0.04)'
                        e.currentTarget.style.borderColor = 'rgba(246,65,36,0.15)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
                      }}
                    >
                      <div 
                        className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{ marginTop: '3px' }}
                      >
                        <Icon size={18} color="#F64124" strokeWidth={1.8} />
                      </div>
                      <p style={listItemTextStyle}>
                        {item.text}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* ── OBJECTIVES ──────────────────────────── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              style={sectionCardStyle}
            >
              {/* Section Heading */}
              <div
                className="flex items-center gap-3"
                style={{ marginBottom: '1.5rem' }}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-xl"
                  style={{
                    width: '44px',
                    height: '44px',
                    background: 'rgba(246,65,36,0.08)',
                    border: '1px solid rgba(246,65,36,0.15)',
                  }}
                >
                  <CheckCircle2 size={22} color="#F64124" strokeWidth={2} />
                </div>
                <h3 style={sectionHeadingStyle}>
                  Objectives
                </h3>
              </div>

              {/* Objective Items */}
              <div className="flex flex-col gap-3" style={{ flex: 1 }}>
                {OBJECTIVES.map((text, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex gap-4 rounded-xl"
                    style={{
                      background: 'transparent',
                      borderLeft: '2px solid rgba(246,65,36,0.3)',
                      padding: '1rem 1.15rem',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div 
                      className="flex-shrink-0 flex items-center justify-center rounded-full"
                      style={{
                        width: '24px',
                        height: '24px',
                        minWidth: '24px',
                        background: 'rgba(246,65,36,0.1)',
                        marginTop: '1px',
                      }}
                    >
                      <span 
                        style={{ 
                          fontFamily: 'Space Grotesk, sans-serif', 
                          fontWeight: 700, 
                          color: '#F64124',
                          fontSize: '0.8rem',
                          lineHeight: 1,
                        }}
                      >
                        {index + 1}
                      </span>
                    </div>
                    <p style={listItemTextStyle}>
                      {text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* ── 5TH CONSECUTIVE YEAR ON THE GLOBAL STAGE (HIGHLIGHTED FEATURE) ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="w-full relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(246,65,36,0.06) 0%, rgba(255,255,255,0.02) 50%, rgba(246,65,36,0.03) 100%)',
              border: '1px solid rgba(246,65,36,0.25)',
              borderRadius: '1.5rem',
              padding: 'clamp(2rem, 5vw, 3.25rem)',
              boxShadow: '0 12px 50px rgba(0,0,0,0.35), 0 0 40px rgba(246,65,36,0.06)',
            }}
          >
            {/* Top glowing accent bar */}
            <div
              className="absolute top-0 left-0 w-full h-1"
              style={{ background: 'linear-gradient(90deg, #F64124, rgba(246,65,36,0.25), #F64124)' }}
            />

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              {/* Left Content Column */}
              <div className="flex-1 flex flex-col items-start">
                {/* Badge */}
                <div
                  className="inline-flex items-center gap-2"
                  style={{
                    padding: '0.4rem 0.9rem',
                    borderRadius: '9999px',
                    background: 'rgba(246,65,36,0.12)',
                    border: '1px solid rgba(246,65,36,0.3)',
                    marginBottom: '1.25rem',
                  }}
                >
                  <Trophy size={15} color="#F64124" strokeWidth={2.2} />
                  <span
                    style={{
                      fontFamily: 'Space Grotesk, Inter, sans-serif',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#F64124',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Global Recognition • UiPath Community
                  </span>
                </div>

                {/* Heading */}
                <h3
                  style={{
                    fontFamily: 'Space Grotesk, Inter, sans-serif',
                    fontSize: 'clamp(1.6rem, 3.5vw, 2.35rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: 1.25,
                    letterSpacing: '-0.02em',
                    marginBottom: '1rem',
                  }}
                >
                  5th Consecutive Year on the Global Stage!
                </h3>

                {/* Content description */}
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                    lineHeight: 1.8,
                    color: 'rgba(255,255,255,0.85)',
                    marginBottom: '1.75rem',
                  }}
                >
                  Our <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>Student Developer Champions</strong> continue to shine on the global stage through the <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>UiPath Community</strong>, showcasing excellence in automation, innovation, and technology for the <strong style={{ color: '#F64124', fontWeight: 600 }}>fifth consecutive year</strong>.
                </p>

                {/* Student Developer Champions Entries */}
                <div className="w-full">
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.4)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Student Developer Champions (2022 – 2027)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 w-full">
                    {[
                      { name: "Shanthini .D", year: "2022-2023" },
                      { name: "Hemanth .M", year: "2023-2024" },
                      { name: "Aishvarya .R", year: "2024-2025" },
                      { name: "Balamurugan .S", year: "2025-2026" },
                      { name: "Prithyanka SJ", year: "2026-2027", current: true },
                    ].map((champ, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl transition-all duration-200 ${
                          champ.current ? 'sm:col-span-2' : ''
                        }`}
                        style={{
                          background: champ.current ? 'rgba(246,65,36,0.12)' : 'rgba(255,255,255,0.025)',
                          border: champ.current ? '1px solid rgba(246,65,36,0.4)' : '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Award size={14} color={champ.current ? '#F64124' : 'rgba(255,255,255,0.5)'} className="flex-shrink-0" />
                          <span
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '0.84rem',
                              color: '#FFFFFF',
                              fontWeight: 600,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {champ.name}
                          </span>
                        </div>
                        <span
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.75rem',
                            color: champ.current ? '#F64124' : 'rgba(255,255,255,0.45)',
                            fontWeight: 500,
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                          }}
                        >
                          ({champ.year})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Poster Column */}
              <div className="w-full lg:w-[380px] flex-shrink-0 flex justify-center mt-4 lg:mt-0">
                <div
                  onClick={() => setIsPosterModalOpen(true)}
                  role="button"
                  tabIndex={0}
                  aria-label="Click to enlarge 5th Year Global Stage Poster"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setIsPosterModalOpen(true)
                    }
                  }}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group/poster transition-all duration-300 w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[380px] mx-auto focus-ring"
                  style={{
                    border: '1px solid rgba(246,65,36,0.3)',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.5), 0 0 30px rgba(246,65,36,0.12)',
                    background: '#0D0D0D',
                  }}
                >
                  <img
                    src="/assets/events/global-stage-champions.jpg"
                    alt="Student Developer Champions - 5th Consecutive Year on the Global Stage"
                    style={{
                      width: '100%',
                      maxHeight: '440px',
                      display: 'block',
                      objectFit: 'contain',
                      margin: '0 auto',
                    }}
                    className="transition-transform duration-500 group-hover/poster:scale-[1.02]"
                  />
                  <div
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover/poster:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2"
                    style={{ backdropFilter: 'blur(2px)' }}
                  >
                    <span
                      className="px-4 py-2 rounded-lg text-white text-xs font-semibold flex items-center gap-2"
                      style={{ background: 'rgba(246,65,36,0.9)', fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      <Maximize2 size={14} /> Click to Enlarge Poster
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Poster Lightbox Modal ── */}
      <AnimatePresence>
        {isPosterModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(0.75rem, 3vw, 1.5rem)',
              background: 'rgba(0, 0, 0, 0.88)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxSizing: 'border-box',
            }}
            onClick={() => setIsPosterModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative w-full flex flex-col overflow-hidden"
              style={{
                width: '100%',
                maxWidth: '520px',
                maxHeight: 'min(88vh, 720px)',
                background: '#121212',
                border: '1px solid rgba(246,65,36,0.3)',
                borderRadius: '1.25rem',
                boxShadow: '0 25px 60px -15px rgba(0,0,0,0.85), 0 0 50px rgba(246,65,36,0.12)',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header Bar — Single cleanly aligned row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  padding: '0.75rem clamp(0.85rem, 2.5vw, 1.25rem)',
                  background: 'rgba(18,18,18,0.98)',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  flexShrink: 0,
                  boxSizing: 'border-box',
                }}
              >
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  <Trophy size={16} color="#F64124" style={{ flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 'clamp(0.78rem, 2vw, 0.875rem)',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      letterSpacing: '0.02em',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    UiPath Global Stage Poster
                  </span>
                </div>

                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flexShrink: 0,
                  }}
                >
                  <a
                    href="/assets/events/global-stage-champions.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open full resolution poster in new browser tab"
                    style={{
                      height: '32px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                      padding: '0 0.65rem',
                      borderRadius: '0.5rem',
                      background: 'rgba(246,65,36,0.12)',
                      color: '#F64124',
                      border: '1px solid rgba(246,65,36,0.25)',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      boxSizing: 'border-box',
                      transition: 'background 200ms ease',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(246,65,36,0.22)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(246,65,36,0.12)'
                    }}
                  >
                    <ExternalLink size={13} strokeWidth={2.2} />
                    <span>Full Size</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsPosterModalOpen(false)}
                    aria-label="Close poster modal"
                    style={{
                      width: '32px',
                      height: '32px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '0.5rem',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      boxSizing: 'border-box',
                      transition: 'background 200ms ease, border-color 200ms ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(246,65,36,0.25)'
                      e.currentTarget.style.borderColor = 'rgba(246,65,36,0.5)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    }}
                  >
                    <X size={16} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              {/* Modal Scrollable Body with Consistent Unified Padding on All Sides */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  overflowY: 'auto',
                  overscrollBehavior: 'contain',
                  padding: 'clamp(0.85rem, 2.5vw, 1.25rem)',
                  paddingBottom: 'clamp(1.1rem, 3vw, 1.5rem)',
                  gap: '0.85rem',
                  boxSizing: 'border-box',
                }}
              >
                {/* Modal Poster Image — perfectly centered with preserved aspect ratio */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    minHeight: 0,
                    flexShrink: 0,
                  }}
                >
                  <img
                    src="/assets/events/global-stage-champions.jpg"
                    alt="Student Developer Champions - 5th Consecutive Year on the Global Stage"
                    style={{
                      maxHeight: 'clamp(160px, 30vh, 290px)',
                      width: 'auto',
                      maxWidth: '100%',
                      display: 'block',
                      objectFit: 'contain',
                      borderRadius: '0.625rem',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                      margin: '0 auto',
                    }}
                  />
                </div>

                {/* Modal Description — neat left-aligned text with identical padding and spacing */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexShrink: 0,
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  <h4
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 'clamp(0.95rem, 2.4vw, 1.125rem)',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      marginBottom: '0.4rem',
                      lineHeight: 1.3,
                    }}
                  >
                    5th Consecutive Year on the Global Stage!
                  </h4>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 'clamp(0.8rem, 1.8vw, 0.85rem)',
                      lineHeight: 1.6,
                      color: 'rgba(255,255,255,0.72)',
                      margin: 0,
                    }}
                  >
                    Our Student Developer Champions continue to shine on the global stage through the UiPath Community, showcasing excellence in automation, innovation, and technology for the fifth consecutive year.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
