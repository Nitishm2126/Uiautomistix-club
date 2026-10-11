/**
 * adminData.js — Sairam UiAutomistix Club
 *
 * Centralized data and state interface for the Admin Dashboard.
 * Reuses existing public data modules from src/data/ and provides
 * clean getters, metrics, and mock activity feeds.
 *
 * Designed for frictionless replacement with Supabase queries in future phases.
 */

import { announcement } from '../../data/announcement.js'
import { activities } from '../../data/activities.js'
import { events } from '../../data/events.js'
import { magicExisting, magicProspective, scopeMembers } from '../../data/team.js'
import { membershipData } from '../../data/membership.js'
import contactData from '../../data/contact.js'

/**
 * Summary counts for Dashboard Home stat cards
 */
export function getDashboardSummary() {
  return {
    announcementsCount: announcement.isActive ? 1 : 0,
    eventsCount: activities.length + events.length,
    magicMembersCount: magicExisting.length + magicProspective.length,
    scopeMembersCount: scopeMembers.length,
  }
}

/**
 * Centralized mock activity feed (UI placeholder for Phase 14)
 */
export const recentActivities = [
  {
    id: 'act-1',
    title: 'MAGIC Prospective Team updated',
    category: 'Team',
    timestamp: '2 hours ago',
    type: 'edit',
  },
  {
    id: 'act-2',
    title: 'Activities list confirmed (2021–2025)',
    category: 'Events',
    timestamp: 'Yesterday',
    type: 'edit',
  },
  {
    id: 'act-4',
    title: 'Club contact information verified',
    category: 'Contact',
    timestamp: '4 days ago',
    type: 'edit',
  },
  {
    id: 'act-5',
    title: 'Announcement system initialized (Inactive)',
    category: 'Announcements',
    timestamp: '1 week ago',
    type: 'system',
  },
]

/**
 * Data getters for management views
 */
export function getAnnouncementsData() {
  return announcement
}

export function getActivitiesAndEventsData() {
  return {
    activities,
    events,
  }
}

export function getMagicTeamData() {
  return {
    existing: magicExisting,
    prospective: magicProspective,
  }
}

export function getScopeTeamData() {
  return scopeMembers
}

export function getJoinUsData() {
  return membershipData
}

export function getContactData() {
  return contactData
}
