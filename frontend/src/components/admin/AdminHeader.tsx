
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import { useAuth } from '../../context/AuthContext'

export default function AdminHeader() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  return (
    <header className="bg-white border-b border-gray-200 text-gray-900 flex items-center justify-between px-6 py-4">
      <h1 className="text-xl font-semibold">Admin Panel</h1>
      <Button variant="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  )
}
