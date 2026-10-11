import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

/**
 * AdminPageHeader
 *
 * Consistent page-level header used by every admin page.
 *
 * Structure:
 *   [optional breadcrumb]
 *   Page Title                    [optional action button]
 *   Page subtitle
 *   ─────────────────────────────────────────────────────
 *
 * Typography:
 *   Title:    2rem  (32px) — clear, professional, not enormous
 *   Subtitle: 0.875rem (14px) — muted, readable
 */
export default function AdminPageHeader({
  title,
  subtitle,
  breadcrumb = [],
  action,
}) {
  return (
    <div className="pb-6 mb-6 border-b border-white/8">
      {/* Breadcrumb */}
      {breadcrumb.length > 0 && (
        <nav aria-label="Page breadcrumb" className="flex items-center gap-1 mb-3">
          {breadcrumb.map((crumb, idx) => (
            <span key={idx} className="flex items-center gap-1">
              {idx > 0 && (
                <ChevronRight size={12} className="text-white/20" />
              )}
              {crumb.link ? (
                <Link
                  to={crumb.link}
                  className="text-[12px] font-semibold text-white/40 hover:text-white/70 transition-colors no-underline"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[12px] font-semibold text-white/60">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Title row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1
            className="font-bold text-white tracking-tight"
            style={{
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="mt-1.5 text-white/50 leading-relaxed"
              style={{ fontSize: '0.875rem' }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {action && (
          <div className="flex-shrink-0 sm:mt-0.5">{action}</div>
        )}
      </div>
    </div>
  )
}
