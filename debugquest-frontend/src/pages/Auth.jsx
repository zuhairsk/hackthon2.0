import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import WAVES from 'vanta/dist/vanta.waves.min'

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const vantaRef = useRef(null)
  const vantaInstance = useRef(null)

  useEffect(() => {
    if (!vantaInstance.current) {
      vantaInstance.current = WAVES({
        el: document.getElementById('vanta-bg'),
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        color: 0x0ea5e9,
        shininess: 20,
        waveHeight: 15,
        waveSpeed: 0.6,
        zoom: 0.9,
      })
    }
    return () => {
      if (vantaInstance.current) {
        vantaInstance.current.destroy()
        vantaInstance.current = null
      }
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (mode === 'login') {
        const { data } = await axios.post('/api/auth/login', { email, password })
        localStorage.setItem('dq_token', data.token)
      } else {
        await axios.post('/api/auth/register', { email, password })
      }
      window.location.href = '/dashboard'
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white/5 backdrop-blur rounded-xl border border-white/10 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{mode === 'login' ? 'Login' : 'Create account'}</h2>
          <button className="text-cyan-300 text-sm" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
            {mode === 'login' ? 'Need an account?' : 'Have an account?'}
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input className="w-full rounded-md bg-black/50 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input className="w-full rounded-md bg-black/50 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button disabled={loading} className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-60 rounded-md py-2 font-medium">
            {loading ? 'Please wait…' : mode === 'login' ? 'Login' : 'Sign up'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}