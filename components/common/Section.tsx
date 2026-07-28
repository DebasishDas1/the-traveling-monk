import { cn } from '@/lib/utils'
import { BaseProps } from '@/types/common'

interface SectionProps extends BaseProps {
  as?: 'section' | 'div' | 'main'
}

export function Section({
  as: Component = 'section',
  children,
  className,
}: SectionProps) {
  return <Component className={cn('section', className)}>{children}</Component>
}
