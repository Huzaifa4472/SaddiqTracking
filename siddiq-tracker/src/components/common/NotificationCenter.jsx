import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { dismissNotification } from '../../features/ui/uiSlice'

export default function NotificationCenter() {
  const notifications = useSelector((state) => state.ui.notifications)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!notifications.length) return
    const timers = notifications.map((n) =>
      setTimeout(() => dispatch(dismissNotification(n.id)), 3500)
    )
    return () => timers.forEach(clearTimeout)
  }, [notifications, dispatch])

  if (!notifications.length) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-[90vw] max-w-sm">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`rounded-xl shadow-lg px-4 py-3 text-sm font-medium text-white flex items-start justify-between gap-3 ${
            n.type === 'error' ? 'bg-rose-600' : n.type === 'success' ? 'bg-emerald-600' : 'bg-siddiq-blue'
          }`}
        >
          <span>{n.message}</span>
          <button onClick={() => dispatch(dismissNotification(n.id))} className="opacity-80 hover:opacity-100">
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
