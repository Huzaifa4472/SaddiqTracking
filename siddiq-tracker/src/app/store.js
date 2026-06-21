import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import trackerReducer from '../features/tracker/trackerSlice'
import reportReducer from '../features/reports/reportSlice'
import uiReducer from '../features/ui/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tracker: trackerReducer,
    reports: reportReducer,
    ui: uiReducer,
  },
})
