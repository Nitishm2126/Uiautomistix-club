/**
 * JoinUs.jsx — Sairam UiAutomistix Club
 *
 * Renders the Join Us / Membership section.
 *
 * Content source: src/data/membership.js
 *   — Update text, benefits, steps, or registrationUrl there.
 *   — No JSX changes needed for content updates.
 *
 * Sections rendered:
 *   1. Section header
 *   2. Eligibility
 *   3. Membership Benefits (icon cards)
 *   4. How to Join (numbered steps)
 *   5. CTA + registration button (or "coming soon" if URL is empty)
 */

import { motion } from "framer-motion"
import {
  Cpu,
  BookOpen,
  Layers,
  Users,
  TrendingUp,
  Trophy,
  Info,
  FileText,
  Send,
  Mail,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  ClipboardList,
} from "lucide-react"
import { membershipData } from "../data/membership"

/* ── Icon registry (must match icon names in membership.js) ── */
const ICON_MAP = {
  Cpu,
  BookOpen,
  Layers,
  Users,
  TrendingUp,
  Trophy,
  Info,
  FileText,
  Send,
  Mail,
}

function DynamicIcon({ name, size = 22, color = "#F64124" }) {
  const Icon = ICON_MAP[name]
  if (!Icon) return null
  return <Icon size={size} color={color} strokeWidth={1.6} />
}

/* ── Animation helpers ───────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.6, delay, ease: EASE },
})

/* ── Benefit Card ────────────────────────────────────────── */
function BenefitCard({ benefit, index }) {
  return (
    <motion.div
      {...fadeUp(index * 0.08)}
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "1rem",
        padding: "1.75rem 1.5rem",
        transition:
          "transform 270ms ease, border-color 270ms ease, box-shadow 270ms ease",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
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
      {/* Icon container */}
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
        <DynamicIcon name={benefit.icon} size={20} />
      </div>

      {/* Title */}
      <h4
        style={{
          fontFamily: "Space Grotesk, Inter, sans-serif",
          fontSize: "1rem",
          fontWeight: 700,
          color: "#FFFFFF",
          letterSpacing: "-0.01em",
          lineHeight: 1.3,
        }}
      >
        {benefit.title}
      </h4>

      {/* Description */}
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.85rem",
          color: "rgba(255,255,255,0.45)",
          lineHeight: 1.65,
        }}
      >
        {benefit.description}
      </p>
    </motion.div>
  )
}

/* ── Step Card ───────────────────────────────────────────── */
function StepCard({ step, stepNumber, index, isLast }) {
  return (
    <motion.div
      {...fadeUp(index * 0.1)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        position: "relative",
      }}
    >
      {/* Step number + connector line (desktop) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0",
          width: "100%",
          marginBottom: "1rem",
        }}
      >
        {/* Number badge */}
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #F64124 0%, #d43010 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 4px 16px rgba(246,65,36,0.30)",
            zIndex: 1,
            position: "relative",
          }}
        >
          <span
            style={{
              fontFamily: "Space Grotesk, Inter, sans-serif",
              fontSize: "0.9rem",
              fontWeight: 800,
              color: "#FFFFFF",
            }}
          >
            {stepNumber}
          </span>
        </div>

        {/* Connector line — hide on last step */}
        {!isLast && (
          <div
            style={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(246,65,36,0.40), rgba(246,65,36,0.06))",
              marginLeft: "0.5rem",
            }}
          />
        )}
      </div>

      {/* Icon */}
      <div
        style={{
          marginBottom: "0.6rem",
          opacity: 0.7,
        }}
      >
        <DynamicIcon name={step.icon} size={18} color="rgba(246,65,36,0.75)" />
      </div>

      {/* Title */}
      <h4
        style={{
          fontFamily: "Space Grotesk, Inter, sans-serif",
          fontSize: "0.95rem",
          fontWeight: 700,
          color: "#FFFFFF",
          letterSpacing: "-0.01em",
          marginBottom: "0.4rem",
          lineHeight: 1.3,
        }}
      >
        {step.title}
      </h4>

      {/* Description */}
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.82rem",
          color: "rgba(255,255,255,0.40)",
          lineHeight: 1.65,
        }}
      >
        {step.description}
      </p>
    </motion.div>
  )
}

