import Image, { type ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

type AspectRatio = '1/1' | '3/2' | '4/3' | '4/5' | '16/9'

type MediaRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl'

const ratios: Record<AspectRatio, string> = {
  '1/1': 'aspect-square',
  '3/2': 'aspect-[3/2]',
  '4/3': 'aspect-[4/3]',
  '4/5': 'aspect-[4/5]',
  '16/9': 'aspect-video',
}

const radii: Record<MediaRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  xl: 'rounded-3xl',
}

interface MediaProps
  extends Omit<ImageProps, 'fill' | 'width' | 'height' | 'alt'> {
  src: ImageProps['src']
  alt: string

  /**
   * Controls the aspect ratio of the media container.
   */
  ratio?: AspectRatio

  /**
   * Controls the border radius of the media container.
   */
  radius?: MediaRadius

  /**
   * Controls how the image is positioned inside its crop.
   * Useful for art-directed photography.
   */
  objectPosition?: string

  /**
   * Classes applied to the outer media wrapper.
   */
  wrapperClassName?: string
}

export function Media({
  src,
  alt,
  ratio = '3/2',
  radius = 'xl',
  objectPosition = 'center',
  className,
  wrapperClassName,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props
}: MediaProps) {
  return (
    <div
      className={cn(
        'relative isolate overflow-hidden',
        ratios[ratio],
        radii[radius],
        wrapperClassName
      )}
    >
      <Image
        {...props}
        fill
        src={src}
        alt={alt}
        sizes={sizes}
        className={cn(
          'object-cover',
          'transition-transform duration-500 ease-out',
          className
        )}
        style={{
          objectPosition,
        }}
      />
    </div>
  )
}