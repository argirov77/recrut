// frontend/src/components/ProtectedRoute.tsx
import React from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <div className="py-20 text-center text-sm text-muted-foreground">Проверка прав доступа…</div>
  }

  if (!isAuthenticated) {
    // не авторизованы — на login
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  const isAdmin = user?.role === 'admin' || Boolean((user as { is_superuser?: boolean } | null)?.is_superuser)

  if (!isAdmin) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
        <h2 className="text-2xl font-semibold">Недостаточно прав</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          У вас нет доступа к административной панели. Обратитесь к администратору, если считаете, что это ошибка.
        </p>
        <Link
          to="/"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          Вернуться на сайт
        </Link>
      </div>
    )
  }

  return <>{children}</>
}
