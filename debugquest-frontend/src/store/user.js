import { create } from 'zustand'

export const useUserStore = create((set) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('dq_token') : null,
  profile: null,
  setToken: (token) => {
    if (token) localStorage.setItem('dq_token', token)
    else localStorage.removeItem('dq_token')
    set({ token })
  },
  setProfile: (profile) => set({ profile }),
  logout: () => {
    localStorage.removeItem('dq_token')
    set({ token: null, profile: null })
  },
}))