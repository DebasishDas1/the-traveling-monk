import { ElementType } from 'react'
import { cn } from '@/lib/utils'

type HeadingSize = 'display' | 'h1' | 'h2' | 'h3'
type HeadingAlign = 'left' | 'center' | 'right'

interface HeadingProps {
  as?: ElementType
  eyebrow?: string
  title: string
  description?: string

  size?: HeadingSize
  align?: HeadingAlign

  className?: string
  titleClassName?: string
  descriptionClassName?: string
}

const titleVariants: Record<HeadingSize, string> = {
  display:
    'text-5xl font-semibold tracking-[-0.06em] leading-[0.9] md:text-7xl lg:text-[5rem]',

  h1: 'text-5xl font-semibold tracking-[-0.05em] leading-[0.92] md:text-6xl',

  h2: 'text-4xl font-semibold tracking-[-0.05em] leading-[0.95] md:text-5xl',

  h3: 'text-3xl font-semibold tracking-[-0.04em] leading-tight md:text-4xl',
}

export function Heading({
  as,
  eyebrow,
  title,
  description,
  size = 'display',
  align = 'left',
  className,
  titleClassName,
  descriptionClassName,
}: HeadingProps) {
  const Component = as ?? (size === 'display' ? 'h1' : 'h2')

  return (
    <div
      className={cn(
        align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.32em] text-primary">
          {eyebrow}
        </p>
      )}

      <Component
        className={cn(
          'text-balance text-foreground',
          titleVariants[size],
          titleClassName
        )}
      >
        {title}
      </Component>

      {description && (
        <p
          className={cn(
            'mt-8 text-lg leading-8 text-muted-foreground md:text-xl',
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}