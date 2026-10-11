import { motion } from 'framer-motion'
import { Mail, MapPin, ChevronRight } from 'lucide-react'
import contactData from '../data/contact'

const Instagram = ({ size = 20, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const Linkedin = ({ size = 20, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
)

export default function Footer() {
  const EASE = [0.16, 1, 0.3, 1]

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-20px" },
    transition: { duration: 0.6, delay, ease: EASE }
  })

  const QUICK_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Activities', href: '#activities' },
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Team', href: '#team' },
    { label: 'Join Us', href: '#join-us' },
    { label: 'Contact', href: '#contact' }
  ]

  return (
    <footer 
      style={{
        background: '#050505',
        color: '#FFFFFF',
        paddingTop: '6rem',
        paddingBottom: '2rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Main Footer Content */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '3rem',
            marginBottom: '4rem'
          }}
        >
          {/* Column 1: Brand & Description */}
          <motion.div {...fadeUp(0)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  background: '#FFFFFF',
                  borderRadius: '0.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  padding: '3px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                <img 
                  src="/assets/logo/logo.png" 
                  alt="Sairam UiAutomistix Club Logo" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fallbackTried) {
                      e.currentTarget.dataset.fallbackTried = 'true'
                      e.currentTarget.src = '/assets/logo/logo.jpg'
                    }
                  }}
                />
              </div>
              <span 
                style={{
                  fontFamily: 'Space Grotesk, Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF'
                }}
              >
                Sairam UiAutomistix Club
              </span>
            </div>
            
            <p 
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '0.9rem',
                color: '#F64124',
                marginBottom: '1rem',
                letterSpacing: '0.05em'
              }}
            >
              Innovate. Automate. Elevate.
            </p>
            
            <p 
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.6,
                maxWidth: '280px'
              }}
            >
              Sairam UiAutomistix Club is a student community focused on automation, UiPath, RPA, innovation, and practical problem-solving.
            </p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div {...fadeUp(0.1)}>
            <h4 
              style={{
                fontFamily: 'Space Grotesk, Inter, sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                color: '#FFFFFF',
                marginBottom: '1.5rem',
                letterSpacing: '-0.01em'
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    className="group"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'color 200ms ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#F64124'
                      e.currentTarget.querySelector('svg').style.transform = 'translateX(4px)'
                      e.currentTarget.querySelector('svg').style.opacity = '1'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                      e.currentTarget.querySelector('svg').style.transform = 'translateX(0)'
                      e.currentTarget.querySelector('svg').style.opacity = '0'
                    }}
                  >
                    <ChevronRight size={14} style={{ opacity: 0, transition: 'all 200ms ease' }} />
                    <span style={{ marginLeft: '-14px', transition: 'transform 200ms ease' }} className="group-hover:translate-x-2">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Connect */}
          <motion.div {...fadeUp(0.2)}>
            <h4 
              style={{
                fontFamily: 'Space Grotesk, Inter, sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                color: '#FFFFFF',
                marginBottom: '1.5rem',
                letterSpacing: '-0.01em'
              }}
            >
              Connect
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <a 
                href={contactData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  textDecoration: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  transition: 'color 200ms ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#F64124'
                  e.currentTarget.querySelector('.icon-bg').style.background = 'rgba(246,65,36,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                  e.currentTarget.querySelector('.icon-bg').style.background = 'rgba(255,255,255,0.04)'
                }}
              >
                <div 
                  className="icon-bg"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 200ms ease'
                  }}
                >
                  <Instagram size={16} />
                </div>
                @sairam_uiautomistix_club
              </a>

              <a 
                href={contactData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  textDecoration: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  transition: 'color 200ms ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#F64124'
                  e.currentTarget.querySelector('.icon-bg').style.background = 'rgba(246,65,36,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                  e.currentTarget.querySelector('.icon-bg').style.background = 'rgba(255,255,255,0.04)'
                }}
              >
                <div 
                  className="icon-bg"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 200ms ease'
                  }}
                >
                  <Linkedin size={16} />
                </div>
                Sairam UiAutomistix Club
              </a>

              <a 
                href={`mailto:${contactData.email}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  textDecoration: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  transition: 'color 200ms ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#F64124'
                  e.currentTarget.querySelector('.icon-bg').style.background = 'rgba(246,65,36,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                  e.currentTarget.querySelector('.icon-bg').style.background = 'rgba(255,255,255,0.04)'
                }}
              >
                <div 
                  className="icon-bg"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 200ms ease'
                  }}
                >
                  <Mail size={16} />
                </div>
                {contactData.email}
              </a>

            </div>
          </motion.div>

          {/* Column 4: College */}
          <motion.div {...fadeUp(0.3)}>
            <h4 
              style={{
                fontFamily: 'Space Grotesk, Inter, sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                color: '#FFFFFF',
                marginBottom: '1.5rem',
                letterSpacing: '-0.01em'
              }}
            >
              College
            </h4>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(246,65,36,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <MapPin size={16} color="#F64124" />
              </div>
              <div 
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.6,
                }}
              >
                <p style={{ margin: '0 0 0.25rem 0', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>Sri Sairam Engineering College</p>
                <p style={{ margin: '0 0 0.25rem 0' }}>Sai Leo Nagar, West Tambaram Poonthandalam Village</p>
                <p style={{ margin: 0 }}>Chennai, Tamil Nadu 600044</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Divider & Copyright */}
        <motion.div 
          {...fadeUp(0.4)}
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            textAlign: 'center'
          }}
        >
          <p 
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.4)',
              margin: 0
            }}
          >
            &copy; 2026 Sairam UiAutomistix Club
          </p>
          <p 
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.4)',
              margin: 0
            }}
          >
            All rights reserved.
          </p>
        </motion.div>

      </div>
    </footer>
  )
}
