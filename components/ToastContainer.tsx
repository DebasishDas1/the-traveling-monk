'use client'

import { useNotificationStore } from '@/store/notifications'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

export function ToastContainer() {
  const toasts = useNotificationStore((state) => state.toasts)
  const removeToast = useNotificationStore((state) => state.removeToast)

  return (
    <div className="fixed bottom-4 right-4 space-y-2 pointer-events-none z-50">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle className="size-5 text-green-600" />,
          error: <AlertCircle className="size-5 text-red-600" />,
          info: <Info className="size-5 text-blue-600" />,
          warning: <AlertCircle className="size-5 text-yellow-600" />,
        }

        const bgColors = {
          success: 'bg-green-50 border-green-200',
          error: 'bg-red-50 border-red-200',
          info: 'bg-blue-50 border-blue-200',
          warning: 'bg-yellow-50 border-yellow-200',
        }

        const textColors = {
          success: 'text-green-900',
          error: 'text-red-900',
          info: 'text-blue-900',
          warning: 'text-yellow-900',
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex gap-3 rounded-lg border p-4 shadow-lg animate-in slide-in-from-bottom-5 ${bgColors[toast.type]}`}
          >
            {icons[toast.type]}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${textColors[toast.type]}`}>
                {toast.message}
              </p>
              {toast.action && (
                <button
                  onClick={toast.action.onClick}
                  className="mt-2 text-xs font-semibold underline hover:no-underline"
                >
                  {toast.action.label}
                </button>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-muted-foreground hover:text-foreground shrink-0"
            >
              <X className="size-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
