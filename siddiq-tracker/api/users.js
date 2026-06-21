import { readFileSync } from 'fs'
import path from 'path'
import { redis } from './_redis.js'

const KEY = 'siddiq_users'

function loadSeed() {
  const file = readFileSync(path.join(process.cwd(), 'src/data/users.json'), 'utf-8')
  return JSON.parse(file)
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const users = (await redis.get(KEY)) ?? loadSeed()
    return res.status(200).json(users)
  }

  if (req.method === 'POST') {
    const users = req.body
    if (!Array.isArray(users)) {
      return res.status(400).json({ error: 'Expected an array of users.' })
    }
    await redis.set(KEY, users)
    return res.status(200).json({ ok: true })
  }

  res.setHeader('Allow', 'GET, POST')
  return res.status(405).json({ error: 'Method not allowed' })
}
