import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signup, clearAuthMessages } from '../features/auth/authSlice'
import { pushNotification } from '../features/ui/uiSlice'

export default function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, successMessage } = useSelector((state) => state.auth)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [touched, setTouched] = useState(false)

  useEffect(() => () => dispatch(clearAuthMessages()), [dispatch])

  useEffect(() => {
    if (error) dispatch(pushNotification(error, 'error'))
  }, [error, dispatch])

  useEffect(() => {
    if (successMessage) {
      dispatch(pushNotification(successMessage, 'success'))
      const t = setTimeout(() => navigate('/login'), 1200)
      return () => clearTimeout(t)
    }
  }, [successMessage, dispatch, navigate])

  const nameValid = form.name.trim().length >= 2
  const emailValid = /\S+@\S+\.\S+/.test(form.email)
  const passwordValid = form.password.length >= 6
  const confirmValid = form.confirm === form.password && form.confirm.length > 0
  const canSubmit = nameValid && emailValid && passwordValid && confirmValid

  function handleSubmit(e) {
    e.preventDefault()
    setTouched(true)
    if (!canSubmit) return
    dispatch(signup({ name: form.name, email: form.email, password: form.password }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-siddiq-blue via-siddiq-green to-slate-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="text-3xl font-extrabold text-siddiq-green dark:text-siddiq-goldLight">Siddiq Tracker</div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Begin your journey toward truthfulness, trust, and excellent character.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="label">Full Name</label>
            <input
              className="input-field"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Muhammad Huzaifa"
            />
            {touched && !nameValid && <p className="text-xs text-rose-500 mt-1">Enter your full name.</p>}
          </div>
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input-field"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
            {touched && !emailValid && <p className="text-xs text-rose-500 mt-1">Enter a valid email address.</p>}
          </div>
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              className="input-field"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="At least 6 characters"
            />
            {touched && !passwordValid && (
              <p className="text-xs text-rose-500 mt-1">Password must be at least 6 characters.</p>
            )}
          </div>
          <div>
            <label className="label">Confirm Password</label>
            <input
              type="password"
              className="input-field"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              placeholder="Re-enter password"
            />
            {touched && !confirmValid && <p className="text-xs text-rose-500 mt-1">Passwords do not match.</p>}
          </div>
          <button type="submit" className="btn-primary w-full">
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-siddiq-green dark:text-siddiq-goldLight font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
