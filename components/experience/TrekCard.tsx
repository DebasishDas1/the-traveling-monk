import type { Trek } from '@/types/experience'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Media } from '@/components/common'
import { MapPin, Mountain } from 'lucide-react'
import Link from 'next/link'

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
      <Link href={`/experiences/treks/${experience.slug}`}>
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
        </CardContent>

        <CardFooter className="mt-6 flex items-end justify-between">
          <div>
            <p className="mt-1 text-lg font-semibold tracking-[-0.02em] text-foreground">
              {experience.altitude} m /{' '}
              {Math.round(experience.altitude * 3.28084)} ft
            </p>

            <p className="mt-0.5 text-xs text-muted-foreground flex items-center gap-1">
              <Mountain className="size-3.5" strokeWidth={1.75} />
              Elevation
            </p>
          </div>

          <div>
            <p className="mt-1 text-lg font-semibold tracking-[-0.02em] text-foreground">
              {experience.duration}
            </p>

            <p className="mt-0.5 text-xs text-muted-foreground">Duration</p>
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}
