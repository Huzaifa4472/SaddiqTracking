import { useState, useEffect } from 'react'

function storageKeyForToday() {
  return `siddiq_azkar_done_${new Date().toISOString().slice(0, 10)}`
}

export default function DailyAzkarList({ azkarSet }) {
  const [done, setDone] = useState({})

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKeyForToday()) || '{}')
      setDone(saved)
    } catch {
      setDone({})
    }
  }, [])

  function toggle(id) {
    const updated = { ...done, [id]: !done[id] }
    setDone(updated)
    localStorage.setItem(storageKeyForToday(), JSON.stringify(updated))
  }

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">🤲</span>
        <h3 className="font-bold text-siddiq-green dark:text-siddiq-goldLight">Today's Recommended Azkar</h3>
      </div>
      <div className="space-y-3">
        {azkarSet.map((z) => (
          <div
            key={z.id}
            className={`rounded-xl border p-3 transition-colors cursor-pointer ${
              done[z.id]
                ? 'bg-emerald-50 border-emerald-300 dark:bg-emerald-900/20 dark:border-emerald-600'
                : 'bg-slate-50 border-slate-200 dark:bg-slate-700/40 dark:border-slate-600'
            }`}
            onClick={() => toggle(z.id)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm">{z.title}</span>
                  <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-siddiq-gold/20 text-siddiq-gold font-bold">
                    {z.count}
                  </span>
                </div>
                <p dir="rtl" className="text-right text-lg mt-1.5 leading-relaxed font-medium">
                  {z.arabic}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">{z.transliteration}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1.5">{z.meaning}</p>
                <p className="text-xs text-siddiq-blue dark:text-siddiq-blueLight mt-1">💡 {z.benefit}</p>
              </div>
              <span className={`text-2xl shrink-0 ${done[z.id] ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'}`}>
                {done[z.id] ? '✔' : '○'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
