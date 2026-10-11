/**
 * announcementsService.js — Sairam UiAutomistix Club
 *
 * Service layer for the `announcements` table.
 *
 * PHASE 15: Architecture scaffold only.
 *   Functions are defined but NOT connected to any UI component.
 *   The public website continues to use local static data.
 *
 * PHASE 17+: Import and call these functions in the public
 *   website Announcement component to replace static data.
 *
 * PHASE 16: Admin write functions (insert/update/delete) will
 *   be added after authentication is implemented.
 *
 * RLS NOTE:
 *   The anon role may only SELECT where is_active = true.
 *   Admin operations require an authenticated session (Phase 16).
 */

import { supabase } from '../lib/supabase'

/**
 * Fetch the current active announcement (if any).
 *
 * @returns {{ data: object|null, error: object|null }}
 *   data  — the active announcement row, or null if none exists
 *   error — Supabase error object, or null on success
 *
 * @example
 *   const { data, error } = await getActiveAnnouncement()
 *   if (data) {
 *     // show announcement banner
 *   }
 */
export async function getActiveAnnouncement() {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .eq('is_active', true)
    .maybeSingle()

  return { data, error }
}

/**
 * Upsert an announcement (authenticated admins only).
 * @param {object} announcement
 * @returns {{ data: object|null, error: object|null }}
 */
export async function upsertAnnouncement(announcement) {
  const { data, error } = await supabase
    .from('announcements')
    .upsert(announcement)
    .select()
    .maybeSingle()

  return { data, error }
}
