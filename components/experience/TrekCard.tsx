import Link from 'next/link'
import { Clock, Gauge, MapPin, Mountain } from 'lucide-react'

import { Media } from '@/components/common'
import type { Trek } from '@/types/experience'
import { formatPrice, getImage } from '@/lib/utils'

interface TrekCardProps {
  experience: Trek
}

export function TrekCard({ experience }: TrekCardProps) {
  const firstImage = experience.gallery?.[0]
  const image = getImage(firstImage, experience.title)

  const altitudeFeet = Math.round(experience.altitude * 3.28084)

  return (
    <article>
      <Link
        href={`/treks/${experience.slug}`}
        aria-label={`View ${experience.title}`}
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
              rounded-xl
              transition-transform
              duration-500
              ease-out
              group-hover:scale-[1.015]
            "
          />
        ) : (
          <div className="aspect-4/3 rounded-xl bg-muted" aria-hidden="true" />
        )}

        {/* Content */}
        <div className="pt-4 sm:pt-5">
          {/* Location */}
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
              sm:text-2xl
              lg:text-[1.65rem]
            "
          >
            {experience.title}
          </h3>

          {/* Tagline */}
          {experience.tagline && (
            <p
              className="
                mt-1
                text-sm
                leading-5
                text-muted-foreground
              "
            >
              {experience.tagline}
            </p>
          )}

          {/* Details */}
          <dl
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
            <div className="flex min-w-0 items-center gap-1.5">
              <Mountain
                className="size-3.5 shrink-0"
                strokeWidth={1.75}
                aria-hidden="true"
              />

              <dt className="sr-only">Elevation</dt>

              <dd className="truncate">
                {experience.altitude.toLocaleString()}m
                <span className="text-muted-foreground/60">
                  {' '}
                  / {altitudeFeet.toLocaleString()}ft
                </span>
              </dd>
            </div>

            <div className="flex min-w-0 items-center gap-1.5">
              <Gauge
                className="size-3.5 shrink-0"
                strokeWidth={1.75}
                aria-hidden="true"
              />

              <dt className="sr-only">Difficulty</dt>

              <dd className="truncate">{experience.difficulty}</dd>
            </div>

            <div className="flex min-w-0 items-center gap-1.5">
              <Clock
                className="size-3.5 shrink-0"
                strokeWidth={1.75}
                aria-hidden="true"
              />

              <dt className="sr-only">Duration</dt>

              <dd className="truncate">{experience.duration}</dd>
            </div>
          </dl>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-xl font-semibold tracking-tight sm:text-2xl">
              {formatPrice(experience.priceFrom)}
              <span className="ml-3 text-2xl font-normal text-muted-foreground line-through">
                {formatPrice(experience.priceFrom * 0.75)}
              </span>
            </span>

            <span className="text-xs text-muted-foreground">/ traveler</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
