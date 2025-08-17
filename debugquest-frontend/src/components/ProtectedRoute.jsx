import { Navigate } from 'react-router-dom'
import { useUserStore } from '../store/user'

export default function ProtectedRoute({ children }) {
  const token = useUserStore((s) => s.token)
  if (!token) return <Navigate to="/auth" replace />
  return children
}