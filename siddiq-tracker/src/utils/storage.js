// Users and tracker records are persisted server-side in Vercel KV (Upstash Redis),
// behind the /api/users and /api/tracker serverless functions (see api/users.js,
// api/tracker.js). The current session (which user is logged in on this browser) stays
// in localStorage, since it's a per-device pointer and doesn't need to be shared.

const SESSION_KEY = 'siddiq_session'

async function apiGet(path) {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`Failed to load ${path}`)
  return res.json()
}

async function apiPost(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Failed to save ${path}`)
  return res.json()
}

export async function getUsers() {
  return apiGet('/api/users')
}

export async function saveUsers(users) {
  await apiPost('/api/users', users)
}

export async function getAllTrackerRecords() {
  return apiGet('/api/tracker')
}

export async function saveAllTrackerRecords(records) {
  await apiPost('/api/tracker', records)
}

export async function getTrackerRecordsForUser(userId) {
  const all = await getAllTrackerRecords()
  return all.filter((r) => r.userId === userId)
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export async function exportAllDataAsJSON() {
  const [users, trackerData] = await Promise.all([getUsers(), getAllTrackerRecords()])
  return JSON.stringify({ users, trackerData }, null, 2)
}

export async function importAllData(jsonString) {
  const parsed = JSON.parse(jsonString)
  if (parsed.users) await saveUsers(parsed.users)
  if (parsed.trackerData) await saveAllTrackerRecords(parsed.trackerData)
}
