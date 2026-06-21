import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedWeekKey: null,
  selectedMonthKey: null,
  streakThreshold: 50, // % of daily habits required for a day to count toward a streak
}

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setSelectedWeek: (state, action) => {
      state.selectedWeekKey = action.payload
    },
    setSelectedMonth: (state, action) => {
      state.selectedMonthKey = action.payload
    },
    setStreakThreshold: (state, action) => {
      state.streakThreshold = action.payload
    },
  },
})

export const { setSelectedWeek, setSelectedMonth, setStreakThreshold } = reportSlice.actions
export default reportSlice.reducer
