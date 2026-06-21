import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectSortedRecords } from '../features/tracker/trackerSlice'
import {
  overallPercentage,
  calcStreaks,
  aggregateCategoryScores,
  topStrongestHabits,
  topWeakestHabits,
  calcDailyPercentage,
  groupByMonth,
  MONTH_NAMES,
} from '../utils/scoring'
import { CATEGORIES } from '../utils/habits'
import StatCard from '../components/dashboard/StatCard'
import ScoreGauge from '../components/charts/ScoreGauge'
import CategoryPie from '../components/charts/CategoryPie'
import TrendLine from '../components/charts/TrendLine'
import ComparisonBar from '../components/charts/ComparisonBar'
import HabitBarList from '../components/charts/HabitBarList'
import ProgressBar from '../components/common/ProgressBar'
import DailyAyahCard from '../components/inspiration/DailyAyahCard'
import { getDailyAyah } from '../data/ayahReflections'

export default function Dashboard() {
  const records = useSelector(selectSortedRecords)

  const overallPct = useMemo(() => overallPercentage(records), [records])
  const streaks = useMemo(() => calcStreaks(records), [records])
  const categoryScores = useMemo(() => aggregateCategoryScores(records), [records])
  const strongest = useMemo(() => topStrongestHabits(records, 5), [records])
  const weakest = useMemo(() => topWeakestHabits(records, 5), [records])

  const trendData = useMemo(
    () =>
      [...records]
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(-30)
        .map((r) => ({ date: r.date.slice(5), pct: calcDailyPercentage(r.habits) })),
    [records]
  )

  const monthlyComparison = useMemo(() => {
    const groups = groupByMonth(records)
    return groups.slice(-6).map((g) => ({
      label: `${MONTH_NAMES[g.month].slice(0, 3)} '${String(g.year).slice(2)}`,
      pct: overallPercentage(g.records),
    }))
  }, [records])

  const todayAyah = useMemo(() => getDailyAyah(), [])

  if (!records.length) {
    return (
      <div className="space-y-6">
        <DailyAyahCard ayah={todayAyah} />
        <div className="card text-center py-16">
          <h2 className="text-xl font-bold mb-2">No records yet</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Start by completing today's entry in the Daily Tracker to see your dashboard come alive.
          </p>
          <a href="/tracker" className="btn-primary inline-block">
            Go to Daily Tracker
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Your journey toward Siddiq, at a glance.</p>
      </div>

      <DailyAyahCard ayah={todayAyah} />

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Overall Siddiq Score" value={`${overallPct}%`} accent="#0F5132" icon="◧" />
        <StatCard title="Current Streak" value={`${streaks.current} days`} accent="#C9A227" icon="🔥" />
        <StatCard title="Longest Streak" value={`${streaks.longest} days`} accent="#1B4965" icon="🏆" />
        <StatCard title="Total Days Tracked" value={records.length} accent="#8E44AD" icon="📅" />
      </div>

      {/* Gauge + Category breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card flex flex-col items-center justify-center">
          <ScoreGauge pct={overallPct} />
        </div>
        <div className="card lg:col-span-2">
          <h3 className="font-bold mb-3">Category Scores</h3>
          <div className="space-y-3">
            {Object.keys(CATEGORIES).map((key) => (
              <ProgressBar
                key={key}
                label={CATEGORIES[key].label}
                pct={categoryScores[key]?.pct || 0}
                color={CATEGORIES[key].color}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Trend + Monthly comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-bold mb-2">Score Trend (last 30 entries)</h3>
          <TrendLine data={trendData} color="#1E8449" />
        </div>
        <div className="card">
          <h3 className="font-bold mb-2">Monthly Comparison</h3>
          <ComparisonBar data={monthlyComparison} xKey="label" dataKey="pct" color="#2E86AB" />
        </div>
      </div>

      {/* Category distribution + strongest/weakest */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card">
          <h3 className="font-bold mb-2">Category Distribution</h3>
          <CategoryPie categoryScores={categoryScores} />
        </div>
        <div className="card">
          <h3 className="font-bold mb-3">Top 5 Strongest Habits</h3>
          <HabitBarList habits={strongest} />
        </div>
        <div className="card">
          <h3 className="font-bold mb-3">Top 5 Weakest Habits</h3>
          <HabitBarList habits={weakest} />
        </div>
      </div>
    </div>
  )
}
