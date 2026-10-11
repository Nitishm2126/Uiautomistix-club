/**
 * contactService.js — Sairam UiAutomistix Club
 *
 * Service layer for the `contact` table.
 *
 * PHASE 15: Architecture scaffold only.
 *   Functions are defined but NOT connected to any UI component.
 *   The public website continues to use local static data.
 *
 * PHASE 17+: Import and call these functions in the public
 *   website Contact section to replace static data.
 *
 * PHASE 16: Admin write functions (insert/update/delete) will
 *   be added after authentication is implemented.
 *
 * RLS NOTE:
 *   The anon role may SELECT contact information.
 *   Admin operations require an authenticated session (Phase 16).
 */

import { supabase } from '../lib/supabase'

/**
 * Fetch the contact information.
 * Since this is a single-record table, it gets the first record.
 *
 * @returns {{ data: object|null, error: object|null }}
 *
 * @example
 *   const { data: contactInfo, error } = await getContactInfo()
 */
export async function getContactInfo() {
  const { data, error } = await supabase
    .from('contact')
    .select('*')
    .limit(1)
    .maybeSingle()

  return { data, error }
}

/**
 * Update contact information.
 */
export async function updateContactInfo(info) {
  const { data: existing, error: fetchError } = await getContactInfo()
  
  if (fetchError) return { error: fetchError }
  
  if (existing) {
    const { data, error } = await supabase
      .from('contact')
      .update(info)
      .eq('id', existing.id)
      .select()
      .maybeSingle()
    return { data, error }
  } else {
     const { data, error } = await supabase
       .from('contact')
       .insert([info])
       .select()
       .maybeSingle()
     return { data, error }
  }
}
