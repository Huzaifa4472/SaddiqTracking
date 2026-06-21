import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword, logout, clearAuthMessages } from '../features/auth/authSlice'
import { selectAllRecords } from '../features/tracker/trackerSlice'
import { pushNotification } from '../features/ui/uiSlice'
import { calcStreaks, overallPercentage } from '../utils/scoring'
import { exportAllDataAsJSON } from '../utils/storage'
import StatCard from '../components/dashboard/StatCard'

export default function Profile() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const error = useSelector((state) => state.auth.error)
  const successMessage = useSelector((state) => state.auth.successMessage)
  const records = useSelector(selectAllRecords)

  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirm: '' })

  const streaks = useMemo(() => calcStreaks(records), [records])
  const overallPct = useMemo(() => overallPercentage(records), [records])

  function handleChangePassword(e) {
    e.preventDefault()
    if (pwForm.newPassword.length < 6) {
      dispatch(pushNotification('New password must be at least 6 characters.', 'error'))
      return
    }
    if (pwForm.newPassword !== pwForm.confirm) {
      dispatch(pushNotification('New passwords do not match.', 'error'))
      return
    }
    dispatch(changePassword({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword }))
    setPwForm({ currentPassword: '', newPassword: '', confirm: '' })
  }

  // surface auth slice messages as toasts
  useMemo(() => {
    if (error) dispatch(pushNotification(error, 'error'))
    if (successMessage) dispatch(pushNotification(successMessage, 'success'))
    if (error || successMessage) dispatch(clearAuthMessages())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, successMessage])

  async function handleExportJSON() {
    const blob = new Blob([await exportAllDataAsJSON()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `siddiq-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleExportCSV() {
    const headers = ['date', 'dailyScore', 'notes']
    const rows = records.map((r) => [r.date, r.dailyScore, (r.notes || '').replace(/,/g, ';')])
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `siddiq-tracker-records-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handlePrint() {
    window.print()
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">Profile</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Account details and data management.</p>
      </div>

      <div className="card">
        <h3 className="font-bold mb-3">Account Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-slate-400 text-xs">Full Name</div>
            <div className="font-semibold">{user?.name}</div>
          </div>
          <div>
            <div className="text-slate-400 text-xs">Email</div>
            <div className="font-semibold">{user?.email}</div>
          </div>
          <div>
            <div className="text-slate-400 text-xs">Account Created</div>
            <div className="font-semibold">{user?.createdAt}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Tracking Days" value={records.length} accent="#0F5132" icon="📅" />
        <StatCard title="Current Streak" value={`${streaks.current}d`} accent="#C9A227" icon="🔥" />
        <StatCard title="Longest Streak" value={`${streaks.longest}d`} accent="#1B4965" icon="🏆" />
      </div>

      <div className="card">
        <h3 className="font-bold mb-3">Change Password</h3>
        <form onSubmit={handleChangePassword} className="space-y-3">
          <input
            type="password"
            className="input-field"
            placeholder="Current password"
            value={pwForm.currentPassword}
            onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })}
          />
          <input
            type="password"
            className="input-field"
            placeholder="New password"
            value={pwForm.newPassword}
            onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Confirm new password"
            value={pwForm.confirm}
            onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })}
          />
          <button type="submit" className="btn-primary">
            Update Password
          </button>
        </form>
      </div>

      <div className="card">
        <h3 className="font-bold mb-3">Data Management</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1 italic">
          Overall Siddiq Score so far: {overallPct}%
        </p>
        <div className="flex flex-wrap gap-3 mt-3">
          <button onClick={handleExportJSON} className="btn-secondary">
            ⬇ Export Data (JSON Backup)
          </button>
          <button onClick={handleExportCSV} className="btn-secondary">
            ⬇ Download Report (CSV)
          </button>
          <button onClick={handlePrint} className="btn-secondary">
            🖨 Printable Report
          </button>
        </div>
      </div>

      <button onClick={() => dispatch(logout())} className="btn-primary !bg-rose-600 hover:!bg-rose-700">
        Logout
      </button>
    </div>
  )
}
