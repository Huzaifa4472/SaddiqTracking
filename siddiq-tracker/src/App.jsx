import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loadRecordsForUser } from './features/tracker/trackerSlice'
import ProtectedRoute from './routes/ProtectedRoute'
import AppLayout from './components/common/AppLayout'
import NotificationCenter from './components/common/NotificationCenter'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import DailyTracker from './pages/DailyTracker'
import WeeklyReport from './pages/WeeklyReport'
import MonthlyReport from './pages/MonthlyReport'
import Profile from './pages/Profile'
import DailyInspiration from './pages/DailyInspiration'

export default function App() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.ui.theme)
  const user = useSelector((state) => state.auth.user)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(loadRecordsForUser(user.id))
    }
  }, [isAuthenticated, user, dispatch])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <NotificationCenter />
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tracker" element={<DailyTracker />} />
            <Route path="/reports/weekly" element={<WeeklyReport />} />
            <Route path="/reports/monthly" element={<MonthlyReport />} />
            <Route path="/inspiration" element={<DailyInspiration />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
      </Routes>
    </div>
  )
}
