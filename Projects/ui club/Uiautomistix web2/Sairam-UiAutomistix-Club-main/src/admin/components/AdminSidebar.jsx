import { NavLink, Link } from 'react-router-dom'
import { ExternalLink, X, Cpu } from 'lucide-react'
import { ADMIN_NAV_LINKS } from './navLinks'

/**
 * AdminSidebar — Phase 14 final redesign
 *
 * Two elements:
 *   1. .admin-sidebar-desktop — in-flow sticky flex child (desktop only)
 *   2. Fixed mobile drawer    — slides in/out (mobile/tablet)
 *
 * Width: 260px. Typography: 13-14px nav items.
 * Active item: subtle orange-red bg + accent border.
 */
function SidebarContent({ onClose, isMobile }) {
  return (
    <>
      {/* Brand header */}
      <div
        className="px-5 flex items-center justify-between border-b border-white/8 flex-shrink-0"
        style={{ height: '56px' }}
      >
        <Link
          to="/admin"
          onClick={onClose}
          className="flex items-center gap-2.5 no-underline group min-w-0"
        >
          {/* Logo */}
          <div className="w-8 h-8 rounded-lg bg-white p-0.5 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm border border-white/20">
            <img
              src="/assets/logo/logo.png"
              alt="Sairam UiAutomistix Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                if (!e.currentTarget.dataset.fallbackTried) {
                  e.currentTarget.dataset.fallbackTried = 'true'
                  e.currentTarget.src = '/assets/logo/logo.jpg'
                } else {
                  e.currentTarget.style.display = 'none'
                  if (e.currentTarget.nextElementSibling) {
                    e.currentTarget.nextElementSibling.style.display = 'flex'
                  }
                }
              }}
            />
            <span className="hidden items-center justify-center bg-[#F64124] w-full h-full">
              <Cpu size={14} color="#fff" />
            </span>
          </div>

          {/* Brand name */}
          <div className="min-w-0 flex-1">
            <div
              className="font-bold text-white tracking-tight leading-tight truncate"
              style={{
                fontFamily: 'Space Grotesk, Inter, sans-serif',
                fontSize: '13px',
              }}
            >
              <span className="text-[#F64124]">Sairam</span> UiAutomistix
            </div>
            <div
              className="text-white/35 uppercase tracking-widest font-semibold"
              style={{ fontSize: '9px', lineHeight: 1 }}
            >
              Admin Panel
            </div>
          </div>
        </Link>

        {/* Mobile close button */}
        {isMobile && (
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white/5 border border-white/8 text-white/50 hover:text-white flex items-center justify-center cursor-pointer transition-colors flex-shrink-0 ml-2"
            aria-label="Close navigation"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Admin navigation">
        {/* Section label */}
        <div
          className="px-2 pb-2 text-white/30 uppercase font-bold tracking-widest select-none"
          style={{ fontSize: '9.5px' }}
        >
          Content
        </div>

        <ul className="space-y-0.5">
          {ADMIN_NAV_LINKS.map((link) => {
            const Icon = link.icon
            return (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-all duration-150 no-underline ${
                      isActive
                        ? 'bg-[#F64124]/10 text-[#F64124] border border-[#F64124]/25 font-semibold'
                        : 'text-white/55 hover:text-white hover:bg-white/5 border border-transparent'
                    }`
                  }
                  style={{ fontSize: '13.5px' }}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={15}
                        strokeWidth={isActive ? 2.2 : 1.8}
                        className={`flex-shrink-0 ${isActive ? 'text-[#F64124]' : 'text-white/40'}`}
                      />
                      <span className="truncate">{link.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-white/8 flex-shrink-0">
        <Link
          to="/"
          className="flex items-center justify-between px-2.5 py-2 rounded-xl text-white/50 hover:text-white bg-white/[0.03] hover:bg-white/6 border border-white/6 transition-colors no-underline group"
          style={{ fontSize: '12px', fontWeight: 600 }}
        >
          <span>View Public Website</span>
          <ExternalLink
            size={12}
            className="text-white/30 group-hover:text-white transition-colors flex-shrink-0"
          />
        </Link>
        <div className="pt-2 text-center">
          <span className="text-white/20 font-medium" style={{ fontSize: '10px' }}>
            UiAutomistix CMS · Phase 14
          </span>
        </div>
      </div>
    </>
  )
}

export default function AdminSidebar({ isOpen, onClose }) {
  return (
    <>
      {/* ── Desktop sidebar — in-flow sticky (lg+) ── */}
      <aside className="admin-sidebar-desktop">
        <SidebarContent onClose={() => {}} isMobile={false} />
      </aside>

      {/* ── Mobile backdrop ── */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[1010] lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile drawer — fixed, slides in ── */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-[1020] bg-[#0E0E0E] border-r border-white/8 flex flex-col transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '260px' }}
        aria-label="Mobile navigation"
      >
        <SidebarContent onClose={onClose} isMobile={true} />
      </aside>
    </>
  )
}
