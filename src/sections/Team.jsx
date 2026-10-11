/**
 * Team.jsx — Sairam UiAutomistix Club
 *
 * Renders two leadership groups:
 *   - MAGIC  (Mastermind · Advocate · Guide · Influencer · Communicator)
 *     → Existing members  (3rd Year)
 *     → Prospective members (2nd Year)
 *   - SCOPE  (Strategist · Caption · Organiser · Propagator · Executer)
 *     → Flat list, no Existing/Prospective split
 *
 * Data source: src/data/team.js
 * Swap that file's data (or replace with a Supabase fetch) and this
 * component re-renders automatically — no JSX changes needed.
 */

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import {
  magicExisting,
  magicProspective,
  scopeMembers,
} from "../data/team"
import OfficeBearers from "./OfficeBearers"

/* ── Animation helpers ──────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.6, delay, ease: EASE },
})

/* ── LinkedIn SVG Icon ───────────────────────────────────── */
function LinkedinIcon({ size = 18, color = "#0077B5" }) {
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

/* ── MemberCard ─────────────────────────────────────────── */
function MemberCard({ member, index, showYear = true }) {
  const isPlaceholder = member.name === "To be provided"

  return (
    <motion.article
      {...fadeUp(index * 0.07)}
      aria-label={
        isPlaceholder
          ? `${member.role} – member to be announced`
          : `${member.name}, ${member.role}`
      }
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        background: "rgba(255,255,255,0.025)",
        border: isPlaceholder
          ? "1.5px dashed rgba(246,65,36,0.22)"
          : "1px solid rgba(255,255,255,0.06)",
        borderRadius: "1rem",
        padding: "1.75rem 1rem 1.5rem",
        transition: "transform 280ms ease, border-color 280ms ease, box-shadow 280ms ease",
        cursor: "default",
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.25, ease: EASE },
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(246,65,36,0.40)"
        e.currentTarget.style.boxShadow = "0 14px 36px rgba(246,65,36,0.12)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = isPlaceholder
          ? "rgba(246,65,36,0.22)"
          : "rgba(255,255,255,0.06)"
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      {/* ── Photo ── */}
      <div
        style={{
          width: "84px",
          height: "84px",
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
          marginBottom: "1rem",
          border: isPlaceholder
            ? "2px dashed rgba(246,65,36,0.30)"
            : "2px solid rgba(246,65,36,0.28)",
          background: "rgba(246,65,36,0.05)",
        }}
      >
        <img
          src={member.imageUrl}
          alt={
            isPlaceholder
              ? `${member.role} – to be provided`
              : `Photo of ${member.name}`
          }
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
          }}
        />
      </div>

      {/* ── Role Badge ── */}
      <span
        style={{
          display: "inline-block",
          fontFamily: "Inter, sans-serif",
          fontSize: "0.65rem",
          fontWeight: 700,
          color: "#F64124",
          textTransform: "uppercase",
          letterSpacing: "0.11em",
          background: "rgba(246,65,36,0.09)",
          border: "1px solid rgba(246,65,36,0.22)",
          borderRadius: "99px",
          padding: "3px 11px",
          marginBottom: "0.55rem",
        }}
      >
        {member.role}
      </span>

      {/* ── Name ── */}
      <h4
        style={{
          fontFamily: "Space Grotesk, Inter, sans-serif",
          fontSize: "0.95rem",
          fontWeight: 600,
          color: isPlaceholder ? "rgba(255,255,255,0.28)" : "#FFFFFF",
          letterSpacing: "-0.01em",
          marginBottom: "0.3rem",
          lineHeight: 1.3,
          fontStyle: isPlaceholder ? "italic" : "normal",
        }}
      >
        {member.name}
      </h4>

      {/* ── Year + Department ── */}
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.78rem",
          color: isPlaceholder
            ? "rgba(255,255,255,0.20)"
            : "rgba(255,255,255,0.45)",
          lineHeight: 1.4,
          fontStyle: isPlaceholder ? "italic" : "normal",
          marginBottom: member.linkedin ? "1rem" : 0,
        }}
      >
        {isPlaceholder
          ? "To be provided"
          : showYear && member.year
          ? `${member.year} · ${member.department}`
          : member.department}
      </p>

      {/* ── Clickable LinkedIn Button / Link ── */}
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "rgba(255, 255, 255, 0.85)",
            fontFamily: "Inter, sans-serif",
            fontSize: "0.78rem",
            fontWeight: 600,
            letterSpacing: "0.02em",
            textDecoration: "none",
            transition: "all 250ms ease",
            marginTop: "auto",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0, 119, 181, 0.15)"
            e.currentTarget.style.borderColor = "rgba(0, 119, 181, 0.45)"
            e.currentTarget.style.color = "#FFFFFF"
            e.currentTarget.style.transform = "translateY(-2px)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)"
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)"
            e.currentTarget.style.color = "rgba(255, 255, 255, 0.85)"
            e.currentTarget.style.transform = "translateY(0)"
          }}
        >
          <LinkedinIcon size={15} color="#0077B5" />
          <span>LinkedIn</span>
          <ExternalLink size={12} style={{ opacity: 0.5, marginLeft: "2px" }} />
        </a>
      )}
    </motion.article>
  )
}

