import { motion } from 'framer-motion'
import { Eye, Target, CheckCircle2, Bot, Layers, Zap } from 'lucide-react'

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
        </div>
      </div>
    </section>
  )
}
