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
        'w-full',
        align === 'center'
          ? 'mx-auto flex max-w-4xl flex-col items-center text-center'
          : 'flex max-w-3xl flex-col items-start text-left',
        className
      )}
    >
      {eyebrow && (
        <span className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-primary">
          {eyebrow}
        </span>
      )}

      <h2
        className={cn(
          'text-balance font-semibold tracking-[-0.06em] text-foreground',
          'text-5xl leading-[0.95]',
          'md:text-6xl',
          'lg:text-7xl'
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            'mt-8 text-lg leading-8 text-muted-foreground md:text-xl',
            align === 'center' ? 'max-w-2xl' : 'max-w-xl'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
