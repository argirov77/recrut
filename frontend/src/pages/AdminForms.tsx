// pages/AdminForms.tsx

import AdminHeader     from '../components/admin/AdminHeader'
import AdminApplicants from '../components/admin/AdminApplicants'

export default function AdminForms() {
  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <AdminHeader />
      <div className="flex-1 p-8">
        <AdminApplicants />
      </div>
    </div>
  )
}
