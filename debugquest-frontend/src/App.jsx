import { Suspense } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Auth, Dashboard, Workspace, Game, Profile, Leaderboard } from './pages'
import ProtectedRoute from './components/ProtectedRoute'
import TopbarAuth from './components/TopbarAuth'

function Layout({ children }) {
  const location = useLocation()
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 backdrop-blur bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl">DebugQuest</Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/dashboard" className="hover:text-cyan-300">Dashboard</Link>
            <Link to="/workspace" className="hover:text-cyan-300">Workspace</Link>
            <Link to="/game" className="hover:text-cyan-300">Game</Link>
            <Link to="/leaderboard" className="hover:text-cyan-300">Leaderboard</Link>
            <Link to="/profile" className="hover:text-cyan-300">Profile</Link>
            <TopbarAuth />
          </nav>
        </div>
      </header>
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="max-w-7xl mx-auto px-4 py-6"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Dashboard /></Layout>} />
      <Route path="/auth" element={<Layout><Auth /></Layout>} />
      <Route path="/dashboard" element={<Layout><ProtectedRoute><Dashboard /></ProtectedRoute></Layout>} />
      <Route path="/workspace" element={<Layout><ProtectedRoute><Workspace /></ProtectedRoute></Layout>} />
      <Route path="/game" element={<Layout><ProtectedRoute><Game /></ProtectedRoute></Layout>} />
      <Route path="/leaderboard" element={<Layout><Leaderboard /></Layout>} />
      <Route path="/profile" element={<Layout><ProtectedRoute><Profile /></ProtectedRoute></Layout>} />
    </Routes>
  )
}
