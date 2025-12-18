import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import ToastNotification from './ToastNotification'

export type ToastVariant = 'info' | 'success' | 'warning' | 'error'

export type Toast = {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

type ToastContextType = {
  addToast: (toast: Omit<Toast, 'id'>) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID()
    setToasts(prev => [...prev, { ...toast, id }])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* 🔔 ESTE ES EL CONTAINER */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 pointer-events-none max-w-sm">
        {toasts.map(toast => (
          <ToastNotification
            key={toast.id}
            {...toast}
            onClose={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}