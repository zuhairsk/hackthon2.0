import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('/', { path: '/socket.io', autoConnect: false })

export default function Leaderboard() {
  const [rows, setRows] = useState([
    { user: 'alice', score: 2300 },
    { user: 'bob', score: 2100 },
    { user: 'you', score: 1200 },
  ])

  useEffect(() => {
    socket.connect()
    socket.on('leaderboard:update', (data) => setRows(data))
    return () => {
      socket.off('leaderboard:update')
      socket.disconnect()
    }
  }, [])

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl">
      <div className="p-5 border-b border-white/10 font-semibold">Leaderboard</div>
      <div className="divide-y divide-white/5">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-3">
              <span className="text-white/50 text-sm w-6">{i + 1}</span>
              <span>@{r.user}</span>
            </div>
            <span className="text-white/80">{r.score}</span>
          </div>
        ))}
      </div>
    </div>
  )
}