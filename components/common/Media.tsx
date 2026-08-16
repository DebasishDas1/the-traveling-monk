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

interface MediaProps extends Omit<
  ImageProps,
  'fill' | 'width' | 'height' | 'alt'
> {
  src: ImageProps['src']
  alt: string
  ratio?: AspectRatio
  radius?: MediaRadius
  objectPosition?: string
  wrapperClassName?: string
  priority?: boolean
}

export function Media({
  src,
  alt,
  ratio = '3/2',
  radius = 'md',
  objectPosition = 'center',
  className,
  wrapperClassName,
  priority = false,
  sizes = '100vw',
  ...props
}: MediaProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        ratios[ratio],
        radii[radius],
        wrapperClassName
      )}
    >
      <Image
        {...props}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn('object-cover', className)}
        style={{ objectPosition }}
      />
    </div>
  )
}
