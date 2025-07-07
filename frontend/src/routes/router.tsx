// frontend/src/routes/router.tsx
import React, { Suspense, lazy } from 'react'
import { createBrowserRouter, redirect } from 'react-router-dom'

// Layout’ы
import ClientLayout from '../layouts/ClientLayout'
import AdminLayout from '../layouts/AdminLayout'

// Защищённый маршрут берём как именованный экспорт
import { ProtectedRoute } from '../components/ProtectedRoute'

// Клиентская «одностраничка» (Home рендерит всё на одном экране)
const Home = lazy(() => import('../pages/Home'))

// Админские страницы
const AdminLogin = lazy(() => import('../pages/AdminLogin'))
const Register   = lazy(() => import('../pages/Register'))
const Dashboard  = lazy(() => import('../pages/Dashboard'))
const JobAdmin   = lazy(() => import('../pages/JobAdmin'))
const AdminForms = lazy(() => import('../pages/AdminForms'))

// Обёртка для Suspense
function withSuspense(el: React.ReactNode) {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading…</div>}>
      {el}
    </Suspense>
  )
}

// Обёртка для защищённых админ-роутов
function withAuth(el: React.ReactNode) {
  return <ProtectedRoute>{withSuspense(el)}</ProtectedRoute>
}

export const router = createBrowserRouter([
  // ==== клиентская часть ====
  {
    path: '/',
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: withSuspense(<Home />),
      },
      {
        path: '*',
        loader: () => redirect('/'),
      },
    ],
  },

  // ==== админская часть ====
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      // /admin или /admin/login → страница входа
      { index: true,   element: withSuspense(<AdminLogin />) },
      { path: 'login', element: withSuspense(<AdminLogin />) },
      { path: 'register', element: withSuspense(<Register />) },

      // защищённые админ-роуты
      { path: 'dashboard', element: withAuth(<Dashboard />) },
      { path: 'jobs',      element: withAuth(<JobAdmin />) },
      { path: 'forms',     element: withAuth(<AdminForms />) },

      // всё остальное под /admin → обратно на логин
      { path: '*', loader: () => redirect('/admin') },
    ],
  },
])
