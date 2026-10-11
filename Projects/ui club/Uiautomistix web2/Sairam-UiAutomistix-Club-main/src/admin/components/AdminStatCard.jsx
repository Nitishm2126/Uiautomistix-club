import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

/**
 * AdminStatCard
 *
 * Compact summary metric card for the dashboard home.
 *
 * Height target: ~148px
 * Structure:
 *   [Icon]                    [badge/arrow]
 *   28-32px number
 *   15px title
 *   12px description
 */
export default function AdminStatCard({
  title,
  count,
  label,
  icon: Icon,
  link,
  badge,
}) {
  const inner = (
    <div className="group relative rounded-2xl p-5 bg-[#141414] border border-white/8 hover:border-[#F64124]/35 transition-all duration-250 overflow-hidden cursor-pointer">
      {/* Subtle accent glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-[#F64124]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Top row: icon + badge/arrow */}
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-xl bg-[#F64124]/10 border border-[#F64124]/15 flex items-center justify-center text-[#F64124] flex-shrink-0 group-hover:scale-105 transition-transform">
          <Icon size={18} strokeWidth={1.8} />
        </div>

        {badge ? (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/6 border border-white/10 text-white/50">
            {badge}
          </span>
        ) : (
          <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-white/25 group-hover:text-[#F64124] group-hover:bg-[#F64124]/10 transition-colors">
            <ArrowUpRight size={13} />
          </div>
        )}
      </div>

      {/* Count */}
      <div
        className="font-extrabold text-white leading-none mb-1"
        style={{
          fontFamily: 'Space Grotesk, Inter, sans-serif',
          fontSize: 'clamp(1.75rem, 3vw, 2rem)',
        }}
      >
        {count}
      </div>

      {/* Title */}
      <div className="text-[14px] font-semibold text-white/80 leading-tight mb-0.5">
        {title}
      </div>

      {/* Description */}
      {label && (
        <p className="text-[12px] text-white/38 leading-tight truncate">{label}</p>
      )}
    </div>
  )

  if (link) {
    return (
      <Link to={link} className="block no-underline text-inherit">
        {inner}
      </Link>
    )
  }
  return inner
}
