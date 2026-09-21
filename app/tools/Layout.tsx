'use client'

import { useEffect } from 'react'
import { initializeFirebase } from '@/lib/firebase/client'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ToastContainer } from '@/components/ToastContainer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    try {
      initializeFirebase()
      console.log('✅ Firebase initialized')
    } catch (error) {
      console.error('Failed to initialize Firebase:', error)
    }
  }, [])

  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          {children}
          <ToastContainer />
        </ErrorBoundary>
      </body>
    </html>
  )
}