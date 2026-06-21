import { PieChart, Pie, Cell } from 'recharts'

export default function ScoreGauge({ pct = 0, size = 180, color = '#1E8449' }) {
  const data = [
    { name: 'done', value: pct },
    { name: 'rest', value: 100 - pct },
  ]
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size / 1.6 }}>
      <PieChart width={size} height={size}>
        <Pie
          data={data}
          startAngle={180}
          endAngle={0}
          innerRadius={size * 0.32}
          outerRadius={size * 0.46}
          dataKey="value"
          stroke="none"
        >
          <Cell fill={color} />
          <Cell fill="#E2E8F0" />
        </Pie>
      </PieChart>
      <div className="absolute top-[42%] -translate-y-1/2 text-center">
        <div className="text-3xl font-extrabold" style={{ color }}>
          {pct}%
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">Siddiq Score</div>
      </div>
    </div>
  )
}
