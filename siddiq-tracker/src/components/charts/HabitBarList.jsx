import ProgressBar from '../common/ProgressBar'
import { CATEGORIES } from '../../utils/habits'

export default function HabitBarList({ habits }) {
  return (
    <div className="space-y-3">
      {habits.map((h) => (
        <ProgressBar
          key={h.id}
          label={h.label}
          pct={h.pct}
          color={CATEGORIES[h.category]?.color || '#1E8449'}
        />
      ))}
    </div>
  )
}
