import { useMemo } from 'react'
import { getDailyAyah } from '../data/ayahReflections'
import { getDailyAzkarSet } from '../data/azkar'
import DailyAyahCard from '../components/inspiration/DailyAyahCard'
import DailyAzkarList from '../components/inspiration/DailyAzkarList'

export default function DailyInspiration() {
  const ayah = useMemo(() => getDailyAyah(), [])
  const azkarSet = useMemo(() => getDailyAzkarSet(new Date(), 4), [])

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">Daily Inspiration</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          A new life lesson and a fresh set of azkar every day — a small habit, repeated, builds a Siddiq heart.
        </p>
      </div>

      <DailyAyahCard ayah={ayah} />
      <DailyAzkarList azkarSet={azkarSet} />
    </div>
  )
}
