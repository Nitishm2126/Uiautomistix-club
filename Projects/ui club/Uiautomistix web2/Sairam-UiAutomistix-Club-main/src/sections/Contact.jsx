import { motion } from 'framer-motion'
import { Mail, MapPin } from 'lucide-react'
import contactData from '../data/contact'

const Instagram = ({ size = 20, color = "#F64124" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const Linkedin = ({ size = 20, color = "#F64124" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
)

export default function Contact() {
  const EASE = [0.16, 1, 0.3, 1]

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.6, delay, ease: EASE }
  })

  return (
    <section 
      id="contact" 
      aria-labelledby="contact-heading"
      style={{ 
        background: '#0D0D0D',
        padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background accent orb */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "5%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(246,65,36,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Header */}
        <motion.div 
          {...fadeUp(0)}
          style={{ marginBottom: '4rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <div style={{ width: "32px", height: "2px", background: "#F64124", borderRadius: "2px" }} />
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#F64124",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
              }}
            >
              Get In Touch
            </span>
            <div style={{ width: "32px", height: "2px", background: "#F64124", borderRadius: "2px" }} />
          </div>

          <h2 
            id="contact-heading"
            style={{
              fontFamily: "Space Grotesk, Inter, sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Let's Connect & Automate
          </h2>
          <p 
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.45)",
              maxWidth: "540px",
              lineHeight: 1.65,
              margin: "0 auto"
            }}
          >
            Have a question, idea, collaboration opportunity, or want to know more about Sairam UiAutomistix Club? We'd love to hear from you.
          </p>
        </motion.div>

        {/* Contact Information Cards Grid */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '1.5rem' 
            }}
          >
            
            {/* Email Card */}
            <motion.a 
              {...fadeUp(0.05)}
              href={`mailto:${contactData.email}`}
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "1rem",
                padding: "1.75rem 1.5rem",
                transition: "transform 270ms ease, border-color 270ms ease, box-shadow 270ms ease",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                textDecoration: "none"
              }}
              whileHover={{ y: -5, transition: { duration: 0.22, ease: EASE } }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(246,65,36,0.35)"
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(246,65,36,0.10)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: "rgba(246,65,36,0.09)",
                  border: "1px solid rgba(246,65,36,0.20)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Mail size={20} color="#F64124" strokeWidth={1.6} />
              </div>
              <h4
                style={{
                  fontFamily: "Space Grotesk, Inter, sans-serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                  marginTop: "0.5rem"
                }}
              >
                Email
              </h4>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.65,
                  wordBreak: "break-all"
                }}
              >
                {contactData.email}
              </p>
            </motion.a>

            {/* Address Card */}
            <motion.div 
              {...fadeUp(0.1)}
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "1rem",
                padding: "1.75rem 1.5rem",
                transition: "transform 270ms ease, border-color 270ms ease, box-shadow 270ms ease",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: "rgba(246,65,36,0.09)",
                  border: "1px solid rgba(246,65,36,0.20)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <MapPin size={20} color="#F64124" strokeWidth={1.6} />
              </div>
              <h4
                style={{
                  fontFamily: "Space Grotesk, Inter, sans-serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                  marginTop: "0.5rem"
                }}
              >
                Address
              </h4>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.65,
                }}
              >
                {contactData.address.map((line, i) => (
                  <p key={i} style={{ margin: 0 }}>{line}</p>
                ))}
              </div>
            </motion.div>

            {/* Instagram Card */}
            <motion.a 
              {...fadeUp(0.15)}
              href={contactData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "1rem",
                padding: "1.75rem 1.5rem",
                transition: "transform 270ms ease, border-color 270ms ease, box-shadow 270ms ease",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                textDecoration: "none"
              }}
              whileHover={{ y: -5, transition: { duration: 0.22, ease: EASE } }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(246,65,36,0.35)"
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(246,65,36,0.10)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: "rgba(246,65,36,0.09)",
                  border: "1px solid rgba(246,65,36,0.20)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Instagram size={20} color="#F64124" />
              </div>
              <h4
                style={{
                  fontFamily: "Space Grotesk, Inter, sans-serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                  marginTop: "0.5rem"
                }}
              >
                Instagram
              </h4>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.65,
                }}
              >
                @sairam_uiautomistix_club
              </p>
            </motion.a>

            {/* LinkedIn Card */}
            <motion.a 
              {...fadeUp(0.2)}
              href={contactData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "1rem",
                padding: "1.75rem 1.5rem",
                transition: "transform 270ms ease, border-color 270ms ease, box-shadow 270ms ease",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                textDecoration: "none"
              }}
              whileHover={{ y: -5, transition: { duration: 0.22, ease: EASE } }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(246,65,36,0.35)"
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(246,65,36,0.10)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: "rgba(246,65,36,0.09)",
                  border: "1px solid rgba(246,65,36,0.20)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Linkedin size={20} color="#F64124" />
              </div>
              <h4
                style={{
                  fontFamily: "Space Grotesk, Inter, sans-serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                  marginTop: "0.5rem"
                }}
              >
                LinkedIn
              </h4>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.65,
                }}
              >
                Sairam UiAutomistix Club
              </p>
            </motion.a>

          </div>
        </div>

      </div>
    </section>
  )
}
