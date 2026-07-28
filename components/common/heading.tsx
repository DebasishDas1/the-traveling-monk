import { cn } from '@/lib/utils'

interface HeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function Heading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: HeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl space-y-4',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
      )}

      <h2 className="text-balance text-4xl font-bold tracking-[-0.04em] md:text-6xl">
        {title}
      </h2>

      {description && (
        <p className="text-lg leading-8 text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
