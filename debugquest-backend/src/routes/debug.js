import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

function analyzeCode(language, code, eli5) {
  // Very naive mock analyzer
  let details = ''
  let suggestedFix = ''
  if (/return a - b/.test(code)) {
    details = 'Detected subtraction where addition likely intended.'
    suggestedFix = 'Change `a - b` to `a + b`.'
  } else if (/print\(([^)]+)\)/.test(code) && language === 'python') {
    details = 'Looks valid. If failing, check indentation or variable names.'
    suggestedFix = 'Ensure variables exist and indentation is consistent.'
  } else if (/System\.out\.println/.test(code) && language === 'java') {
    details = 'Ensure method is within a class and main method signature is correct.'
    suggestedFix = 'Wrap code in a class and add `public static void main(String[] args)`.'
  } else {
    details = 'No obvious syntax issue detected in mock analysis.'
    suggestedFix = 'Run tests or linter for deeper logic issues.'
  }
  const eli5Text = eli5 ? 'There is a small mistake: you are using the wrong math symbol. Use plus instead of minus.' : ''
  return { details, suggestedFix, eli5: eli5Text }
}

router.post('/analyze', requireAuth, async (req, res, next) => {
  try {
    const { language, code, eli5 } = req.body
    if (!language || !code) return res.status(400).json({ message: 'Missing payload' })
    const result = analyzeCode(language, code, !!eli5)
    return res.json(result)
  } catch (e) { next(e) }
})

export default router