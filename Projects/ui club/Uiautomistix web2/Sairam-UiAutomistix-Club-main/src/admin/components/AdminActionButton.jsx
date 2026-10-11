import { Plus, Edit2, Trash2, Eye, ExternalLink, Loader2 } from 'lucide-react'

export default function AdminActionButton({
  label,
  children,
  icon = 'plus',
  variant = 'primary', // 'primary' | 'secondary' | 'danger' | 'ghost' | 'icon'
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  size = 'md', // 'sm' | 'md'
}) {
  const icons = {
    plus: Plus,
    edit: Edit2,
    delete: Trash2,
    view: Eye,
    external: ExternalLink,
  }

  const IconComponent = typeof icon === 'string' ? icons[icon] : icon

  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none'

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    icon: 'p-2 text-xs rounded-lg',
  }

  const variantStyles = {
    primary:
      'bg-[#F64124] text-white hover:bg-[#d43010] shadow-md shadow-[#F64124]/20 active:scale-[0.98]',
    secondary:
      'bg-white/6 text-white hover:bg-white/10 border border-white/10 active:scale-[0.98]',
    danger:
      'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 active:scale-[0.98]',
    ghost: 'text-white/60 hover:text-white hover:bg-white/5',
    icon: 'text-white/60 hover:text-white hover:bg-white/8 border border-white/8',
  }

  const currentSize = variant === 'icon' ? sizeStyles.icon : sizeStyles[size] || sizeStyles.md
  const currentVariant = variantStyles[variant] || variantStyles.primary

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${currentSize} ${currentVariant} ${className}`}
    >
      {loading ? (
        <Loader2 size={size === 'sm' || variant === 'icon' ? 14 : 16} className="animate-spin flex-shrink-0" />
      ) : (
        IconComponent && (
          <IconComponent size={size === 'sm' || variant === 'icon' ? 14 : 16} strokeWidth={2} className="flex-shrink-0" />
        )
      )}
      {children || (label && <span>{label}</span>)}
    </button>
  )
}

