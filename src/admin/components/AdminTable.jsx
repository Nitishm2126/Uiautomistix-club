export default function AdminTable({ headers = [], children, className = '' }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-white/8 bg-white/[0.02]">
            {headers.map((header, idx) => (
              <th
                key={idx}
                className="px-6 py-3.5 text-[11px] font-bold text-white/45 uppercase tracking-wider select-none"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/6 text-white/75">
          {children}
        </tbody>
      </table>
    </div>
  )
}
