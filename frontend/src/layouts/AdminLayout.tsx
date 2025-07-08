// frontend/src/layouts/AdminLayout.tsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/admin/AdminSidebar'

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 bg-white p-6">
        <Outlet />
      </main>
    </div>
  )
}
