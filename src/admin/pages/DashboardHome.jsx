import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Megaphone,
  Calendar,
  Users,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Clock,
  ExternalLink,
  ShieldAlert,
  Zap
} from 'lucide-react'
import AdminPageHeader from '../components/AdminPageHeader'
import AdminStatCard from '../components/AdminStatCard'
import AdminCard from '../components/AdminCard'
import AdminActionButton from '../components/AdminActionButton'
import { getDashboardSummary, recentActivities } from '../data/adminData'
import { getActiveAnnouncement } from '../../services/announcementsService'

const QUICK_ACTIONS = [
  {
    label: 'Broadcast Announcement',
    link: '/admin/announcements',
    icon: Megaphone,
    desc: 'Manage banner alerts & registration links',
  },
  {
    label: 'Add Event / Activity',
    link: '/admin/events',
    icon: Calendar,
    desc: 'Catalog workshops, hackathons & milestones',
  },
  {
    label: 'MAGIC Team Roster',
    link: '/admin/team/magic',
    icon: Users,
    desc: 'Update 3rd Year & 2nd Year members',
  },
  {
    label: 'SCOPE Framework',
    link: '/admin/team/scope',
    icon: ShieldCheck,
    desc: 'Configure core lead designations',
  },
]

export default function DashboardHome() {
  const [summary, setSummary] = useState(getDashboardSummary())
  const [activeAnnouncement, setActiveAnnouncement] = useState(null)

  useEffect(() => {
    async function loadData() {
      const { data } = await getActiveAnnouncement()
      if (data) {
        setActiveAnnouncement(data)
        setSummary((prev) => ({
          ...prev,
          announcementsCount: data.is_active ? 1 : 0,
        }))
      }
    }
    loadData()
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className="space-y-8">
      {/* Welcome Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#161616] via-[#141414] to-[#1C1210] border border-white/10 p-6 sm:p-8 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-[#F64124]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F64124]/10 border border-[#F64124]/20 text-xs font-semibold text-[#F64124]">
              <Zap size={13} />
              <span>Sairam UiAutomistix Club Operations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {getGreeting()}, <span className="text-[#F64124]">Club Executive</span>
            </h1>
            <p className="text-sm text-white/60 leading-relaxed">
              Welcome to the central content management dashboard. Control announcements, events, team structures, and membership portals in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <Link to="/admin/announcements">
              <AdminActionButton
                label="New Broadcast"
                icon="plus"
                variant="primary"
                size="md"
              />
            </Link>
            <Link to="/" target="_blank" rel="noopener noreferrer">
              <AdminActionButton
                label="Live Site"
                icon="external"
                variant="secondary"
                size="md"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Stat Cards Grid ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          title="Announcements"
          count={summary.announcementsCount}
          label={summary.announcementsCount > 0 ? 'Live banner broadcast' : 'No active broadcast'}
          icon={Megaphone}
          link="/admin/announcements"
          badge={summary.announcementsCount > 0 ? 'Live' : 'Inactive'}
        />
        <AdminStatCard
          title="Activities & Events"
          count={summary.eventsCount}
          label="Catalogued milestones"
          icon={Calendar}
          link="/admin/events"
        />
        <AdminStatCard
          title="MAGIC Members"
          count={summary.magicMembersCount}
          label="3rd Year & 2nd Year Team"
          icon={Users}
          link="/admin/team/magic"
        />
        <AdminStatCard
          title="SCOPE Roles"
          count={summary.scopeMembersCount}
          label="Core leadership leads"
          icon={ShieldCheck}
          link="/admin/team/scope"
        />
      </div>

      {/* Active Announcement Preview Alert (if active) */}
      {activeAnnouncement && activeAnnouncement.is_active && (
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Megaphone size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Live Website Announcement</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h4 className="text-sm font-bold text-white mt-0.5">{activeAnnouncement.title}</h4>
            </div>
          </div>
          <Link to="/admin/announcements" className="no-underline">
            <AdminActionButton label="Manage Broadcast" variant="secondary" size="sm" />
          </Link>
        </div>
      )}

      {/* ── Lower 2-Column Grid ───────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Quick Actions (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles size={18} className="text-[#F64124]" />
              Quick Action Shortcuts
            </h2>
            <span className="text-xs text-white/40">Frequent management tasks</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon
              return (
                <Link
                  key={action.link}
                  to={action.link}
                  className="group flex flex-col justify-between rounded-2xl bg-[#141414] hover:bg-[#181818] border border-white/8 hover:border-[#F64124]/40 p-4 transition-all duration-200 no-underline shadow-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:text-[#F64124] group-hover:bg-[#F64124]/10 group-hover:border-[#F64124]/20 transition-all flex-shrink-0">
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-white/20 group-hover:text-[#F64124] group-hover:translate-x-1 transition-all"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-white group-hover:text-[#F64124] transition-colors text-sm mb-1">
                      {action.label}
                    </div>
                    <p className="text-white/40 text-xs leading-relaxed">
                      {action.desc}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Activity Feed (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock size={18} className="text-[#F64124]" />
              Activity Audit Log
            </h2>
            <span className="text-xs text-white/40">Recent updates</span>
          </div>

          <AdminCard noPadding>
            <ul className="divide-y divide-white/6">
              {recentActivities.map((act) => (
                <li
                  key={act.id}
                  className="flex items-start gap-3 p-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#F64124]/10 border border-[#F64124]/20 flex items-center justify-center text-[#F64124] flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white/90 text-xs truncate leading-snug">
                      {act.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] uppercase font-bold text-white/40 tracking-wider">
                        {act.category}
                      </span>
                      <span className="text-white/20 text-[10px]">·</span>
                      <span className="text-white/40 text-[11px]">
                        {act.timestamp}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </AdminCard>
        </div>
      </div>
    </div>
  )
}
