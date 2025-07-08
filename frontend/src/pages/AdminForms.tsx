// pages/AdminForms.tsx

import AdminHeader     from '../components/admin/AdminHeader'
import AdminApplicants from '../components/admin/AdminApplicants'

export default function AdminForms() {
  return (
    <div className="flex-1">
      <AdminHeader />
      <div className="p-6">
        <AdminApplicants />
      </div>
    </div>
  )
}
