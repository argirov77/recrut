// frontend/src/routes/router.tsx
import React, { Suspense } from 'react'
import { createBrowserRouter, redirect } from 'react-router-dom'

// Layout’ы
import ClientLayout from '../layouts/ClientLayout'
import AdminLayout  from '../layouts/AdminLayout'

// ProtectedRoute — именованный экспорт
import { ProtectedRoute } from '../components/ProtectedRoute'

// Клиентские страницы (из папки pages)
const Home      = React.lazy(() => import('../pages/Home'))
const About     = React.lazy(() => import('../pages/About'))
// const Services  = React.lazy(() => import('../pages/Services'))
// const Jobs       = React.lazy(() => import('../pages/JobList'))
// const Contact    = React.lazy(() => import('../pages/Contact'))

// Админские страницы (из папки pages)
const AdminLogin   = React.lazy(() => import('../pages/AdminLogin'))
const Dashboard    = React.lazy(() => import('../pages/Dashboard'))
const JobAdmin     = React.lazy(() => import('../pages/JobAdmin'))
const AdminForms   = React.lazy(() => import('../pages/AdminForms'))
const AdminSecurity = React.lazy(() => import('../pages/AdminSecurity'))

// Админские компоненты (дочерние маршруты)
const AdminJobList  = React.lazy(() => import('../components/admin/AdminJobList'))
const AdminJobForm  = React.lazy(() => import('../components/admin/AdminJobForm'))
const AdminApplicants = React.lazy(() => import('../components/admin/AdminApplicants'))

/** Обёртка для Suspense */
const withSuspense = (el: React.ReactElement) => (
  <Suspense fallback={<div className="py-20 text-center">Loading…</div>}>
    {el}
  </Suspense>
)

export const router = createBrowserRouter([
  // ========== Клиентская часть ==========
  {
    path: '/',
    element: <ClientLayout />,
    children: [
      { index: true,    element: withSuspense(<Home />) },
      { path: 'about',  element: withSuspense(<About />) },
      // { path: 'services', element: withSuspense(<Services />) },
      // { path: 'jobs',     element: withSuspense(<Jobs />) },
      // { path: 'contact',  element: withSuspense(<Contact />) },
      { path: '*', loader: () => redirect('/') },
    ],
  },

  // ========== Админская часть ==========
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      // /admin или /admin/login → логин
      { index: true,      element: withSuspense(<AdminLogin />) },
      { path: 'login',    element: withSuspense(<AdminLogin />) },
      // защищённый дашборд
      {
        path: 'dashboard',
        element: withSuspense(
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },

      // CRUD вакансий: список + вложенная форма
      {
        path: 'jobs',
        element: withSuspense(
          <ProtectedRoute>
            <JobAdmin />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: withSuspense(<AdminJobList />),
          },
          {
            path: 'new',
            element: withSuspense(<AdminJobForm />),
          },
          {
            path: ':jobId/edit',
            element: withSuspense(<AdminJobForm />),
          },
        ],
      },

      // управление заявками
      {
        path: 'applicants',
        element: withSuspense(
          <ProtectedRoute>
            <AdminApplicants />
          </ProtectedRoute>
        ),
      },

      // работа с формами (если нужен список, он в AdminForms)
      {
        path: 'forms',
        element: withSuspense(
          <ProtectedRoute>
            <AdminForms />
          </ProtectedRoute>
        ),
      },

      {
        path: 'security',
        element: withSuspense(
          <ProtectedRoute>
            <AdminSecurity />
          </ProtectedRoute>
        ),
      },

      // всё остальное → /admin (логин)
      { path: '*', loader: () => redirect('/admin') },
    ],
  },
])
