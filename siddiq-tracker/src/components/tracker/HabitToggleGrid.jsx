import { CATEGORIES, habitsByCategory } from '../../utils/habits'

export default function HabitToggleGrid({ habits, onToggle }) {
  return (
    <div className="space-y-6">
      {Object.keys(CATEGORIES).map((catKey) => {
        const catHabits = habitsByCategory(catKey)
        if (!catHabits.length) return null
        return (
          <div key={catKey}>
            <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: CATEGORIES[catKey].color }} />
              {CATEGORIES[catKey].label}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {catHabits.map((h) => {
                const done = !!habits[h.id]
                return (
                  <div
                    key={h.id}
                    onClick={() => onToggle(h.id)}
                    className={`habit-pill ${done ? 'habit-pill-done' : 'habit-pill-missed'}`}
                  >
                    <span>{h.label}</span>
                    <span className="text-lg">{done ? '✔' : '✕'}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
