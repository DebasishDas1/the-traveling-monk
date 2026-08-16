import type { ElementType } from 'react'
import { cn } from '@/lib/utils'

export type HeadingSize = 'display' | 'h1' | 'h2' | 'h3'
export type HeadingAlign = 'left' | 'center' | 'right'
export type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4'

interface HeadingProps {
  title: string
  description?: string
  eyebrow?: string

  /**
   * Visual size of the heading.
   */
  size?: HeadingSize

  /**
   * Semantic HTML heading level.
   *
   * Defaults to h1 for display and h2 for other sizes.
   * Override this when the visual size doesn't match the document hierarchy.
   */
  as?: HeadingElement

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

const alignVariants: Record<HeadingAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

export function Heading({
  title,
  description,
  eyebrow,
  size = 'display',
  as,
  align = 'left',
  className,
  titleClassName,
  descriptionClassName,
}: HeadingProps) {
  const Component: ElementType = as ?? (size === 'display' ? 'h1' : 'h2')

  return (
    <div className={cn(alignVariants[align], className)}>
      {eyebrow && (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.32em] text-primary">
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
            'mt-6 text-base leading-7 text-muted-foreground md:text-lg md:leading-8',
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
