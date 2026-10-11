/**
 * authService.js — Sairam UiAutomistix Club
 *
 * Service layer for Supabase Authentication.
 */

import { supabase } from '../lib/supabase'

/**
 * Sign in with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {{ data: object|null, error: object|null }}
 */
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

/**
 * Sign out the current user.
 * @returns {{ error: object|null }}
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

/**
 * Get the current session (useful for initial load).
 * @returns {{ data: object|null, error: object|null }}
 */
export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession()
  return { data, error }
}

/**
 * Listen for auth state changes (login, logout, token refresh).
 * @param {function} callback
 * @returns {{ data: { subscription: { unsubscribe: function } } }}
 */
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback)
}
