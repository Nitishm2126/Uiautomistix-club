/**
 * announcement.js — Sairam UiAutomistix Club
 *
 * Single source of truth for the current announcement.
 *
 * HOW TO USE:
 *   - Set `isActive: true` when an event is upcoming.
 *   - Fill in all fields and set `posterUrl` to the image path.
 *   - Set `isActive: false` (or leave as-is) when there is no announcement.
 *
 * FUTURE (Supabase):
 *   This static export will be replaced by a Supabase query.
 *   The shape of the object is already compatible — the Announcement
 *   component only reads these fields; the source can be swapped freely.
 *
 * FIELDS:
 *   id              — unique identifier (string)
 *   title           — event name shown as the card heading
 *   posterUrl       — path to event poster image (public/assets/events/...)
 *   date            — formatted date string, e.g. "Saturday, 14 September 2024"
 *   time            — formatted time string, e.g. "10:00 AM – 1:00 PM"
 *   venue           — location string, e.g. "Seminar Hall 1, Block A"
 *   description     — 1–3 sentence summary of the event
 *   registrationUrl — full Google Form URL; empty string = no register button
 *   isActive        — true: show announcement · false: show empty state
 */
export const announcement = {
  id: '',
  title: '',
  posterUrl: '',
  date: '',
  time: '',
  venue: '',
  description: '',
  registrationUrl: '',
  isActive: false,
}
