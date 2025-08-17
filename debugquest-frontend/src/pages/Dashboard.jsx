import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import * as THREE from 'three'
import FOG from 'vanta/dist/vanta.fog.min'

export default function Dashboard() {
  const vantaInstance = useRef(null)

  useEffect(() => {
    if (!vantaInstance.current) {
      vantaInstance.current = FOG({
        el: document.getElementById('vanta-bg'),
        THREE,
        mouseControls: true,
        touchControls: true,
        highlightColor: 0x22d3ee,
        midtoneColor: 0x0ea5e9,
        lowlightColor: 0x164e63,
        baseColor: 0x000000,
        blurFactor: 0.6,
      })
    }
    return () => {
      if (vantaInstance.current) vantaInstance.current.destroy()
      vantaInstance.current = null
    }
  }, [])

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <motion.div whileHover={{ scale: 1.01 }} className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl p-5">
        <h3 className="font-semibold mb-2">Recent Sessions</h3>
        <div className="text-white/70 text-sm">No sessions yet.</div>
      </motion.div>
      <div className="space-y-6">
        <motion.div whileHover={{ scale: 1.01 }} className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">XP</h3>
            <span className="text-cyan-300">1200</span>
          </div>
          <div className="mt-3 h-2 w-full bg-white/10 rounded">
            <div className="h-2 bg-cyan-500 rounded" style={{ width: '60%' }} />
          </div>
          <p className="mt-2 text-xs text-white/60">Level: Intermediate</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.01 }} className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h3 className="font-semibold mb-2">Achievements</h3>
          <div className="flex gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-cyan-600/30 border border-cyan-500/30">First Fix</span>
            <span className="px-2 py-1 rounded bg-emerald-600/30 border border-emerald-500/30">Streak x3</span>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.01 }} className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h3 className="font-semibold mb-3">Leaderboard</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span>@alice</span><span>2300</span></li>
            <li className="flex justify-between"><span>@bob</span><span>2100</span></li>
            <li className="flex justify-between"><span>@you</span><span>1200</span></li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}