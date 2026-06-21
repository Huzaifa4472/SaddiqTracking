import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  upsertRecord,
  deleteRecord,
  setFilterRange,
  setSearchDate,
  clearFilters,
  selectFilteredRecords,
} from '../features/tracker/trackerSlice'
import { pushNotification } from '../features/ui/uiSlice'
import { calcDailyScore, calcDailyPercentage, MAX_DAILY_SCORE } from '../utils/scoring'
import { emptyHabitsObject } from '../utils/habits'
import HabitToggleGrid from '../components/tracker/HabitToggleGrid'
import RecordHistoryTable from '../components/tracker/RecordHistoryTable'
import ProgressBar from '../components/common/ProgressBar'

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

export default function DailyTracker() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const allRecords = useSelector((state) => state.tracker.records)
  const filtered = useSelector(selectFilteredRecords)
  const { filterStart, filterEnd, searchDate } = useSelector((state) => state.tracker)

  const [date, setDate] = useState(todayStr())
  const [habits, setHabits] = useState(() => {
    const existing = allRecords.find((r) => r.date === todayStr())
    return existing ? existing.habits : emptyHabitsObject()
  })
  const [notes, setNotes] = useState(() => allRecords.find((r) => r.date === todayStr())?.notes || '')

  const dayName = useMemo(
    () => new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' }),
    [date]
  )

  const score = calcDailyScore(habits)
  const pct = calcDailyPercentage(habits)

  function loadDate(newDate) {
    setDate(newDate)
    const existing = allRecords.find((r) => r.date === newDate)
    setHabits(existing ? existing.habits : emptyHabitsObject())
    setNotes(existing?.notes || '')
  }

  function handleToggle(habitId) {
    setHabits((prev) => ({ ...prev, [habitId]: prev[habitId] ? 0 : 1 }))
  }

  function handleSave() {
    dispatch(upsertRecord({ userId: user.id, date, habits, notes }))
    dispatch(pushNotification(`Saved record for ${date}.`, 'success'))
  }

  function handleEdit(record) {
    loadDate(record.date)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleDelete(record) {
    dispatch(deleteRecord({ userId: user.id, date: record.date }))
    dispatch(pushNotification(`Deleted record for ${record.date}.`, 'info'))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">Daily Tracker</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Log today's habits across every dimension of Siddiq character.
        </p>
      </div>

      <div className="card">
        <div className="flex flex-wrap items-end gap-4 mb-4">
          <div>
            <label className="label">Date</label>
            <input type="date" className="input-field" value={date} onChange={(e) => loadDate(e.target.value)} />
          </div>
          <div>
            <label className="label">Day</label>
            <div className="input-field bg-slate-100 dark:bg-slate-700/60 cursor-default">{dayName}</div>
          </div>
          <div className="flex-1 min-w-[180px]">
            <ProgressBar label={`Daily Score: ${score} / ${MAX_DAILY_SCORE}`} pct={pct} color="#0F5132" />
          </div>
          <button onClick={handleSave} className="btn-primary">
            Save Record
          </button>
        </div>

        <HabitToggleGrid habits={habits} onToggle={handleToggle} />

        <div className="mt-5">
          <label className="label">Notes</label>
          <textarea
            className="input-field min-h-[80px]"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Reflections, gratitude, or anything you'd like to remember about today..."
          />
        </div>
      </div>

      {/* History */}
      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-bold">Historical Records</h3>
          <div className="flex flex-wrap gap-2 items-end">
            <input
              type="date"
              className="input-field !py-1.5 !text-xs"
              value={searchDate}
              onChange={(e) => dispatch(setSearchDate(e.target.value))}
              placeholder="Search date"
            />
            <input
              type="date"
              className="input-field !py-1.5 !text-xs"
              value={filterStart || ''}
              onChange={(e) => dispatch(setFilterRange({ start: e.target.value, end: filterEnd }))}
            />
            <span className="text-xs text-slate-400 self-center">to</span>
            <input
              type="date"
              className="input-field !py-1.5 !text-xs"
              value={filterEnd || ''}
              onChange={(e) => dispatch(setFilterRange({ start: filterStart, end: e.target.value }))}
            />
            <button onClick={() => dispatch(clearFilters())} className="btn-secondary !py-1.5 !text-xs">
              Clear
            </button>
          </div>
        </div>
        <RecordHistoryTable records={filtered} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  )
}
