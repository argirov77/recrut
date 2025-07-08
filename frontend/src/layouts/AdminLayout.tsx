// frontend/src/layouts/AdminLayout.tsx
import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'

export default function AdminLayout() {
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()

  return (
    <div className="min-h-screen flex">
      {/* Админский сайдбар */}
      <aside className="w-60 bg-gray-100 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
          <ul className="space-y-2">
            <li><Link to="dashboard" className="hover:underline">Dashboard</Link></li>
            <li><Link to="jobs"      className="hover:underline">Jobs</Link></li>
            <li><Link to="jobs/new"  className="hover:underline">+ New Job</Link></li>
            <li><Link to="applicants" className="hover:underline">Applicants</Link></li>
          </ul>
        </div>
        {isAuthenticated && (
          <Button variant="ghost" onClick={() => {
            logout()
            navigate('/admin/login')
          }}>
            Logout
          </Button>
        )}
      </aside>

      {/* Контент админки */}
      <main className="flex-1 bg-white p-6">
        <Outlet />
      </main>
    </div>
  )
}
