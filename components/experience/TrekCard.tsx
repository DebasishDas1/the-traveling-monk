import type { Trek } from '@/types/experience'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Media } from '@/components/common'
import { Calendar, Clock, MapPin, Mountain } from 'lucide-react'
import Link from 'next/link'

import { formatPrice } from '@/lib/utils'

interface ExperienceCardProps {
  experience: Trek
}

export const TrekCard = ({ experience }: ExperienceCardProps) => {
  const imageSrc =
    typeof experience.gallery[0] === 'string'
      ? experience.gallery[0]
      : (experience.gallery[0]?.url ?? '')

  return (
    <Card className="bg-white shadow-xl p-0">
      <Link href={`/treks/${experience.slug}`}>
        <Media src={imageSrc} alt={experience.title} />
        <CardContent className="mt-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" strokeWidth={1.75} />
            <span>{experience.location}</span>
          </div>

          {/* Title */}
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-foreground transition-opacity duration-200 group-hover:opacity-80 md:text-3xl">
            {experience.title}
          </h3>

          {/* Tagline */}
          <p className="text-muted-foreground">{experience.tagline}</p>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground pt-6">
            <Mountain className="size-3.5" strokeWidth={1.75} />
            Elevation: {experience.altitude} m /{' '}
            {Math.round(experience.altitude * 3.28084)} ft
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground pt-2">
            <Calendar className="size-3.5" strokeWidth={1.75} />
            Difficulty: {experience.difficulty}
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground pt-2">
            <Clock className="size-3.5" strokeWidth={1.75} />
            Duration: {experience.duration}
          </div>
        </CardContent>

        <CardFooter className="mt-6 flex items-end justify-between border-0">
          <div>
            <p className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-foreground">
              {formatPrice(experience.priceFrom)}
              <span className="ml-3 text-2xl font-normal text-muted-foreground line-through">
                {formatPrice(experience.priceFrom * 0.75)}
              </span>
            </p>

            <p className="mt-0.5 text-xs text-muted-foreground flex items-center gap-1">
              Per Traveler
            </p>
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}
