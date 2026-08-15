import Link from 'next/link'
import {
  ArrowUpRight,
  BedDouble,
  Clock,
  MapPin,
  Utensils,
  Users,
} from 'lucide-react'

import type { Homestay } from '@/types/experience'

import { Media } from '@/components/common'
import { formatPrice } from '@/lib/utils'

interface HomestayCardProps {
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

  return image.url
    ? {
        src: image.url,
        alt: image.alt ?? fallbackAlt,
      }
    : null
}

export function HomestayCard({ experience }: HomestayCardProps) {
  const image = getImage(experience.gallery[0], experience.name)
  const price = experience.pricing?.perNight ?? experience.priceFrom

  return (
    <article>
      <Link
        href={`/homestays/${experience.slug}`}
        aria-label={`View ${experience.name}`}
        className="group block rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
      >
        {/* Image */}
        <div className="relative overflow-hidden rounded-[1.5rem] bg-muted md:rounded-[2rem]">
          {image ? (
            <Media
              src={image.src}
              alt={image.alt}
              ratio="4/3"
              className="w-full"
            />
          ) : (
            <div className="aspect-4/3 w-full bg-muted" aria-hidden="true" />
          )}

          <div className="absolute left-4 top-4 md:left-5 md:top-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur-md">
              <MapPin
                className="size-3.5 shrink-0"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              {experience.location}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="pt-5 md:pt-6">
          <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-primary">
            <BedDouble
              className="size-3.5"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <span>Homestay</span>
          </div>

          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-foreground md:text-3xl">
            {experience.name}
          </h3>

          <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground md:text-base">
            {experience.tagline}
          </p>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock
                className="size-3.5 shrink-0"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              {experience.duration}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Users
                className="size-3.5 shrink-0"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              Up to {experience.maxGuests}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Utensils
                className="size-3.5 shrink-0"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              {experience.meals}
            </span>
          </div>

          {/* Price */}
          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                {formatPrice(price)}
                <span className="ml-1.5 text-sm font-normal text-muted-foreground">
                  / night
                </span>
              </p>

              <p className="mt-1 text-xs text-muted-foreground">Per stay</p>
            </div>

            <span
              className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
              aria-hidden="true"
            >
              <ArrowUpRight className="size-4" strokeWidth={1.75} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
