import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Game() {
  const [timeLeft, setTimeLeft] = useState(120)
  const [score, setScore] = useState(0)
  const [xp, setXp] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setTimeLeft((t) => Math.max(t - 1, 0)), 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  useEffect(() => {
    if (timeLeft === 0) setRunning(false)
  }, [timeLeft])

  function start() {
    setTimeLeft(120)
    setScore(0)
    setXp(0)
    setRunning(true)
  }

  function submitAnswer(correct) {
    if (!running) return
    if (correct) {
      setScore((s) => s + 100)
      setXp((x) => x + 25)
    } else {
      setScore((s) => Math.max(s - 20, 0))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="px-3 py-2 rounded bg-white/5 border border-white/10">Time: {timeLeft}s</div>
        <div className="px-3 py-2 rounded bg-white/5 border border-white/10">Score: {score}</div>
        <div className="px-3 py-2 rounded bg-white/5 border border-white/10">XP: {xp}</div>
        <button onClick={start} className="ml-auto bg-cyan-600 hover:bg-cyan-500 px-3 py-2 rounded">Start</button>
      </div>

      <motion.div whileHover={{ scale: 1.01 }} className="bg-white/5 border border-white/10 rounded-xl p-5">
        <h3 className="font-semibold mb-2">Puzzle</h3>
        <p className="text-sm text-white/70 mb-3">Find the bug: What is wrong with this code snippet?</p>
        <pre className="text-xs bg-black/40 p-3 rounded border border-white/10 overflow-auto">{`function add(a, b) {
  return a - b; // should be +
}`}</pre>
        <div className="mt-3 flex gap-2">
          <button onClick={() => submitAnswer(true)} className="bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 rounded">Operator is wrong</button>
          <button onClick={() => submitAnswer(false)} className="bg-red-600/70 hover:bg-red-600 px-3 py-1.5 rounded">Missing semicolon</button>
        </div>
      </motion.div>
      <div className="text-xs text-white/60">Difficulty: Beginner</div>
    </div>
  )
}