import { cn } from '@/lib/utils'
import { BaseProps } from '@/types/common'

export function ExperienceGrid({ children, className }: BaseProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  )
}
