// Simulates the "JSON file" storage described in the spec, using localStorage as the
// persistence layer (a browser app cannot write to disk files). The shape of the data
// is identical to users.json / tracker-data.json, so swapping this module for real file
// or API calls later is a drop-in replacement — see the API_NOTES.md for migration notes.

import seedUsers from '../data/users.json'
import seedTracker from '../data/tracker-data.json'

const USERS_KEY = 'siddiq_users'
const TRACKER_KEY = 'siddiq_tracker_data'
const SESSION_KEY = 'siddiq_session'

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getUsers() {
  return readJSON(USERS_KEY, seedUsers)
}

export function saveUsers(users) {
  writeJSON(USERS_KEY, users)
}

export function getAllTrackerRecords() {
  return readJSON(TRACKER_KEY, seedTracker)
}

export function saveAllTrackerRecords(records) {
  writeJSON(TRACKER_KEY, records)
}

export function getTrackerRecordsForUser(userId) {
  return getAllTrackerRecords().filter((r) => r.userId === userId)
}

export function getSession() {
  return readJSON(SESSION_KEY, null)
}

export function saveSession(session) {
  writeJSON(SESSION_KEY, session)
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function exportAllDataAsJSON() {
  return JSON.stringify(
    { users: getUsers(), trackerData: getAllTrackerRecords() },
    null,
    2
  )
}

export function importAllData(jsonString) {
  const parsed = JSON.parse(jsonString)
  if (parsed.users) saveUsers(parsed.users)
  if (parsed.trackerData) saveAllTrackerRecords(parsed.trackerData)
}
