import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllTrackerRecords, saveAllTrackerRecords } from '../../utils/storage'
import { calcDailyScore } from '../../utils/scoring'
import { emptyHabitsObject } from '../../utils/habits'

const initialState = {
  records: [], // all records for the loaded user
  filterStart: null,
  filterEnd: null,
  searchDate: '',
}

export const loadRecordsForUser = createAsyncThunk('tracker/loadRecordsForUser', async (userId) => {
  const all = await getAllTrackerRecords()
  return all.filter((r) => r.userId === userId)
})

export const upsertRecord = createAsyncThunk(
  'tracker/upsertRecord',
  async ({ userId, date, habits, notes }) => {
    const all = await getAllTrackerRecords()
    const idx = all.findIndex((r) => r.userId === userId && r.date === date)
    const mergedHabits = { ...emptyHabitsObject(), ...habits }
    const dailyScore = calcDailyScore(mergedHabits)
    const record = { userId, date, habits: mergedHabits, notes: notes || '', dailyScore }
    if (idx === -1) {
      all.push(record)
    } else {
      all[idx] = record
    }
    await saveAllTrackerRecords(all)
    return all.filter((r) => r.userId === userId)
  }
)

export const deleteRecord = createAsyncThunk('tracker/deleteRecord', async ({ userId, date }) => {
  const all = (await getAllTrackerRecords()).filter((r) => !(r.userId === userId && r.date === date))
  await saveAllTrackerRecords(all)
  return all.filter((r) => r.userId === userId)
})

const trackerSlice = createSlice({
  name: 'tracker',
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addCase(loadRecordsForUser.fulfilled, (state, action) => {
        state.records = action.payload
      })
      .addCase(upsertRecord.fulfilled, (state, action) => {
        state.records = action.payload
      })
      .addCase(deleteRecord.fulfilled, (state, action) => {
        state.records = action.payload
      })
  },
})

export const { setFilterRange, setSearchDate, clearFilters } = trackerSlice.actions
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
