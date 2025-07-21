import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const result = await login({ email, password })
    if (result.success) {
      navigate('/admin/dashboard', { replace: true })
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow px-6 py-6">
      <h1 className="text-primary font-heading text-2xl lg:text-3xl mb-4">Admin Sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-primary">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-md px-4 py-2 text-primary placeholder-gray-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-primary">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-md px-4 py-2 text-primary placeholder-gray-400"
          />
        </div>
        {error && <div className="text-accentRed">{error}</div>}
        <div className="flex items-center justify-between">
          <Link to="/admin/register" className="text-accentCyan hover:underline">
            Register
          </Link>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in…' : 'Login'}
          </Button>
        </div>
      </form>
    </div>
  )
}
