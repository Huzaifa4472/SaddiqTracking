export default function StatCard({ title, value, sub, accent = '#1E8449', icon }) {
  return (
    <div className="card flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white shrink-0"
        style={{ background: accent }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 font-medium">
          {title}
        </div>
        <div className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 truncate">{value}</div>
        {sub && <div className="text-xs text-slate-400 dark:text-slate-500">{sub}</div>}
      </div>
    </div>
  )
}
