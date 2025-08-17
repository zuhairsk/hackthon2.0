import { Router } from 'express'

const router = Router()

let leaderboard = [
  { user: 'alice', score: 2300 },
  { user: 'bob', score: 2100 },
  { user: 'you', score: 1200 },
]

export function pushLeaderboardUpdate(io) {
  io.emit('leaderboard:update', leaderboard)
}

router.get('/', async (req, res) => {
  res.json(leaderboard)
})

router.post('/update', async (req, res) => {
  const { user, score } = req.body
  if (typeof user !== 'string' || typeof score !== 'number') return res.status(400).json({ message: 'Invalid' })
  const idx = leaderboard.findIndex((r) => r.user === user)
  if (idx >= 0) leaderboard[idx].score = score
  else leaderboard.push({ user, score })
  leaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 50)
  const io = req.app.get('io')
  if (io) io.emit('leaderboard:update', leaderboard)
  res.json({ ok: true })
})

export default router