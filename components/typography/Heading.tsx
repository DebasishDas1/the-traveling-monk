import { cn } from '@/lib/utils'

interface HeadingProps {
  title: string
  subtitle?: string
  className?: string
}

export function Heading({ title, subtitle, className }: HeadingProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <h2 className="heading-2 text-balance">{title}</h2>

      {subtitle && <p className="body max-w-2xl">{subtitle}</p>}
    </div>
  )
}
