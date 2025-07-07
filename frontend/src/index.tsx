// frontend/src/index.tsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { AuthProvider }   from './context/AuthContext'
import { AppProvider }    from './context/AppContext'
import { LanguageProvider } from './context/LanguageContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppProvider>
        <LanguageProvider>
          <RouterProvider router={router} />
        </LanguageProvider>
      </AppProvider>
    </AuthProvider>
  </React.StrictMode>
)
