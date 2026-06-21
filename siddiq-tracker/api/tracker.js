import { readFileSync } from 'fs'
import path from 'path'
import { redis } from './_redis.js'

const KEY = 'siddiq_tracker_data'

function loadSeed() {
  const file = readFileSync(path.join(process.cwd(), 'src/data/tracker-data.json'), 'utf-8')
  return JSON.parse(file)
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const records = (await redis.get(KEY)) ?? loadSeed()
    return res.status(200).json(records)
  }

  if (req.method === 'POST') {
    const records = req.body
    if (!Array.isArray(records)) {
      return res.status(400).json({ error: 'Expected an array of tracker records.' })
    }
    await redis.set(KEY, records)
    return res.status(200).json({ ok: true })
  }

  res.setHeader('Allow', 'GET, POST')
  return res.status(405).json({ error: 'Method not allowed' })
}
