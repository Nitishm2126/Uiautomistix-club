/**
 * supabase.js — Sairam UiAutomistix Club
 *
 * Central Supabase client. Import this wherever a database or storage
 * operation is needed. Do NOT create additional Supabase client instances.
 *
 * SECURITY:
 *   - Only the public anon key is used here — safe for frontend code.
 *   - The service role key must NEVER appear in this file or any frontend file.
 *   - Credentials are read from environment variables (.env.local).
 *
 * USAGE:
 *   import { supabase } from '../lib/supabase'
 *   const { data, error } = await supabase.from('events').select('*')
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Warn during development if environment variables are missing.
  // The app will still render from local static data during Phase 15.
  console.warn(
    '[Supabase] Missing environment variables.\n' +
    'Create .env.local with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.\n' +
    'The public website continues to work with local static data.'
  )
}

/**
 * Single shared Supabase client instance.
 * Uses the public anon key — Row Level Security controls all data access.
 */
export const supabase = createClient(
  supabaseUrl ?? '',
  supabaseAnonKey ?? ''
)
