/**
 * eventsService.js — Sairam UiAutomistix Club
 *
 * Service layer for the `events` table.
 *
 * PHASE 15: Architecture scaffold only.
 *   Functions are defined but NOT connected to any UI component.
 *   The public website continues to use local static data.
 *
 * PHASE 17+: Import and call these functions in the public
 *   website Events section to replace static data.
 *
 * PHASE 16: Admin write functions (insert/update/delete) will
 *   be added after authentication is implemented.
 *
 * RLS NOTE:
 *   The anon role may SELECT all events records.
 *   Admin operations require an authenticated session (Phase 16).
 */

import { supabase } from '../lib/supabase'

/**
 * Fetch all events ordered by year descending (most recent first).
 *
 * @returns {{ data: object[]|null, error: object|null }}
 *
 * @example
 *   const { data: events, error } = await getAllEvents()
 */
export async function getAllEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('year', { ascending: false })
    .order('created_at', { ascending: false })

  return { data, error }
}

/**
 * Fetch a single event by its UUID.
 *
 * @param {string} id — UUID of the event
 * @returns {{ data: object|null, error: object|null }}
 */
export async function getEventById(id) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  return { data, error }
}

/**
 * Create a new event.
 */
export async function createEvent(event) {
  const { data, error } = await supabase
    .from('events')
    .insert([event])
    .select()
    .maybeSingle()
  return { data, error }
}

/**
 * Update an existing event.
 */
export async function updateEvent(id, event) {
  const { data, error } = await supabase
    .from('events')
    .update(event)
    .eq('id', id)
    .select()
    .maybeSingle()
  return { data, error }
}

/**
 * Delete an event.
 */
export async function deleteEvent(id) {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id)
  return { error }
}
