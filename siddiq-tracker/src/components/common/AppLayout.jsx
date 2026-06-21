import { NavLink, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { toggleTheme } from '../../features/ui/uiSlice'
import { logout } from '../../features/auth/authSlice'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: '◧' },
  { to: '/tracker', label: 'Daily Tracker', icon: '✓' },
  { to: '/reports/weekly', label: 'Weekly Report', icon: '▤' },
  { to: '/reports/monthly', label: 'Monthly Report', icon: '▥' },
  { to: '/inspiration', label: 'Daily Inspiration', icon: '🌙' },
  { to: '/profile', label: 'Profile', icon: '◯' },
]

export default function AppLayout() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.ui.theme)
  const user = useSelector((state) => state.auth.user)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-gradient-to-b from-siddiq-green to-siddiq-blue text-white transform transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-6 py-6 border-b border-white/15">
          <div className="text-lg font-extrabold tracking-tight">Siddiq Tracker</div>
          <div className="text-xs text-white/70 mt-0.5">Path to Truthfulness</div>
        </div>
        <nav className="px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-white/15 text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 inset-x-0 px-4 py-4 border-t border-white/15">
          <button
            onClick={() => dispatch(logout())}
            className="w-full text-left text-sm text-white/80 hover:text-white px-3 py-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            ⏻ Logout
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-700 px-4 lg:px-8 py-3 flex items-center justify-between">
          <button className="lg:hidden text-2xl px-2" onClick={() => setMobileOpen(true)}>
            ☰
          </button>
          <div className="hidden lg:block text-sm text-slate-500 dark:text-slate-400">
            Assalamu alaikum, <span className="font-semibold text-slate-700 dark:text-slate-200">{user?.name}</span>
          </div>
          <button
            onClick={() => dispatch(toggleTheme())}
            className="px-3 py-2 rounded-xl text-sm font-medium border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === 'dark' ? '☀ Light' : '☾ Dark'}
          </button>
        </header>
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