/* ── Sub-section heading (Existing / Prospective) ───────── */
function SubLabel({ label, accent = false }) {
  return (
    <motion.div
      {...fadeUp(0)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1.5rem",
      }}
    >
      <div
        style={{
          width: "3px",
          height: "22px",
          borderRadius: "2px",
          background: accent ? "#F64124" : "rgba(246,65,36,0.45)",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.78rem",
          fontWeight: 700,
          color: accent ? "#F64124" : "rgba(246,65,36,0.75)",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
        }}
      >
        {label}
      </span>
    </motion.div>
  )
}

/* ── Group Heading (MAGIC / SCOPE) ──────────────────────── */
function GroupHeading({ title, acronymRows }) {
  return (
    <motion.div {...fadeUp(0)} style={{ marginBottom: "0.75rem" }}>
      {/* Main title */}
      <h3
        style={{
          fontFamily: "Space Grotesk, Inter, sans-serif",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 800,
          color: "#FFFFFF",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          marginBottom: "0.75rem",
        }}
      >
        {title}
      </h3>

      {/* Acronym breakdown pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.4rem",
          marginBottom: "2rem",
        }}
      >
        {acronymRows.map(({ letter, word }) => (
          <span
            key={letter}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.72rem",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "99px",
              padding: "3px 10px 3px 3px",
            }}
          >
            <span
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "rgba(246,65,36,0.15)",
                border: "1px solid rgba(246,65,36,0.30)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "0.7rem",
                color: "#F64124",
              }}
            >
              {letter}
            </span>
            <span style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em" }}>
              {word}
            </span>
          </span>
        ))}
      </div>
    </motion.div>
  )
}

/* ── Member Grid ─────────────────────────────────────────── */
function MemberGrid({ members, showYear = true }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "1rem",
        marginBottom: "2.5rem",
      }}
    >
      {members.map((member, i) => (
        <MemberCard key={member.id} member={member} index={i} showYear={showYear} />
      ))}
    </div>
  )
}

/* ── Divider ─────────────────────────────────────────────── */
function Divider() {
  return (
    <div
      style={{
        height: "1px",
        background:
          "linear-gradient(90deg, transparent, rgba(246,65,36,0.20), transparent)",
        margin: "3.5rem 0",
      }}
    />
  )
}

/* ── Team Section ────────────────────────────────────────── */
const MAGIC_ACRONYM = [
  { letter: "M", word: "Mastermind" },
  { letter: "A", word: "Advocate" },
  { letter: "G", word: "Guide" },
  { letter: "I", word: "Influencer" },
  { letter: "C", word: "Communicator" },
]

const SCOPE_ACRONYM = [
  { letter: "S", word: "Strategist" },
  { letter: "C", word: "Caption" },
  { letter: "O", word: "Organiser" },
  { letter: "P", word: "Propagator" },
  { letter: "E", word: "Executer" },
]

export default function TeamSection() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      style={{
        background: "#0A0A0A",
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
          top: "10%",
          right: "-15%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(246,65,36,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* ── Section Header ──────────────────────────────── */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: "3.5rem" }}>
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
              Our People
            </span>
          </div>

          {/* Main heading */}
          <h2
            id="team-heading"
            style={{
              fontFamily: "Space Grotesk, Inter, sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "0.75rem",
            }}
          >
            Team
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.45)",
              maxWidth: "480px",
              lineHeight: 1.6,
            }}
          >
            The dedicated minds driving Sairam UiAutomistix Club forward.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════════════
            OFFICE BEARERS
        ══════════════════════════════════════════════════ */}
        <OfficeBearers />

        <Divider />

        {/* ══════════════════════════════════════════════════
            MAGIC
        ══════════════════════════════════════════════════ */}
        <GroupHeading title="MAGIC" acronymRows={MAGIC_ACRONYM} />

        {/* Existing */}
        <SubLabel label="Existing Members" accent />
        <MemberGrid members={magicExisting} showYear />

        {/* Prospective */}
        <SubLabel label="Prospective Members" />
        <MemberGrid members={magicProspective} showYear />

        <Divider />

        {/* ══════════════════════════════════════════════════
            SCOPE
        ══════════════════════════════════════════════════ */}
        <GroupHeading title="SCOPE" acronymRows={SCOPE_ACRONYM} />

        <MemberGrid members={scopeMembers} showYear={false} />
      </div>
    </section>
  )
}
