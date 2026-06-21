import { createSlice } from '@reduxjs/toolkit'

function getInitialTheme() {
  const saved = localStorage.getItem('siddiq_theme')
  if (saved) return saved
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const initialState = {
  theme: getInitialTheme(),
  loading: false,
  notifications: [], // { id, type, message }
  modal: null, // { type, payload }
}

let notifId = 0

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('siddiq_theme', state.theme)
    },
    setTheme: (state, action) => {
      state.theme = action.payload
      localStorage.setItem('siddiq_theme', action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    pushNotification: {
      reducer: (state, action) => {
        state.notifications.push(action.payload)
      },
      prepare: (message, type = 'info') => ({
        payload: { id: ++notifId, message, type },
      }),
    },
    dismissNotification: (state, action) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
    },
    openModal: (state, action) => {
      state.modal = action.payload
    },
    closeModal: (state) => {
      state.modal = null
    },
  },
})

export const { toggleTheme, setTheme, setLoading, pushNotification, dismissNotification, openModal, closeModal } =
  uiSlice.actions
export default uiSlice.reducer
