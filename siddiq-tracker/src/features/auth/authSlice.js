import { createSlice } from '@reduxjs/toolkit'
import { getUsers, saveUsers, getSession, saveSession, clearSession } from '../../utils/storage'

function simpleHash(str) {
  // Demo-grade obfuscation only — NOT secure. Replace with real hashing on a real backend.
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return `h_${hash}`
}

const existingSession = getSession()

const initialState = {
  isAuthenticated: !!existingSession,
  user: existingSession || null,
  error: null,
  successMessage: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: (state, action) => {
      const { name, email, password } = action.payload
      const users = getUsers()
      const emailLower = email.trim().toLowerCase()
      if (users.some((u) => u.email.toLowerCase() === emailLower)) {
        state.error = 'An account with this email already exists.'
        return
      }
      const newUser = {
        id: `user_${Date.now()}`,
        name: name.trim(),
        email: emailLower,
        password: simpleHash(password),
        createdAt: new Date().toISOString().slice(0, 10),
      }
      users.push(newUser)
      saveUsers(users)
      state.error = null
      state.successMessage = 'Account created successfully. Please log in.'
    },
    login: (state, action) => {
      const { email, password } = action.payload
      const users = getUsers()
      const emailLower = email.trim().toLowerCase()
      const user = users.find((u) => u.email.toLowerCase() === emailLower)
      if (!user || user.password !== simpleHash(password)) {
        state.error = 'Invalid email or password.'
        return
      }
      const session = { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt }
      saveSession(session)
      state.isAuthenticated = true
      state.user = session
      state.error = null
      state.successMessage = null
    },
    logout: (state) => {
      clearSession()
      state.isAuthenticated = false
      state.user = null
    },
    changePassword: (state, action) => {
      const { currentPassword, newPassword } = action.payload
      const users = getUsers()
      const idx = users.findIndex((u) => u.id === state.user?.id)
      if (idx === -1) {
        state.error = 'User not found.'
        return
      }
      if (users[idx].password !== simpleHash(currentPassword)) {
        state.error = 'Current password is incorrect.'
        return
      }
      users[idx].password = simpleHash(newPassword)
      saveUsers(users)
      state.error = null
      state.successMessage = 'Password updated successfully.'
    },
    clearAuthMessages: (state) => {
      state.error = null
      state.successMessage = null
    },
  },
})

export const { signup, login, logout, changePassword, clearAuthMessages } = authSlice.actions
export default authSlice.reducer
