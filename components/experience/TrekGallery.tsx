import { Media } from '@/components/common'
import { cn } from '@/lib/utils'

interface TrekGalleryProps {
  images: Array<
    | {
        url: string
        alt?: string
      }
    | string
  >
  title: string
}

function normalizeImage(
  image: TrekGalleryProps['images'][number],
  fallbackAlt: string
) {
  if (typeof image === 'string') {
    return {
      src: image,
      alt: fallbackAlt,
    }
  }

  return {
    src: image.url,
    alt: image.alt || fallbackAlt,
  }
}

export function TrekGallery({ images, title }: TrekGalleryProps) {
  const gallery = images
    .slice(0, 6)
    .map((image) => normalizeImage(image, title))
    .filter((image) => image.src)

  if (!gallery.length) return null

  return (
    <section className="py-20 md:py-32">
      <div className="mb-10 md:mb-14">
        <p className="text-[10px] font-medium uppercase text-primary">
          From the trail
        </p>

        <h2 className="mt-4 text-4xl font-semibold tracking-tighter md:text-5xl">
          A few moments from the journey.
        </h2>
      </div>

      <div
        className={cn(
          'grid gap-3',
          'grid-cols-2',
          'md:grid-cols-3',
          'md:grid-rows-2'
        )}
      >
        {gallery.map((image, index) => (
          <Media
            key={index}
            src={image.src}
            alt={image.alt}
            className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-[1.025]
                "
            radius="sm"
          />
        ))}
      </div>
    </section>
  )
}
