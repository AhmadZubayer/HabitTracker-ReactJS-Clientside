import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import Router from './routes/Router'
import AuthProvider from './context/AuthProvider'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={Router} />
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            marginTop: '80px',
          },
        }}
      />
    </AuthProvider>
  </StrictMode>,
)
