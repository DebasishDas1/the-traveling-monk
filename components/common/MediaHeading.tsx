import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Heading } from './Heading'

type ImagePosition = 'left' | 'right' | 'bottom'
type HeadingSize = 'display' | 'h1' | 'h2' | 'h3'

interface MediaHeadingProps {
  eyebrow?: string
  title: string
  description?: string

  image?: ReactNode

  /**
   * Controls the complete text/media composition.
   *
   * right  → text left, image right
   * left   → image left, text right
   * bottom → centered text, image below
   */
  imagePosition?: ImagePosition

  size?: HeadingSize

  className?: string
  contentClassName?: string
  mediaClassName?: string
}

export function MediaHeading({
  eyebrow,
  title,
  description,
  image,
  imagePosition = 'right',
  size = 'display',
  className,
  contentClassName,
  mediaClassName,
}: MediaHeadingProps) {
  const isBottom = imagePosition === 'bottom'
  const imageFirst = imagePosition === 'left'

  if (isBottom) {
    return (
      <div
        className={cn(
          'flex w-full flex-col items-center gap-12',
          'md:gap-16 lg:gap-20',
          className
        )}
      >
        <div
          className={cn(
            'w-full max-w-3xl text-center',
            contentClassName
          )}
        >
          <Heading
            eyebrow={eyebrow}
            title={title}
            description={description}
            size={size}
            align="center"
          />
        </div>

        {image && (
          <div
            className={cn(
              'w-full overflow-hidden',
              mediaClassName
            )}
          >
            {image}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'grid w-full items-center',
        'grid-cols-1 gap-10',
        'md:gap-12',
        'lg:grid-cols-2 lg:gap-20',
        className
      )}
    >
      <div
        className={cn(
          imageFirst && 'lg:order-2',
          contentClassName
        )}
      >
        <Heading
          eyebrow={eyebrow}
          title={title}
          description={description}
          size={size}
          align="left"
        />
      </div>

      {image && (
        <div
          className={cn(
            imageFirst && 'lg:order-1',
            'w-full overflow-hidden',
            mediaClassName
          )}
        >
          {image}
        </div>
      )}
    </div>
  )
}