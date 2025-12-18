import { useEffect, useState, useCallback } from 'react'
import type { ToastVariant } from './ToastContainer'

type ToastProps = {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
  onClose?: (id: string) => void
}

const VARIANT_STYLES: Record<ToastVariant, { bg: string; text: string; icon: string; border: string }> = {
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-800 dark:text-blue-200',
    icon: 'ℹ️',
    border: 'border-blue-200 dark:border-blue-800',
  },
  success: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-800 dark:text-green-200',
    icon: '✓',
    border: 'border-green-200 dark:border-green-800',
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    text: 'text-yellow-800 dark:text-yellow-200',
    icon: '⚠',
    border: 'border-yellow-200 dark:border-yellow-800',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-800 dark:text-red-200',
    icon: '✕',
    border: 'border-red-200 dark:border-red-800',
  },
}

export default function ToastNotification({
  id,
  title,
  description,
  variant = 'info',
  duration = 4000,
  onClose,
}: ToastProps) {
  const [closing, setClosing] = useState(false)
  const [mounted, setMounted] = useState(false)

  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      onClose?.(id)
    }, 300)
  }, [id, onClose])

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      handleClose()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, handleClose])

  const styles = VARIANT_STYLES[variant]

  return (
    <div
      className={`
        pointer-events-auto w-80 rounded-lg border-2 p-4 shadow-xl
        transition-all duration-300 ease-out
        ${styles.bg}
        ${styles.border}
        ${mounted && !closing ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div className={`flex-shrink-0 text-xl ${styles.text}`}>
          {styles.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={`font-semibold ${styles.text}`}>{title}</p>
          {description && (
            <p className={`mt-1 text-sm ${styles.text} opacity-80`}>
              {description}
            </p>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className={`flex-shrink-0 ${styles.text} opacity-60 hover:opacity-100 transition-opacity`}
          aria-label="Close toast"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}