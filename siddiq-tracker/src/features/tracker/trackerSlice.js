import { createSlice } from '@reduxjs/toolkit'
import { getAllTrackerRecords, saveAllTrackerRecords } from '../../utils/storage'
import { calcDailyScore } from '../../utils/scoring'
import { emptyHabitsObject } from '../../utils/habits'

const initialState = {
  records: [], // all records for the loaded user
  filterStart: null,
  filterEnd: null,
  searchDate: '',
}

function persist(allRecords) {
  saveAllTrackerRecords(allRecords)
}

const trackerSlice = createSlice({
  name: 'tracker',
  initialState,
  reducers: {
    loadRecordsForUser: (state, action) => {
      const userId = action.payload
      const all = getAllTrackerRecords()
      state.records = all.filter((r) => r.userId === userId)
    },
    upsertRecord: (state, action) => {
      const { userId, date, habits, notes } = action.payload
      const all = getAllTrackerRecords()
      const idx = all.findIndex((r) => r.userId === userId && r.date === date)
      const mergedHabits = { ...emptyHabitsObject(), ...habits }
      const dailyScore = calcDailyScore(mergedHabits)
      const record = { userId, date, habits: mergedHabits, notes: notes || '', dailyScore }
      if (idx === -1) {
        all.push(record)
      } else {
        all[idx] = record
      }
      persist(all)
      state.records = all.filter((r) => r.userId === userId)
    },
    deleteRecord: (state, action) => {
      const { userId, date } = action.payload
      const all = getAllTrackerRecords().filter((r) => !(r.userId === userId && r.date === date))
      persist(all)
      state.records = all.filter((r) => r.userId === userId)
    },
    setFilterRange: (state, action) => {
      state.filterStart = action.payload.start
      state.filterEnd = action.payload.end
    },
    setSearchDate: (state, action) => {
      state.searchDate = action.payload
    },
    clearFilters: (state) => {
      state.filterStart = null
      state.filterEnd = null
      state.searchDate = ''
    },
  },
})

export const { loadRecordsForUser, upsertRecord, deleteRecord, setFilterRange, setSearchDate, clearFilters } =
  trackerSlice.actions
export default trackerSlice.reducer

// Selectors
export const selectAllRecords = (state) => state.tracker.records
export const selectSortedRecords = (state) =>
  [...state.tracker.records].sort((a, b) => new Date(b.date) - new Date(a.date))

export const selectFilteredRecords = (state) => {
  const { records, filterStart, filterEnd, searchDate } = state.tracker
  let result = [...records]
  if (searchDate) {
    result = result.filter((r) => r.date === searchDate)
  }
  if (filterStart) {
    result = result.filter((r) => new Date(r.date) >= new Date(filterStart))
  }
  if (filterEnd) {
    result = result.filter((r) => new Date(r.date) <= new Date(filterEnd))
  }
  return result.sort((a, b) => new Date(b.date) - new Date(a.date))
}