/* ── JoinUs Section ──────────────────────────────────────── */
export default function JoinUsSection() {
  const { eligibility, benefits, steps, registrationUrl, ctaHeading, ctaSubtext } =
    membershipData

  const hasRegistrationUrl = registrationUrl && registrationUrl.trim() !== ""

  return (
    <section
      id="join-us"
      aria-labelledby="joinus-heading"
      style={{
        background: "#0D0D0D",
        padding: "clamp(4rem, 8vw, 7rem) 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent orb */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "5%",
          left: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(246,65,36,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* ══════════════════════════════════════════════════
            1. SECTION HEADER
        ══════════════════════════════════════════════════ */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: "4rem" }}>
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "2px",
                background: "#F64124",
                borderRadius: "2px",
              }}
            />
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
              Membership
            </span>
          </div>

          {/* Main heading */}
          <h2
            id="joinus-heading"
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
            Join Us
          </h2>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.45)",
              maxWidth: "540px",
              lineHeight: 1.65,
            }}
          >
            {membershipData.subtext}
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════════════
            2. ELIGIBILITY
        ══════════════════════════════════════════════════ */}
        <motion.div {...fadeUp(0.05)} style={{ marginBottom: "4.5rem" }}>
          {/* Sub-heading */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.65rem",
              marginBottom: "1.25rem",
            }}
          >
            <div
              style={{
                width: "3px",
                height: "20px",
                borderRadius: "2px",
                background: "#F64124",
                flexShrink: 0,
              }}
            />
            <h3
              style={{
                fontFamily: "Space Grotesk, Inter, sans-serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
              }}
            >
              Who Can Join?
            </h3>
          </div>

          {/* Eligibility card */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "1.25rem",
              background: "rgba(246,65,36,0.04)",
              border: "1px solid rgba(246,65,36,0.14)",
              borderRadius: "1rem",
              padding: "1.5rem 1.75rem",
            }}
          >
            <div style={{ flexShrink: 0, paddingTop: "2px" }}>
              <CheckCircle size={22} color="#F64124" strokeWidth={1.8} />
            </div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.95rem",
                color: "rgba(255,255,255,0.60)",
                lineHeight: 1.7,
              }}
            >
              {eligibility}
            </p>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════
            3. BENEFITS
        ══════════════════════════════════════════════════ */}
        <div style={{ marginBottom: "4.5rem" }}>
          {/* Sub-heading */}
          <motion.div
            {...fadeUp(0)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.65rem",
              marginBottom: "1.75rem",
            }}
          >
            <div
              style={{
                width: "3px",
                height: "20px",
                borderRadius: "2px",
                background: "#F64124",
                flexShrink: 0,
              }}
            />
            <h3
              style={{
                fontFamily: "Space Grotesk, Inter, sans-serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
              }}
            >
              Membership Benefits
            </h3>
          </motion.div>

          {/* Benefits grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
              gap: "1rem",
            }}
          >
            {benefits.map((benefit, i) => (
              <BenefitCard key={benefit.id} benefit={benefit} index={i} />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            4. HOW TO JOIN — STEPS
        ══════════════════════════════════════════════════ */}
        <div style={{ marginBottom: "5rem" }}>
          {/* Sub-heading */}
          <motion.div
            {...fadeUp(0)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.65rem",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                width: "3px",
                height: "20px",
                borderRadius: "2px",
                background: "#F64124",
                flexShrink: 0,
              }}
            />
            <h3
              style={{
                fontFamily: "Space Grotesk, Inter, sans-serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
              }}
            >
              How to Join
            </h3>
          </motion.div>

          {/* Steps grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {steps.map((step, i) => (
              <StepCard
                key={step.id}
                step={step}
                stepNumber={i + 1}
                index={i}
                isLast={i === steps.length - 1}
              />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            5. CTA
        ══════════════════════════════════════════════════ */}
        <motion.div
          {...fadeUp(0.1)}
          style={{
            background:
              "linear-gradient(135deg, rgba(246,65,36,0.09) 0%, rgba(246,65,36,0.04) 60%, rgba(246,65,36,0.01) 100%)",
            border: "1px solid rgba(246,65,36,0.18)",
            borderRadius: "1.25rem",
            padding: "3rem 2.5rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle top-right glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-40%",
              right: "-10%",
              width: "350px",
              height: "350px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(246,65,36,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Icon */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "rgba(246,65,36,0.10)",
              border: "1px solid rgba(246,65,36,0.25)",
              marginBottom: "1.25rem",
            }}
          >
            <ClipboardList size={24} color="#F64124" strokeWidth={1.6} />
          </div>

          {/* CTA heading */}
          <h3
            style={{
              fontFamily: "Space Grotesk, Inter, sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
              marginBottom: "0.75rem",
            }}
          >
            {ctaHeading}
          </h3>

          {/* CTA subtext */}
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.45)",
              maxWidth: "480px",
              margin: "0 auto 2rem",
              lineHeight: 1.65,
            }}
          >
            {ctaSubtext}
          </p>

          {/* Registration button / coming-soon state */}
          {hasRegistrationUrl ? (
            <motion.a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="join-registration-btn"
              aria-label="Join the club — opens registration form in a new tab"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                background:
                  "linear-gradient(135deg, #F64124 0%, #d43010 100%)",
                color: "#FFFFFF",
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "0.95rem",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "0.85rem 2.25rem",
                borderRadius: "99px",
                boxShadow: "0 6px 24px rgba(246,65,36,0.35)",
                transition: "box-shadow 250ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 10px 36px rgba(246,65,36,0.50)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 6px 24px rgba(246,65,36,0.35)"
              }}
            >
              Join the Club
              <ExternalLink size={16} strokeWidth={2} />
            </motion.a>
          ) : (
            /* ── Coming-soon state (registrationUrl is empty) ── */
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                background: "rgba(255,255,255,0.04)",
                border: "1.5px dashed rgba(246,65,36,0.30)",
                borderRadius: "99px",
                padding: "0.85rem 2rem",
              }}
            >
              <ArrowRight size={16} color="rgba(246,65,36,0.6)" strokeWidth={2} />
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.88rem",
                  color: "rgba(255,255,255,0.35)",
                  fontStyle: "italic",
                  letterSpacing: "0.01em",
                }}
              >
                Registration form will be available soon.
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
