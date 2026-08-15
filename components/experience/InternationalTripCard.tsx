import Link from 'next/link'
import { Clock, Globe2, Users } from 'lucide-react'

import type { International } from '@/types/experience'
import { formatPrice } from '@/lib/utils'
import { Media } from '@/components/common'
import { Badge } from '@/components/ui/badge'

interface InternationalTripCardProps {
  experience: International
}

export function InternationalTripCard({
  experience,
}: InternationalTripCardProps) {
  const image = experience.gallery[0]

  const src = typeof image === 'string' ? image : (image?.url ?? '')

  const alt =
    typeof image === 'string'
      ? experience.name
      : (image?.alt ?? experience.name)

  return (
    <Link href={`/international/${experience.slug}`} className="group block">
      <div className="overflow-hidden rounded-3xl">
        <Media
          src={src}
          alt={alt}
          ratio="4/3"
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="pt-5">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            <Globe2 className="size-3.5" />
            {experience.country}
          </span>

          <Badge variant="secondary">{experience.tier}</Badge>
        </div>

        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
          {experience.name}
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          {experience.tagline}
        </p>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {experience.duration}
          </span>

          <span className="flex items-center gap-1.5">
            <Users className="size-3.5" />
            Up to {experience.maxGroupSize}
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground">From</p>

            <p className="text-xl font-semibold">
              {formatPrice(experience.priceFrom)}
            </p>
          </div>

          <span className="text-sm font-medium transition-transform group-hover:translate-x-1">
            Explore →
          </span>
        </div>
      </div>
    </Link>
  )
}
