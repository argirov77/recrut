import AdminHeader from '../components/admin/AdminHeader'
import AdminChangePassword from '../components/admin/AdminChangePassword'

export default function AdminSecurity() {
  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader />
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900/40">
        <AdminChangePassword />
      </div>
    </div>
  )
}
