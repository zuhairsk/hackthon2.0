import { Link } from 'react-router-dom'
import { useUserStore } from '../store/user'

export default function TopbarAuth() {
  const token = useUserStore((s) => s.token)
  const logout = useUserStore((s) => s.logout)
  if (token) return <button onClick={logout} className="text-sm text-white/80 hover:text-white">Logout</button>
  return <Link to="/auth" className="text-sm text-white/80 hover:text-white">Login</Link>
}