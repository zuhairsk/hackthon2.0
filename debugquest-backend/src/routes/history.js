import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import Session from '../models/Session.js'

const router = Router()

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const rows = await Session.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(50)
    res.json(rows)
  } catch (e) { next(e) }
})

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { language, code, details, suggestedFix, eli5, score, durationMs } = req.body
    const row = await Session.create({ userId: req.user.id, language, code, details, suggestedFix, eli5, score, durationMs })
    res.status(201).json(row)
  } catch (e) { next(e) }
})

export default router