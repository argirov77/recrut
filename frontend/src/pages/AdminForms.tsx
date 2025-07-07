// pages/AdminForms.tsx

import AdminHeader      from '../components/admin/AdminHeader'
import AdminSidebar     from '../components/admin/AdminSidebar'
import AdminApplicants  from '../components/admin/AdminApplicants'

export default function AdminForms() {
  return (
    <div className="flex h-full">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <div className="p-6">
          <AdminApplicants />
        </div>
      </div>
    </div>
  )
}
