import { HABITS, HABIT_IDS, CATEGORIES } from './habits'

// Total possible points per day = number of habits (each worth 1 point)
export const MAX_DAILY_SCORE = HABIT_IDS.length

export function calcDailyScore(habits = {}) {
  return HABIT_IDS.reduce((sum, id) => sum + (Number(habits[id]) || 0), 0)
}

export function calcDailyPercentage(habits = {}) {
  return Math.round((calcDailyScore(habits) / MAX_DAILY_SCORE) * 100)
}

// Returns { spiritual: { score, max, pct }, truthfulness: {...}, ... }
export function calcCategoryScores(habits = {}) {
  const result = {}
  Object.keys(CATEGORIES).forEach((catKey) => {
    const catHabits = HABITS.filter((h) => h.category === catKey)
    const max = catHabits.length
    const score = catHabits.reduce((sum, h) => sum + (Number(habits[h.id]) || 0), 0)
    result[catKey] = { score, max, pct: max ? Math.round((score / max) * 100) : 0 }
  })
  return result
}

// Aggregate category scores across many records (array of {habits})
export function aggregateCategoryScores(records = []) {
  const totals = {}
  Object.keys(CATEGORIES).forEach((catKey) => (totals[catKey] = { score: 0, max: 0 }))
  records.forEach((rec) => {
    const cs = calcCategoryScores(rec.habits || {})
    Object.keys(cs).forEach((catKey) => {
      totals[catKey].score += cs[catKey].score
      totals[catKey].max += cs[catKey].max
    })
  })
  const result = {}
  Object.keys(totals).forEach((catKey) => {
    const { score, max } = totals[catKey]
    result[catKey] = { score, max, pct: max ? Math.round((score / max) * 100) : 0 }
  })
  return result
}

export function overallPercentage(records = []) {
  if (!records.length) return 0
  const totalScore = records.reduce((sum, r) => sum + calcDailyScore(r.habits || {}), 0)
  const totalMax = records.length * MAX_DAILY_SCORE
  return totalMax ? Math.round((totalScore / totalMax) * 100) : 0
}

// Habit completion rate across records: returns array sorted desc by pct
export function habitCompletionRates(records = []) {
  if (!records.length) return HABITS.map((h) => ({ ...h, pct: 0, completed: 0, total: 0 }))
  return HABITS.map((h) => {
    const completed = records.reduce((sum, r) => sum + (Number(r.habits?.[h.id]) || 0), 0)
    const total = records.length
    return { ...h, completed, total, pct: total ? Math.round((completed / total) * 100) : 0 }
  }).sort((a, b) => b.pct - a.pct)
}

export function topStrongestHabits(records = [], n = 5) {
  return habitCompletionRates(records).slice(0, n)
}

export function topWeakestHabits(records = [], n = 5) {
  const rates = habitCompletionRates(records)
  return [...rates].sort((a, b) => a.pct - b.pct).slice(0, n)
}

// Streak calculations. A day "counts" toward a streak if daily percentage >= threshold.
export function calcStreaks(records = [], threshold = 50) {
  if (!records.length) return { current: 0, longest: 0 }
  const sorted = [...records].sort((a, b) => new Date(a.date) - new Date(b.date))
  let longest = 0
  let running = 0
  let prevDate = null

  sorted.forEach((rec) => {
    const pct = calcDailyPercentage(rec.habits || {})
    const qualifies = pct >= threshold
    const curDate = new Date(rec.date)
    const isConsecutive =
      prevDate && (curDate - prevDate) / (1000 * 60 * 60 * 24) === 1

    if (qualifies) {
      running = isConsecutive || running === 0 ? running + 1 : 1
    } else {
      running = 0
    }
    longest = Math.max(longest, running)
    prevDate = curDate
  })

  // current streak: walk backward from most recent date
  let current = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  for (let i = sorted.length - 1; i >= 0; i--) {
    const rec = sorted[i]
    const pct = calcDailyPercentage(rec.habits || {})
    const recDate = new Date(rec.date)
    const expectedDate = new Date(today)
    expectedDate.setDate(today.getDate() - current)
    const matchesExpectedDay =
      recDate.toDateString() === expectedDate.toDateString() ||
      (current === 0 && (today - recDate) / (1000 * 60 * 60 * 24) <= 1)

    if (pct >= threshold && matchesExpectedDay) {
      current += 1
    } else {
      break
    }
  }

  return { current, longest }
}

export function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
}

export function groupByWeek(records = []) {
  const groups = {}
  records.forEach((rec) => {
    const d = new Date(rec.date)
    const week = getWeekNumber(d)
    const year = d.getFullYear()
    const key = `${year}-W${week}`
    if (!groups[key]) groups[key] = { key, week, year, records: [] }
    groups[key].records.push(rec)
  })
  return Object.values(groups).sort((a, b) => (a.year - b.year) || (a.week - b.week))
}

export function groupByMonth(records = []) {
  const groups = {}
  records.forEach((rec) => {
    const d = new Date(rec.date)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    if (!groups[key]) groups[key] = { key, month: d.getMonth(), year: d.getFullYear(), records: [] }
    groups[key].records.push(rec)
  })
  return Object.values(groups).sort((a, b) => (a.year - b.year) || (a.month - b.month))
}

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
