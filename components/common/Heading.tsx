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
  display: 'display',
  h1: 'heading-1',
  h2: 'heading-2',
  h3: 'heading-3',
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
  const Component: ElementType =
    as ?? (size === 'display' ? 'h1' : 'h2')

  return (
    <div className={cn(alignVariants[align], className)}>
      {eyebrow && (
        <p className="eyebrow-accent mb-3">
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
            'text-pretty mt-5 text-base leading-7 text-muted-foreground md:mt-6 md:text-lg md:leading-8',
            align === 'center' && 'mx-auto',
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}