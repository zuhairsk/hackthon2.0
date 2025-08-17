import { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import axios from 'axios'
import { motion } from 'framer-motion'

const languages = ['javascript', 'python', 'java', 'c']

export default function Workspace() {
  const [language, setLanguage] = useState('javascript')
  const [code, setCode] = useState('// Write your code here')
  const [eli5, setEli5] = useState(true)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function analyze() {
    setLoading(true)
    try {
      const { data } = await axios.post('/api/debug/analyze', { language, code, eli5 })
      setResult(data)
      localStorage.setItem('dq_last_session', JSON.stringify({ language, code }))
    } catch (e) {
      setResult({ error: 'Failed to analyze code' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem('dq_last_session')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setLanguage(parsed.language || 'javascript')
        setCode(parsed.code || '')
      } catch {}
    }
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-white/5 border border-white/10 rounded px-2 py-1">
            {languages.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={eli5} onChange={(e) => setEli5(e.target.checked)} />
            ELI5
          </label>
          <button onClick={analyze} disabled={loading} className="ml-auto bg-cyan-600 hover:bg-cyan-500 disabled:opacity-60 px-3 py-1.5 rounded">
            {loading ? 'Analyzing…' : 'Analyze'}
          </button>
        </div>
        <div className="h-[60vh] overflow-hidden rounded-lg border border-white/10">
          <Editor height="100%" theme="vs-dark" defaultLanguage={language} language={language} value={code} onChange={(v) => setCode(v ?? '')} options={{ minimap: { enabled: false } }} />
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="font-semibold mb-2">Error Details</h3>
          <pre className="text-sm whitespace-pre-wrap">{result?.details || '—'}</pre>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="font-semibold mb-2">Suggested Fix</h3>
          <pre className="text-sm whitespace-pre-wrap">{result?.suggestedFix || '—'}</pre>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="font-semibold mb-2">Explain Like I’m 5</h3>
          <pre className="text-sm whitespace-pre-wrap">{eli5 ? (result?.eli5 || '—') : 'Toggle ELI5 for simplified explanation'}</pre>
        </div>
      </motion.div>
    </div>
  )
}