export default function AdminFormField({
  label,
  helper,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  rows = 3,
  options = [],
  className = '',
}) {
  const inputStyles =
    'w-full bg-black/40 border border-white/10 focus:border-[#F64124] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider">
          {label} {required && <span className="text-[#F64124]">*</span>}
        </label>
      )}

      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={rows}
          className={`${inputStyles} resize-y`}
        />
      ) : type === 'select' ? (
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={inputStyles}
        >
          {options.map((opt) => (
            <option
              key={typeof opt === 'string' ? opt : opt.value}
              value={typeof opt === 'string' ? opt : opt.value}
              className="bg-[#141414] text-white"
            >
              {typeof opt === 'string' ? opt : opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={inputStyles}
        />
      )}

      {helper && <p className="text-[11px] text-white/40">{helper}</p>}
    </div>
  )
}
