import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

type AspectRatio = '1/1' | '3/2' | '4/3' | '4/5' | '16/9'

const ratios: Record<AspectRatio, string> = {
  '1/1': 'aspect-square',
  '3/2': 'aspect-[3/2]',
  '4/3': 'aspect-[4/3]',
  '4/5': 'aspect-[4/5]',
  '16/9': 'aspect-video',
}

interface MediaProps extends Omit<
  ImageProps,
  'fill' | 'width' | 'height' | 'alt'
> {
  src: ImageProps['src']
  alt: string
  ratio?: AspectRatio
  rounded?: boolean
  priority?: boolean
}

export function Media({
  src,
  alt,
  ratio = '4/5',
  rounded = true,
  className,
  sizes = '(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw',
  ...props
}: MediaProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        ratios[ratio],
        rounded && 'rounded-3xl'
      )}
    >
      <Image
        fill
        src={src}
        alt={alt}
        sizes={sizes}
        className={cn('object-cover', className)}
        {...props}
      />
    </div>
  )
}
