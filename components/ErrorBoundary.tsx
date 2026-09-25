'use client'

import React from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSplitMateStore } from '@/store/monk-money.store'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    // Send to error tracking service (Sentry, LogRocket, etc)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    useSplitMateStore.getState().clearGroup()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full bg-white rounded-lg border border-red-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="size-6 text-red-600" />
              <h2 className="text-lg font-semibold text-red-900">
                Something went wrong
              </h2>
            </div>

            <p className="text-sm text-red-700 mb-4">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>

            <div className="space-y-2">
              <Button
                onClick={this.handleReset}
                className="w-full"
                variant="destructive"
              >
                Start Over
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="w-full"
              >
                Refresh Page
              </Button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 text-xs">
                <summary>Error details</summary>
                <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
                  {this.state.error?.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
