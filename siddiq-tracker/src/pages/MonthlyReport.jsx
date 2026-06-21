import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAllRecords } from '../features/tracker/trackerSlice'
import {
  groupByMonth,
  overallPercentage,
  calcDailyScore,
  MAX_DAILY_SCORE,
  habitCompletionRates,
  aggregateCategoryScores,
  MONTH_NAMES,
} from '../utils/scoring'
import { CATEGORIES } from '../utils/habits'
import ComparisonBar from '../components/charts/ComparisonBar'
import TrendLine from '../components/charts/TrendLine'
import StatCard from '../components/dashboard/StatCard'

export default function MonthlyReport() {
  const records = useSelector(selectAllRecords)
  const months = useMemo(() => groupByMonth(records), [records])
  const [selectedKey, setSelectedKey] = useState(null)

  const selectedMonth = useMemo(() => {
    if (!months.length) return null
    return months.find((m) => m.key === selectedKey) || months[months.length - 1]
  }, [months, selectedKey])

  const monthPctSeries = useMemo(
    () => months.map((m) => ({ pct: overallPercentage(m.records), key: m.key, label: `${MONTH_NAMES[m.month].slice(0, 3)} '${String(m.year).slice(2)}` })),
    [months]
  )

  if (!months.length) {
    return <div className="card text-center py-16">No data yet. Start tracking to generate monthly reports.</div>
  }

  const totalScore = selectedMonth.records.reduce((sum, r) => sum + calcDailyScore(r.habits), 0)
  const maxScore = selectedMonth.records.length * MAX_DAILY_SCORE
  const pct = maxScore ? Math.round((totalScore / maxScore) * 100) : 0
  const rates = habitCompletionRates(selectedMonth.records)
  const mostConsistent = rates[0]
  const weakest = [...rates].sort((a, b) => a.pct - b.pct)[0]
  const categoryScores = aggregateCategoryScores(selectedMonth.records)

  const bestMonth = [...monthPctSeries].sort((a, b) => b.pct - a.pct)[0]
  const worstMonth = [...monthPctSeries].sort((a, b) => a.pct - b.pct)[0]

  const trendData = monthPctSeries.map((m) => ({ date: m.label, pct: m.pct }))
  const categoryData = Object.keys(CATEGORIES).map((k) => ({
    label: CATEGORIES[k].label.slice(0, 10),
    pct: categoryScores[k].pct,
  }))
  const consistencyData = rates.slice(0, 10).map((h) => ({ label: h.label.slice(0, 14), pct: h.pct }))

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">Monthly Report</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {MONTH_NAMES[selectedMonth.month]} {selectedMonth.year}
          </p>
        </div>
        <select className="input-field w-auto" value={selectedMonth.key} onChange={(e) => setSelectedKey(e.target.value)}>
          {months.map((m) => (
            <option key={m.key} value={m.key}>
              {MONTH_NAMES[m.month]} {m.year}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Score" value={totalScore} sub={`of ${maxScore} max`} accent="#0F5132" icon="Σ" />
        <StatCard title="Percentage" value={`${pct}%`} accent="#2E86AB" icon="%" />
        <StatCard title="Best Month" value={bestMonth.label} sub={`${bestMonth.pct}%`} accent="#16A085" icon="★" />
        <StatCard title="Worst Month" value={worstMonth.label} sub={`${worstMonth.pct}%`} accent="#E11D48" icon="⚠" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-bold mb-1">Most Consistent Habit</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{mostConsistent.label} — {mostConsistent.pct}%</p>
        </div>
        <div className="card">
          <h3 className="font-bold mb-1">Weakest Habit</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{weakest.label} — {weakest.pct}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-bold mb-2">Monthly Progress</h3>
          <TrendLine data={trendData} color="#1B4965" />
        </div>
        <div className="card">
          <h3 className="font-bold mb-2">Category Comparison</h3>
          <ComparisonBar data={categoryData} xKey="label" dataKey="pct" color="#8E44AD" />
        </div>
      </div>

      <div className="card">
        <h3 className="font-bold mb-2">Habit Performance / Consistency</h3>
        <ComparisonBar data={consistencyData} xKey="label" dataKey="pct" color="#C9A227" />
      </div>
    </div>
  )
}
