import AdminHeader from '../components/admin/AdminHeader'
import AdminChangePassword from '../components/admin/AdminChangePassword'

export default function AdminSecurity() {
  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <AdminHeader />
      <div className="flex-1 overflow-y-auto p-8">
        <AdminChangePassword />
      </div>
    </div>
  )
}
