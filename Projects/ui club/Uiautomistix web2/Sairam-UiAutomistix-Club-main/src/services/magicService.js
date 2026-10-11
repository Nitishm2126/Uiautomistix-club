/**
 * magicService.js — Sairam UiAutomistix Club
 *
 * Service layer for the `magic_members` table.
 *
 * PHASE 15: Architecture scaffold only.
 *   Functions are defined but NOT connected to any UI component.
 *   The public website continues to use local static data.
 *
 * PHASE 17+: Import and call these functions in the public
 *   website Team section to replace static data.
 *
 * PHASE 16: Admin write functions (insert/update/delete) will
 *   be added after authentication is implemented.
 *
 * RLS NOTE:
 *   The anon role may SELECT all magic members records.
 *   Admin operations require an authenticated session (Phase 16).
 */

import { supabase } from '../lib/supabase'

/**
 * Fetch all MAGIC members ordered by display_order ascending.
 *
 * @returns {{ data: object[]|null, error: object|null }}
 *
 * @example
 *   const { data: members, error } = await getAllMagicMembers()
 */
export async function getAllMagicMembers() {
  const { data, error } = await supabase
    .from('magic_members')
    .select('*')
    .order('display_order', { ascending: true })

  return { data, error }
}

/**
 * Fetch a single MAGIC member by its UUID.
 *
 * @param {string} id — UUID of the MAGIC member
 * @returns {{ data: object|null, error: object|null }}
 */
export async function getMagicMemberById(id) {
  const { data, error } = await supabase
    .from('magic_members')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  return { data, error }
}

/**
 * Create a new MAGIC member.
 */
export async function createMagicMember(member) {
  const { data, error } = await supabase
    .from('magic_members')
    .insert([member])
    .select()
    .maybeSingle()
  return { data, error }
}

/**
 * Update a MAGIC member.
 */
export async function updateMagicMember(id, member) {
  const { data, error } = await supabase
    .from('magic_members')
    .update(member)
    .eq('id', id)
    .select()
    .maybeSingle()
  return { data, error }
}

/**
 * Delete a MAGIC member.
 */
export async function deleteMagicMember(id) {
  const { error } = await supabase
    .from('magic_members')
    .delete()
    .eq('id', id)
  return { error }
}
