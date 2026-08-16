import Link from 'next/link'
import { BedDouble, Clock, MapPin, Utensils, Users } from 'lucide-react'

import type { Homestay } from '@/types/experience'
import { Media } from '@/components/common'
import { formatPrice } from '@/lib/utils'

interface HomeStayCardProps {
  experience: Homestay
}

function getImage(
  image: Homestay['gallery'][number] | undefined,
  fallbackAlt: string
) {
  if (!image) return null

  if (typeof image === 'string') {
    return {
      src: image,
      alt: fallbackAlt,
    }
  }

  // Handle image objects with src or url
  if ('url' in image) {
    return {
      src: image.url,
      alt: image.alt || fallbackAlt,
    }
  }

  if ('src' in image) {
    return {
      src: image.src,
      alt: image.alt || fallbackAlt,
    }
  }

  return null
}

export function HomeStayCard({ experience }: HomeStayCardProps) {
  const image = getImage(experience.gallery?.[0], experience.name)

  const price = experience.pricing?.perNight ?? experience.priceFrom

  return (
    <article>
      <Link
        href={`/homestays/${experience.slug}`}
        aria-label={`View ${experience.name}`}
        className="
          group block
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-primary
          focus-visible:ring-offset-4
        "
      >
        {/* Image */}
        {image ? (
          <Media
            src={image.src}
            alt={image.alt}
            ratio="4/3"
            sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 50vw,
                50vw
              "
            className="
                transition-transform
                duration-500
                ease-out
                group-hover:scale-[1.015]
              "
          />
        ) : (
          <div className="aspect-4/3 w-full bg-muted" aria-hidden="true" />
        )}

        {/* Content */}
        <div className="pt-4 sm:pt-5">
          {/* Type */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
            <BedDouble
              className="size-3.5 shrink-0"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            Homestay
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
            <MapPin
              className="size-3.5 shrink-0"
              strokeWidth={1.75}
              aria-hidden="true"
            />

            <span className="truncate">{experience.location}</span>
          </div>

          {/* Title */}
          <h3
            className="
              mt-1.5
              text-xl
              font-semibold
              leading-tight
              tracking-[-0.035em]
              text-foreground
              sm:text-2xl
              lg:text-[1.65rem]
            "
          >
            {experience.name}
          </h3>

          {/* Tagline */}
          {experience.tagline && (
            <p
              className="
                mt-1
                text-sm
                text-muted-foreground
              "
            >
              {experience.tagline}
            </p>
          )}

          {/* Facts */}
          <div
            className="
              mt-4
              grid
              grid-cols-2
              gap-x-4
              gap-y-2
              text-xs
              text-muted-foreground
              sm:flex
              sm:flex-wrap
              sm:gap-x-5
              sm:text-sm
            "
          >
            {experience.duration && (
              <span className="inline-flex min-w-0 items-center gap-1.5">
                <Clock
                  className="size-3.5 shrink-0"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span className="truncate">{experience.duration}</span>
              </span>
            )}

            {experience.maxGuests && (
              <span className="inline-flex min-w-0 items-center gap-1.5">
                <Users
                  className="size-3.5 shrink-0"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span className="truncate">Up to {experience.maxGuests}</span>
              </span>
            )}

            {experience.meals && (
              <span className="inline-flex min-w-0 items-center gap-1.5">
                <Utensils
                  className="size-3.5 shrink-0"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span className="truncate">{experience.meals}</span>
              </span>
            )}
          </div>

          {/* Price */}
          <div className="mt-4 flex items-end justify-between">
            <div className="min-w-0">
              <div className="flex items-baseline gap-1.5">
                <span
                  className="
                    text-xl
                    font-semibold
                    tracking-tight
                    sm:text-2xl
                  "
                >
                  {formatPrice(price)}
                </span>

                <span className="text-xs text-muted-foreground">/ night</span>
              </div>

              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Per room
              </p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
