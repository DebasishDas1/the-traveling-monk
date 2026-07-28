import { cn } from '@/lib/utils'
import { BaseProps } from '@/types/common'

export function Container({ children, className }: BaseProps) {
  return <div className={cn('container-app', className)}>{children}</div>
}
