import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ name, email, password }, { rejectWithValue }) => {
    const users = await getUsers()
    const emailLower = email.trim().toLowerCase()
    if (users.some((u) => u.email.toLowerCase() === emailLower)) {
      return rejectWithValue('An account with this email already exists.')
    }
    const newUser = {
      id: `user_${Date.now()}`,
      name: name.trim(),
      email: emailLower,
      password: simpleHash(password),
      createdAt: new Date().toISOString().slice(0, 10),
    }
    users.push(newUser)
    await saveUsers(users)
    return 'Account created successfully. Please log in.'
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    const users = await getUsers()
    const emailLower = email.trim().toLowerCase()
    const user = users.find((u) => u.email.toLowerCase() === emailLower)
    if (!user || user.password !== simpleHash(password)) {
      return rejectWithValue('Invalid email or password.')
    }
    const session = { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt }
    saveSession(session)
    return session
  }
)

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ currentPassword, newPassword }, { getState, rejectWithValue }) => {
    const users = await getUsers()
    const currentUserId = getState().auth.user?.id
    const idx = users.findIndex((u) => u.id === currentUserId)
    if (idx === -1) {
      return rejectWithValue('User not found.')
    }
    if (users[idx].password !== simpleHash(currentPassword)) {
      return rejectWithValue('Current password is incorrect.')
    }
    users[idx].password = simpleHash(newPassword)
    await saveUsers(users)
    return 'Password updated successfully.'
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      clearSession()
      state.isAuthenticated = false
      state.user = null
    },
    clearAuthMessages: (state) => {
      state.error = null
      state.successMessage = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.error = null
        state.successMessage = action.payload
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload || 'Signup failed.'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload
        state.error = null
        state.successMessage = null
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload || 'Login failed.'
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.error = null
        state.successMessage = action.payload
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.error = action.payload || 'Could not change password.'
      })
  },
})

export const { logout, clearAuthMessages } = authSlice.actions
export default authSlice.reducer
