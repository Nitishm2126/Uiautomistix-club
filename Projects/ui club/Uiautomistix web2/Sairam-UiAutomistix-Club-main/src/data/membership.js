/**
 * membership.js — Sairam UiAutomistix Club
 *
 * Single source of truth for the Join Us section.
 *
 * ── HOW TO UPDATE ──────────────────────────────────────────────────────────
 *
 *  REGISTRATION URL
 *    When the official Google Form is ready, paste its URL into `registrationUrl`.
 *    Example:
 *      registrationUrl: "https://forms.gle/your-form-id"
 *    If the string is empty (""), the section shows "Registration form will be
 *    available soon." instead of a broken button.
 *
 *  ELIGIBILITY
 *    Replace the `eligibility` string with the official policy text.
 *
 *  BENEFITS
 *    Add, remove, or edit objects in the `benefits` array.
 *    `icon` must match a Lucide React component name (see JoinUs.jsx for imports).
 *
 *  STEPS
 *    Add, remove, or reorder objects in the `steps` array.
 *
 * ── FUTURE SUPABASE ────────────────────────────────────────────────────────
 *   When the Admin Dashboard is ready, replace this static export with a
 *   Supabase fetch. The JoinUs component reads only `membershipData` —
 *   no component rewrite is needed to switch to dynamic data.
 * ──────────────────────────────────────────────────────────────────────────
 */

export const membershipData = {
  /**
   * Main section text — edit freely.
   */
  heading: "JOIN US",
  subtext:
    "Be part of Sairam UiAutomistix Club and explore the world of automation.",

  /**
   * ELIGIBILITY
   * Temporary/proxy content — replace with official eligibility policy when available.
   */
  eligibility:
    "Open to all students of Sri Sairam Engineering College who are passionate about automation, RPA, UiPath, robotics, technology, innovation, and problem-solving. No prior experience is required — just curiosity and a drive to learn.",

  /**
   * BENEFITS
   * Temporary/proxy benefits — update with official membership perks when confirmed.
   * `icon` values must correspond to imported Lucide React icons in JoinUs.jsx.
   */
  benefits: [
    {
      id: "benefit-1",
      icon: "Cpu",
      title: "Hands-On Automation",
      description:
        "Get practical exposure to automation technologies including RPA, UiPath, and intelligent process automation."
    },
    {
      id: "benefit-2",
      icon: "BookOpen",
      title: "Workshops & Training",
      description:
        "Attend skill-building workshops, bootcamps, and training sessions conducted by experienced members and industry professionals."
    },
    {
      id: "benefit-3",
      icon: "Layers",
      title: "Project Experience",
      description:
        "Collaborate on real-world automation projects, build your portfolio, and apply your knowledge in meaningful ways."
    },
    {
      id: "benefit-4",
      icon: "Users",
      title: "Team & Community",
      description:
        "Work alongside like-minded peers, build lasting connections, and grow as part of a vibrant technology community."
    },
    {
      id: "benefit-5",
      icon: "TrendingUp",
      title: "Leadership Growth",
      description:
        "Develop leadership, communication, and organizational skills through active roles within MAGIC and SCOPE frameworks."
    },
    {
      id: "benefit-6",
      icon: "Trophy",
      title: "Events & Competitions",
      description:
        "Represent the club in inter-college competitions, hackathons, idea pitches, and technical events."
    }
  ],

  /**
   * HOW TO JOIN — step-by-step process
   * Temporary/proxy steps — update with the official joining process when available.
   */
  steps: [
    {
      id: "step-1",
      icon: "Info",
      title: "Explore the Club",
      description:
        "Learn about Sairam UiAutomistix Club, our activities, events, and what we do through this website."
    },
    {
      id: "step-2",
      icon: "FileText",
      title: "Fill the Registration Form",
      description:
        "Complete the official membership registration form with your name, department, year, and contact details."
    },
    {
      id: "step-3",
      icon: "Send",
      title: "Submit Your Details",
      description:
        "Review and submit the registration form. Ensure all information is accurate before submitting."
    },
    {
      id: "step-4",
      icon: "Mail",
      title: "Await Club Communication",
      description:
        "The club will reach out with further instructions, orientation details, and onboarding information."
    }
  ],

  /**
   * CTA
   */
  ctaHeading: "Ready to explore automation?",
  ctaSubtext:
    "Join a community of innovators shaping the future through automation and technology.",

  /**
   * REGISTRATION FORM URL
   * Leave as "" to show "Registration form will be available soon."
   * Replace with the actual Google Form URL when provided:
   *   registrationUrl: "https://forms.gle/your-form-id"
   */
  registrationUrl: ""
}
