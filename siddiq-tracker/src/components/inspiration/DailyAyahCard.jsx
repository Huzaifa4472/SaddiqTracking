export default function DailyAyahCard({ ayah }) {
  if (!ayah) return null
  return (
    <div className="card bg-gradient-to-br from-siddiq-green/5 to-siddiq-gold/10 dark:from-siddiq-green/10 dark:to-siddiq-gold/5 border border-siddiq-gold/30">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">📖</span>
        <h3 className="font-bold text-siddiq-green dark:text-siddiq-goldLight">Today's Life Lesson from the Quran</h3>
      </div>
      <p className="text-xs font-semibold text-siddiq-gold mb-2">{ayah.reference}</p>
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">{ayah.theme}</p>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{ayah.lesson}</p>
    </div>
  )
}
