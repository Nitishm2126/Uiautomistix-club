/**
 * galleryService.js — Sairam UiAutomistix Club
 *
 * Service layer for the `gallery` table.
 *
 * PHASE 15: Architecture scaffold only.
 *   Functions are defined but NOT connected to any UI component.
 *   The public website continues to use local static data.
 *
 * PHASE 17+: Import and call these functions in the public
 *   website Gallery section to replace static data.
 *
 * PHASE 16: Admin write functions (insert/update/delete) will
 *   be added after authentication is implemented.
 *
 * RLS NOTE:
 *   The anon role may SELECT all gallery records.
 *   Admin operations require an authenticated session (Phase 16).
 */

import { supabase } from '../lib/supabase'

/**
 * Fetch all gallery images ordered by display_order ascending.
 *
 * @returns {{ data: object[]|null, error: object|null }}
 *
 * @example
 *   const { data: images, error } = await getAllGalleryImages()
 */
export async function getAllGalleryImages() {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true })

  return { data, error }
}

/**
 * Fetch a single gallery record by its UUID.
 *
 * @param {string} id — UUID of the gallery record
 * @returns {{ data: object|null, error: object|null }}
 */
export async function getGalleryImageById(id) {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  return { data, error }
}

/**
 * Create a new gallery image.
 */
export async function createGalleryImage(image) {
  const { data, error } = await supabase
    .from('gallery')
    .insert([image])
    .select()
    .maybeSingle()
  return { data, error }
}

/**
 * Update a gallery image.
 */
export async function updateGalleryImage(id, image) {
  const { data, error } = await supabase
    .from('gallery')
    .update(image)
    .eq('id', id)
    .select()
    .maybeSingle()
  return { data, error }
}

/**
 * Delete a gallery image.
 */
export async function deleteGalleryImage(id) {
  const { error } = await supabase
    .from('gallery')
    .delete()
    .eq('id', id)
  return { error }
}
