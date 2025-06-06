import { useEffect } from 'react'
import LoginForm from '../features/auth/LoginForm'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      navigate('/admin/forms', { replace: true })
    }
  }, [isAuthenticated, user, navigate])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Admin Sign in
          </h2>
        </div>
        <LoginForm onSuccess={() => navigate('/admin/forms')} />
      </div>
    </div>
  )
}
