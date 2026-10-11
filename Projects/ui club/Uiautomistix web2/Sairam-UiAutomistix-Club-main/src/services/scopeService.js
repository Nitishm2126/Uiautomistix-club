/**
 * scopeService.js — Sairam UiAutomistix Club
 *
 * Service layer for the `scope_members` table.
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
 *   The anon role may SELECT all scope members records.
 *   Admin operations require an authenticated session (Phase 16).
 */

import { supabase } from '../lib/supabase'

/**
 * Fetch all SCOPE members ordered by display_order ascending.
 *
 * @returns {{ data: object[]|null, error: object|null }}
 *
 * @example
 *   const { data: members, error } = await getAllScopeMembers()
 */
export async function getAllScopeMembers() {
  const { data, error } = await supabase
    .from('scope_members')
    .select('*')
    .order('display_order', { ascending: true })

  return { data, error }
}

/**
 * Fetch a single SCOPE member by its UUID.
 *
 * @param {string} id — UUID of the SCOPE member
 * @returns {{ data: object|null, error: object|null }}
 */
export async function getScopeMemberById(id) {
  const { data, error } = await supabase
    .from('scope_members')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  return { data, error }
}

/**
 * Update a SCOPE member.
 */
export async function updateScopeMember(id, member) {
  const { data, error } = await supabase
    .from('scope_members')
    .update(member)
    .eq('id', id)
    .select()
    .maybeSingle()
  return { data, error }
}
