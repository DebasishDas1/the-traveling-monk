import Link from 'next/link'
import { Clock, MapPin, Users } from 'lucide-react'

import type { International } from '@/types/experience'
import { formatPrice, getImage } from '@/lib/utils'
import { Media } from '@/components/common'

interface InternationalTripCardProps {
  experience: International
}

export function InternationalTripCard({
  experience,
}: InternationalTripCardProps) {
  const firstImage = experience.gallery?.[0]
  const image = getImage(firstImage, experience.name)

  return (
    <article>
      <Link
        href={`/international/${experience.slug}`}
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
        <div className="relative overflow-hidden rounded-2xl bg-muted">
          {image ? (
            <Media
              src={image.src}
              alt={image.alt}
              ratio="4/3"
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 50vw,
                33vw
              "
              className="
                transition-transform
                duration-500
                ease-out
                group-hover:scale-[1.02]
              "
            />
          ) : (
            <div className="aspect-4/3 w-full bg-muted" aria-hidden="true" />
          )}
        </div>

        {/* Content */}
        <div className="pt-4 sm:pt-5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
            <MapPin
              className="size-3.5 shrink-0"
              strokeWidth={1.75}
              aria-hidden="true"
            />

            <span className="truncate">{experience.country}</span>
          </div>

          <h3 className="text-xl font-semibold leading-tight tracking-[-0.04em] text-foreground sm:text-2xl">
            {experience.name}
          </h3>

          {experience.tagline && (
            <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
              {experience.tagline}
            </p>
          )}

          {/* Facts */}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground sm:text-sm">
            {experience.duration && (
              <span className="inline-flex items-center gap-1.5">
                <Clock
                  aria-hidden="true"
                  className="size-3.5 shrink-0"
                  strokeWidth={1.75}
                />
                {experience.duration}
              </span>
            )}

            {experience.maxGroupSize && (
              <span className="inline-flex items-center gap-1.5">
                <Users
                  aria-hidden="true"
                  className="size-3.5 shrink-0"
                  strokeWidth={1.75}
                />
                Up to {experience.maxGroupSize}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-xl font-semibold tracking-tight sm:text-2xl">
              {formatPrice(experience.priceFrom)}
            </span>

            <span className="text-xs text-muted-foreground">/ traveler</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
