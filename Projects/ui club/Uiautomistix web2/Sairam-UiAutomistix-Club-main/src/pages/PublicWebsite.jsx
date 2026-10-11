import Navbar from '../components/Navbar'
import Hero from '../sections/Hero'
import AnnouncementSection from '../sections/Announcement'
import AboutSection from '../sections/About'
import ActivitiesSection from '../sections/Activities'
import EventsSection from '../sections/Events'
import TeamSection from '../sections/Team'
import JoinUsSection from '../sections/JoinUs'
import ContactSection from '../sections/Contact'
import Footer from '../sections/Footer'

/**
 * PublicWebsite.jsx — Public-facing landing page for Sairam UiAutomistix Club
 *
 * Renders all 10 sections:
 * 1. Navbar
 * 2. Hero
 * 3. Announcement
 * 4. About
 * 5. Activities
 * 6. Events
 * 7. Team
 * 8. Join Us
 * 9. Contact
 * 10. Footer
 */
export default function PublicWebsite() {
  return (
    <div style={{ background: '#0A0A0A' }}>
      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── HERO ── */}
      <Hero />

      {/* ── ANNOUNCEMENT ── */}
      <AnnouncementSection />

      {/* ── ABOUT ── */}
      <AboutSection />

      {/* ── ACTIVITIES ── */}
      <ActivitiesSection />

      {/* ── EVENTS ── */}
      <EventsSection />


      {/* ── TEAM ── */}
      <TeamSection />

      {/* ── JOIN US ── */}
      <JoinUsSection />

      {/* ── CONTACT ── */}
      <ContactSection />

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  )
}
