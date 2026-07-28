import { BaseProps } from '@/types/common'

export function Page({ children }: BaseProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {children}
    </main>
  )
}
