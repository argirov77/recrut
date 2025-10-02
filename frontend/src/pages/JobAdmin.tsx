// frontend/src/pages/JobAdmin.tsx
import { Outlet } from 'react-router-dom'
import AdminHeader from '../components/admin/AdminHeader'

export default function JobAdmin() {
  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <AdminHeader />
      <div className="flex-1 p-8">
        {/* Тут будут либо список, либо форма */}
        <Outlet />
      </div>
    </div>
  )
}
