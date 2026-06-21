import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearAuthMessages } from '../features/auth/authSlice'
import { pushNotification } from '../features/ui/uiSlice'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, isAuthenticated } = useSelector((state) => state.auth)
  const [form, setForm] = useState({ email: '', password: '' })
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard')
  }, [isAuthenticated, navigate])

  useEffect(() => () => dispatch(clearAuthMessages()), [dispatch])

  const emailValid = /\S+@\S+\.\S+/.test(form.email)
  const canSubmit = emailValid && form.password.length > 0

  function handleSubmit(e) {
    e.preventDefault()
    setTouched(true)
    if (!canSubmit) return
    dispatch(login(form))
  }

  useEffect(() => {
    if (error) dispatch(pushNotification(error, 'error'))
  }, [error, dispatch])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-siddiq-green via-siddiq-blue to-slate-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="text-3xl font-extrabold text-siddiq-green dark:text-siddiq-goldLight">Siddiq Tracker</div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Welcome back. Continue your journey toward complete truthfulness.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
              placeholder="••••••••"
            />
            {touched && form.password.length === 0 && (
              <p className="text-xs text-rose-500 mt-1">Password is required.</p>
            )}
          </div>
          <button type="submit" className="btn-primary w-full">
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-siddiq-green dark:text-siddiq-goldLight font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
