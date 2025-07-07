// pages/JobAdmin.tsx

import AdminHeader    from '../components/admin/AdminHeader'
import AdminSidebar   from '../components/admin/AdminSidebar'
import AdminJobList   from '../components/admin/AdminJobList'

export default function JobAdmin() {
  return (
    <div className="flex h-full">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <div className="p-6">
          <AdminJobList />
        </div>
      </div>
    </div>
  )
}
