import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { CATEGORIES } from '../../utils/habits'

export default function CategoryPie({ categoryScores }) {
  const data = Object.keys(CATEGORIES).map((key) => ({
    name: CATEGORIES[key].label,
    value: categoryScores[key]?.score || 0,
    color: CATEGORIES[key].color,
  }))
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={95} label={({ name }) => name}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
