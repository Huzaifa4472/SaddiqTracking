import { calcDailyPercentage } from '../../utils/scoring'

export default function RecordHistoryTable({ records, onEdit, onDelete }) {
  if (!records.length) {
    return <p className="text-sm text-slate-500 dark:text-slate-400 py-4">No records match your filters.</p>
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
            <th className="py-2 pr-4">Date</th>
            <th className="py-2 pr-4">Score</th>
            <th className="py-2 pr-4">Notes</th>
            <th className="py-2 pr-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => {
            const pct = calcDailyPercentage(r.habits)
            return (
              <tr key={r.date} className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2 pr-4 font-medium">{r.date}</td>
                <td className="py-2 pr-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      pct >= 70
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                        : pct >= 40
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                    }`}
                  >
                    {pct}%
                  </span>
                </td>
                <td className="py-2 pr-4 max-w-xs truncate text-slate-500 dark:text-slate-400">
                  {r.notes || '—'}
                </td>
                <td className="py-2 pr-4 text-right space-x-2 whitespace-nowrap">
                  <button onClick={() => onEdit(r)} className="text-siddiq-blue dark:text-siddiq-blueLight font-medium">
                    Edit
                  </button>
                  <button onClick={() => onDelete(r)} className="text-rose-500 font-medium">
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
