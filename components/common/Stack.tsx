import { cn } from '@/lib/utils'

interface StackProps {
  children: React.ReactNode
  className?: string
  gap?: 'sm' | 'md' | 'lg' | 'xl'
}

const gaps = {
  sm: 'space-y-4',
  md: 'space-y-6',
  lg: 'space-y-10',
  xl: 'space-y-16',
}

export function Stack({ children, gap = 'md', className }: StackProps) {
  return <div className={cn(gaps[gap], className)}>{children}</div>
}
