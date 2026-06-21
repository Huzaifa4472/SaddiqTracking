import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAllRecords } from '../features/tracker/trackerSlice'
import {
  groupByWeek,
  overallPercentage,
  calcDailyScore,
  MAX_DAILY_SCORE,
  habitCompletionRates,
  aggregateCategoryScores,
} from '../utils/scoring'
import { CATEGORIES } from '../utils/habits'
import ComparisonBar from '../components/charts/ComparisonBar'
import TrendLine from '../components/charts/TrendLine'
import ProgressBar from '../components/common/ProgressBar'
import StatCard from '../components/dashboard/StatCard'

export default function WeeklyReport() {
  const records = useSelector(selectAllRecords)
  const weeks = useMemo(() => groupByWeek(records), [records])
  const [selectedKey, setSelectedKey] = useState(null)

  const selectedWeek = useMemo(() => {
    if (!weeks.length) return null
    return weeks.find((w) => w.key === selectedKey) || weeks[weeks.length - 1]
  }, [weeks, selectedKey])

  const trendData = useMemo(
    () => weeks.map((w) => ({ date: `W${w.week} '${String(w.year).slice(2)}`, pct: overallPercentage(w.records) })),
    [weeks]
  )

  if (!weeks.length) {
    return <div className="card text-center py-16">No data yet. Start tracking to generate weekly reports.</div>
  }

  const totalScore = selectedWeek.records.reduce((sum, r) => sum + calcDailyScore(r.habits), 0)
  const maxScore = selectedWeek.records.length * MAX_DAILY_SCORE
  const pct = maxScore ? Math.round((totalScore / maxScore) * 100) : 0
  const avgDaily = selectedWeek.records.length ? Math.round(totalScore / selectedWeek.records.length) : 0
  const rates = habitCompletionRates(selectedWeek.records)
  const best = rates[0]
  const worst = [...rates].sort((a, b) => a.pct - b.pct)[0]
  const categoryScores = aggregateCategoryScores(selectedWeek.records)

  const habitPctData = rates.slice(0, 10).map((h) => ({ label: h.label.slice(0, 14), pct: h.pct }))
  const categoryData = Object.keys(CATEGORIES).map((k) => ({ label: CATEGORIES[k].label.slice(0, 10), pct: categoryScores[k].pct }))

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">Weekly Report</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Week {selectedWeek.week}, {selectedWeek.year}
          </p>
        </div>
        <select
          className="input-field w-auto"
          value={selectedWeek.key}
          onChange={(e) => setSelectedKey(e.target.value)}
        >
          {weeks.map((w) => (
            <option key={w.key} value={w.key}>
              Week {w.week}, {w.year}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Score" value={totalScore} sub={`of ${maxScore} max`} accent="#0F5132" icon="Σ" />
        <StatCard title="Percentage" value={`${pct}%`} accent="#2E86AB" icon="%" />
        <StatCard title="Avg Daily Score" value={avgDaily} accent="#C9A227" icon="◷" />
        <StatCard title="Best Habit" value={best.label} sub={`${best.pct}%`} accent="#16A085" icon="★" />
      </div>

      <div className="card">
        <h3 className="font-bold mb-1">Weakest Habit This Week</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{worst.label}</p>
        <ProgressBar pct={worst.pct} color="#E11D48" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-bold mb-2">Weekly Score Trend</h3>
          <TrendLine data={trendData} color="#1E8449" />
        </div>
        <div className="card">
          <h3 className="font-bold mb-2">Category Breakdown</h3>
          <ComparisonBar data={categoryData} xKey="label" dataKey="pct" color="#8E44AD" />
        </div>
      </div>

      <div className="card">
        <h3 className="font-bold mb-2">Habit Completion Percentage (this week)</h3>
        <ComparisonBar data={habitPctData} xKey="label" dataKey="pct" color="#2E86AB" />
      </div>
    </div>
  )
}
