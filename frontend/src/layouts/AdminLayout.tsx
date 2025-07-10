// frontend/src/layouts/AdminLayout.tsx
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/admin/AdminSidebar'

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 flex flex-col">
        {/* Все страницы /admin/* рендерятся здесь */}
        <Outlet />
      </main>
    </div>
  )
}
