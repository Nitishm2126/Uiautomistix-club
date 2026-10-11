import { Inbox } from 'lucide-react'

export default function AdminEmptyState({
  icon: Icon = Inbox,
  title = 'No items to display',
  description = 'There is currently no data recorded for this section.',
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-[#141414] border border-dashed border-white/10 max-w-lg mx-auto my-6">
      <div className="w-14 h-14 rounded-2xl bg-[#F64124]/10 border border-[#F64124]/20 flex items-center justify-center text-[#F64124] mb-4">
        <Icon size={26} strokeWidth={1.6} />
      </div>

      <h3
        style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
        className="text-base sm:text-lg font-bold text-white mb-1.5"
      >
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-white/45 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      {action && <div>{action}</div>}
    </div>
  )
}
