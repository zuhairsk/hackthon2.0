import axios from 'axios'

export const api = axios.create({ baseURL: '/api' })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('dq_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const AuthAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (email, password) => api.post('/auth/register', { email, password }),
}

export const DebugAPI = {
  analyze: (payload) => api.post('/debug/analyze', payload),
}

export const HistoryAPI = {
  get: () => api.get('/history'),
  save: (payload) => api.post('/history', payload),
}

export const LeaderboardAPI = {
  get: () => api.get('/leaderboard'),
}