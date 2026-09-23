import Link from 'next/link'
import {
  ArrowUpRight,
  Clock,
  Gauge,
  MapPin,
  Mountain,
} from 'lucide-react'

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
    <article className="group/card">
      <Link
        href={`/experiences/trek/${experience.slug}`}
        aria-label={`View ${experience.title}`}
        className="
          group block
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-ring
          focus-visible:ring-offset-4
          focus-visible:ring-offset-surface-secondary
        "
      >
        {/* Image */}
        <div className="relative overflow-hidden rounded-3xl bg-muted">
          {image ? (
            <Media
              src={image.src}
              alt={image.alt}
              ratio="4/3"
              radius="none"
              sizes="
                (max-width: 639px) 100vw,
                (max-width: 1023px) 50vw,
                42vw
              "
              className="
                transition-transform
                duration-700
                ease-[cubic-bezier(0.22,0.61,0.36,1)]
                group-hover:scale-[1.025]
              "
            />
          ) : (
            <div
              className="aspect-4/3 bg-muted"
              aria-hidden="true"
            />
          )}

          {/* Image affordance */}
          <span
            className="
              absolute right-4 top-4
              flex size-10 items-center justify-center
              rounded-full
              border border-white/30
              bg-black/20
              text-white
              opacity-0
              backdrop-blur-md
              transition-[opacity,transform]
              duration-300
              group-hover:opacity-100
              group-hover:scale-100
              scale-90
            "
            aria-hidden="true"
          >
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        {/* Content */}
        <div className="pt-5 sm:pt-6">
          {/* Location */}
          <div className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
            <MapPin
              className="size-3.5 shrink-0"
              strokeWidth={1.75}
              aria-hidden="true"
            />

            <span className="truncate">
              {experience.location}
            </span>
          </div>

          {/* Title */}
          <h3
            className="
              mt-2
              text-2xl
              font-bold
              leading-[1.08]
              tracking-[-0.035em]
              text-foreground
              sm:text-2xl
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
                leading-6
                text-muted-foreground
              "
            >
              {experience.tagline}
            </p>
          )}

          {/* Details */}
          <dl
            className="
              mt-2
              grid
              grid-cols-2
              gap-x-4
              gap-y-3
              border-y
              border-border/70
              py-4
              text-xs
              text-muted-foreground
              sm:flex
              sm:flex-wrap
              sm:items-center
              sm:gap-x-5
              sm:gap-y-2
              sm:text-sm
            "
          >
            {/* Elevation */}
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

            {/* Difficulty */}
            <div className="flex min-w-0 items-center gap-1.5">
              <Gauge
                className="size-3.5 shrink-0"
                strokeWidth={1.75}
                aria-hidden="true"
              />

              <dt className="sr-only">Difficulty</dt>

              <dd className="truncate">
                {experience.difficulty}
              </dd>
            </div>

            {/* Duration */}
            <div className="flex min-w-0 items-center gap-1.5">
              <Clock
                className="size-3.5 shrink-0"
                strokeWidth={1.75}
                aria-hidden="true"
              />

              <dt className="sr-only">Duration</dt>

              <dd className="truncate">
                {experience.duration}
              </dd>
            </div>
          </dl>

          {/* Price */}
          <div className="mt-5 flex items-baseline justify-between gap-4">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {formatPrice(experience.priceFrom)}
              </span>
               <span className="text-xl font-semibold tracking-tight text-muted-foreground line-through sm:text-2xl">
                {formatPrice(experience.priceFrom * 1.2)}
              </span>

              <span className="text-xs text-muted-foreground">
                / traveler
              </span>
            </div>

            <span
              className="
                hidden
                items-center
                gap-1
                text-sm
                font-medium
                text-foreground
                sm:inline-flex
              "
            >
              Explore
              <ArrowUpRight
                className="
                  size-3.5
                  transition-transform
                  duration-200
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}