/**
 * joinUsService.js — Sairam UiAutomistix Club
 *
 * Service layer for the `join_us` table.
 *
 * PHASE 15: Architecture scaffold only.
 *   Functions are defined but NOT connected to any UI component.
 *   The public website continues to use local static data.
 *
 * PHASE 17+: Import and call these functions in the public
 *   website Join Us section to replace static data.
 *
 * PHASE 16: Admin write functions (insert/update/delete) will
 *   be added after authentication is implemented.
 *
 * RLS NOTE:
 *   The anon role may SELECT join us content.
 *   Admin operations require an authenticated session (Phase 16).
 */

import { supabase } from '../lib/supabase'

/**
 * Fetch the Join Us section content.
 * Since this is a single-record table, it gets the first record.
 *
 * @returns {{ data: object|null, error: object|null }}
 *
 * @example
 *   const { data: joinUsContent, error } = await getJoinUsContent()
 */
export async function getJoinUsContent() {
  const { data, error } = await supabase
    .from('join_us')
    .select('*')
    .limit(1)
    .maybeSingle()

  return { data, error }
}

/**
 * Update the Join Us section content.
 */
export async function updateJoinUsContent(content) {
  // Since it's a single record, we can fetch it first to get the ID, or just update all records (there should only be 1)
  const { data: existing, error: fetchError } = await getJoinUsContent()
  
  if (fetchError) return { error: fetchError }
  
  if (existing) {
    const { data, error } = await supabase
      .from('join_us')
      .update(content)
      .eq('id', existing.id)
      .select()
      .maybeSingle()
    return { data, error }
  } else {
     // If no record exists yet, insert it
     const { data, error } = await supabase
       .from('join_us')
       .insert([content])
       .select()
       .maybeSingle()
     return { data, error }
  }
}
