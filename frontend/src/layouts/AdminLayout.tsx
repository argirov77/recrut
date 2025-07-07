// frontend/src/layouts/AdminLayout.tsx

import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AppProvider } from '../context/AppContext'
import { Notification } from '../components/ui/Notification'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'

const adminNavLinks = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/jobs', label: 'Jobs' },
  { to: '/admin/forms', label: 'Applications' },
] as const

export default function AdminLayout() {
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()
  const currentYear = new Date().getFullYear()

  const linkClasses =
    'px-3 py-2 rounded-md text-sm font-medium ' +
    'text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300'

  const handleLogout = () => {
    logout()
    navigate('/admin') // вернём на страницу логина
  }

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">

        {/* Админ-Навигация */}
        <nav className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="container mx-auto px-6 flex justify-between items-center h-16">
            <div className="flex space-x-4">
              {adminNavLinks.map(({ to, label }) => (
                <Link key={to} to={to} className={linkClasses}>
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {isAuthenticated ? (
                <Button variant="ghost" onClick={handleLogout} className={linkClasses}>
                  Logout
                </Button>
              ) : (
                <Link to="/admin" className={linkClasses}>
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* Контент админки */}
        <main className="flex-1 container mx-auto px-6 py-8">
          <Outlet />
        </main>

        {/* Футер админки */}
        <footer className="bg-white dark:bg-gray-800 shadow-sm transition-colors">
          <div className="container mx-auto px-6 py-4 text-center text-gray-500 dark:text-gray-400">
            © {currentYear} Admin Panel. All rights reserved.
          </div>
        </footer>

        {/* Глобальные уведомления */}
        <Notification />
      </div>
    </AppProvider>
  )
}
