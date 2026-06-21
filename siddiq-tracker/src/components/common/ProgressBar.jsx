export default function ProgressBar({ pct = 0, color = '#1E8449', height = 10, label }) {
  const clamped = Math.max(0, Math.min(100, pct))
  return (
    <div>
      {label && (
        <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div
        className="w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden"
        style={{ height }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${clamped}%`, background: color }}
        />
      </div>
    </div>
  )
}
