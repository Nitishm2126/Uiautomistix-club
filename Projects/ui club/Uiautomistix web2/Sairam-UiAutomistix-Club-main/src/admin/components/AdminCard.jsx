/**
 * AdminCard
 *
 * The single shared card container for all admin pages.
 * Consistent: border-radius 16px, border white/8, bg #141414, shadow-sm.
 *
 * Props:
 *   title     - card heading (optional)
 *   subtitle  - card subtitle (optional)
 *   action    - right-side action slot (optional)
 *   noPadding - skip body padding for tables/grids that need edge-to-edge
 *   className - extra classes
 */
export default function AdminCard({
  children,
  title,
  subtitle,
  action,
  noPadding = false,
  className = '',
}) {
  return (
    <div
      className={`rounded-2xl bg-[#141414] border border-white/8 shadow-sm overflow-hidden ${className}`}
    >
      {/* Card header */}
      {(title || action) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-white/6">
          <div className="min-w-0">
            {title && (
              <h3
                className="font-bold text-white tracking-tight truncate"
                style={{
                  fontFamily: 'Space Grotesk, Inter, sans-serif',
                  fontSize: '0.9375rem',
                  lineHeight: 1.3,
                }}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-[12px] text-white/40 mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}

      {/* Card body */}
      <div className={noPadding ? '' : 'p-5'}>{children}</div>
    </div>
  )
}
