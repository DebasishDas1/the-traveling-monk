import { cn } from '@/lib/utils'
import { BaseProps } from '@/types/common'

export function Grid({ children, className }: BaseProps) {
  return (
    <div className={cn('grid gap-8 md:grid-cols-2 lg:grid-cols-3', className)}>
      {children}
    </div>
  )
}
