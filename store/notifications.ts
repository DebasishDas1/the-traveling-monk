'use client'

import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface NotificationStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => string
  removeToast: (id: string) => void
  clearAll: () => void
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  toasts: [],

  addToast: (toast) => {
    const id = crypto.randomUUID()
    const newToast: Toast = { ...toast, id }

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }))

    // Auto-remove after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        get().removeToast(id)
      }, toast.duration ?? 3000)
    }

    return id
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  clearAll: () =>
    set(() => ({
      toasts: [],
    })),
}))

// Hook for easier usage
export function useToast() {
  const { addToast } = useNotificationStore()

  return {
    success: (message: string, duration?: number) =>
      addToast({ message, type: 'success', duration }),
    error: (message: string, duration?: number) =>
      addToast({ message, type: 'error', duration }),
    info: (message: string, duration?: number) =>
      addToast({ message, type: 'info', duration }),
    warning: (message: string, duration?: number) =>
      addToast({ message, type: 'warning', duration }),
  }
}
