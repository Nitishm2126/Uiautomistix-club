/**
 * team.js — Sairam UiAutomistix Club
 *
 * Single source of truth for all Team section data.
 *
 * SCHEMA:
 * {
 *   id:          string        — unique identifier
 *   name:        string        — member's full name
 *   role:        string        — MAGIC/SCOPE role title
 *   year:        string        — e.g. "3rd Year"  (MAGIC only; omit for SCOPE)
 *   department:  string        — e.g. "AIDS"
 *   imageUrl:    string        — path relative to /public/
 * }
 *
 * HOW TO REPLACE TEMPORARY PHOTOS:
 *   1. Copy the official photo to: public/assets/team/magic/ or public/assets/team/scope/
 *      Example: public/assets/team/magic/divyashree.jpg
 *   2. Update the imageUrl field below.
 *      Example: imageUrl: "/assets/team/magic/divyashree.jpg"
 *   3. Save — no component code needs to change.
 *
 * HOW TO REPLACE SCOPE PLACEHOLDERS:
 *   When SCOPE member information is available, fill in the `name` and
 *   `department` fields below and add the photo path to `imageUrl`.
 *
 * FUTURE SUPABASE:
 *   When the Admin Dashboard is connected, these arrays will be replaced
 *   by a Supabase query. The Team component reads only these arrays —
 *   no component rewrite is needed to switch to dynamic data.
 */

/* ── MAGIC ACRONYM ──────────────────────────────────────────
   M — Mastermind
   A — Advocate
   G — Guide
   I — Influencer
   C — Communicator
   ────────────────────────────────────────────────────────── */
export const magicExisting = [
  {
    id: "me-1",
    name: "Divyasree D",
    role: "Mastermind",
    year: "III Year",
    department: "IT",
    imageUrl: "/assets/team/magic/divyashree.jpg",
  },
  {
    id: "me-2",
    name: "Rakshana Devi M",
    role: "Advocate",
    year: "III Year",
    department: "CSE",
    imageUrl: "/assets/team/magic/rakshana%20devi.jpg",
  },
  {
    id: "me-3",
    name: "Ezhil",
    role: "Guide",
    year: "3rd Year",
    department: "ECE",
    imageUrl: "/assets/team/magic/ezhil.jpg",
    linkedin: "https://www.linkedin.com/in/ezhil-m-517abb325/",
  },
  {
    id: "me-4",
    name: "Prathisha Narayanan",
    role: "Influencer",
    year: "3rd Year",
    department: "IT",
    imageUrl: "/assets/team/magic/prathisha.jpg",
    linkedin: "https://www.linkedin.com/in/prathisha-narayanan-s-788093315",
  },
  {
    id: "me-5",
    name: "Sharmila",
    role: "Communicator",
    year: "3rd Year",
    department: "AIML",
    imageUrl: "/assets/team/magic/sharmila.jpg",
    linkedin: "https://www.linkedin.com/in/sharmila-m-5662b933/",
  },
]

export const magicProspective = [
  {
    id: "mp-1",
    name: "Thanishka Yogesh",
    role: "Mastermind",
    year: "2nd Year",
    department: "CSE",
    imageUrl: "/assets/team/magic/thanishka.jpg",
    linkedin: "https://www.linkedin.com/in/thanishka-yogesh",
  },
  {
    id: "mp-2",
    name: "Shanjeev",
    role: "Advocate",
    year: "2nd Year",
    department: "IoT",
    imageUrl: "/assets/team/magic/shanjeev.jpg",
    linkedin: "https://www.linkedin.com/in/shanjeev-b-5a2bb4376",
  },
  {
    id: "mp-3",
    name: "Jayashree",
    role: "Guide",
    year: "2nd Year",
    department: "ECE",
    imageUrl: "/assets/team/magic/jayashree.jpg",
    linkedin: "https://www.linkedin.com/in/jayashree-s-a6057337a",
  },
  {
    id: "mp-4",
    name: "Jeevitha",
    role: "Influencer",
    year: "2nd Year",
    department: "CSE",
    imageUrl: "/assets/team/magic/jeevitha.jpg",
    linkedin: "https://www.linkedin.com/in/jeevi2212vijay",
  },
  {
    id: "mp-5",
    name: "Harini",
    role: "Communicator",
    year: "2nd Year",
    department: "IT",
    imageUrl: "/assets/team/magic/harini.jpg",
    linkedin: "https://www.linkedin.com/in/harini-sankar",
  },
]

/* ── SCOPE ACRONYM ──────────────────────────────────────────
   S — Strategist
   C — Caption
   O — Organiser
   P — Propagator
   E — Executer
   ────────────────────────────────────────────────────────── */
export const scopeMembers = [
  {
    id: "sc-1",
    name: "Dr. S. Bairavel",
    role: "Strategist",
    department: "Professor / IoT",
    imageUrl: "/assets/team/scope/bairavel.jpg"
  },
  {
    id: "sc-2",
    name: "Dr. S. Sankari",
    role: "Caption",
    department: "Professor / IT",
    imageUrl: "/assets/team/scope/sankari.jpg"
  },
  {
    id: "sc-3",
    name: "Ms. A. Rajalakshmi",
    role: "Organiser",
    department: "Assistant Professor / Cyber",
    imageUrl: "/assets/team/scope/rajalakshmi.jpg"
  },
  {
    id: "sc-4",
    name: "Mr. M. Gnana Prakash",
    role: "Propagator",
    department: "Assistant Professor / IT",
    imageUrl: "/assets/team/scope/gnanaprakash.jpg"
  },
  {
    id: "sc-5",
    name: "Ms. M. Meenakshi",
    role: "Executer",
    department: "Assistant Professor / CSE",
    imageUrl: "/assets/team/scope/meenakshi.jpg"
  }
]
