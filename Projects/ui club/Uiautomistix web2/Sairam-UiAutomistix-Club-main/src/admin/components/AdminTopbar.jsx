import { Menu, Globe } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { ADMIN_NAV_LINKS } from './navLinks'

/**
 * AdminTopbar
 *
 * Shows ONLY:
 *   - Mobile hamburger (hidden on lg+)
 *   - Compact breadcrumb: "Admin / Page Name"  ← NOT a giant heading
 *   - Right side: status pill + public site link
 *
 * The actual page title lives in AdminPageHeader inside each page.
 */
export default function AdminTopbar({ onOpenSidebar }) {
  const location = useLocation()
  const currentNav = ADMIN_NAV_LINKS.find((link) => {
    if (link.end) return location.pathname === link.path
    return location.pathname.startsWith(link.path)
  })
  const currentLabel = currentNav ? currentNav.label : 'Portal'

  return (
    <header className="h-14 sticky top-0 z-50 bg-[#0A0A0A]/96 backdrop-blur-md border-b border-white/8 px-5 flex items-center justify-between flex-shrink-0">
      {/* Left: mobile toggle + breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button — hidden on desktop */}
        <button
          type="button"
          onClick={onOpenSidebar}
          className="lg:hidden w-8 h-8 rounded-lg bg-white/6 border border-white/10 text-white/70 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          aria-label="Open navigation"
        >
          <Menu size={16} />
        </button>

        {/* Breadcrumb — compact, no big heading */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-[12px] font-semibold tracking-wider uppercase">
            <li className="text-white/35">Admin</li>
            <li className="text-white/20">/</li>
            <li className="text-[#F64124]">{currentLabel}</li>
          </ol>
        </nav>
      </div>

      {/* Right: status + public site link */}
      <div className="flex items-center gap-2.5">
        {/* Live indicator */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Local UI
        </div>

        {/* Public website shortcut */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[12px] font-semibold text-white/70 hover:text-white transition-colors no-underline"
          title="Go to public website"
        >
          <Globe size={13} className="text-[#F64124]" />
          <span className="hidden md:inline">Public Site</span>
        </Link>
        
        {/* Logout Button */}
        <button
          onClick={async () => {
            const { signOut } = await import('../../services/authService')
            await signOut()
          }}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-[12px] font-semibold text-red-400 hover:text-red-300 transition-colors"
          title="Log out"
        >
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </header>
  )
}
