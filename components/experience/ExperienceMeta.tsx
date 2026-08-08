import { CalendarDays, MapPin, Mountain } from 'lucide-react'

import { Experience } from '@/types/experience'

interface ExperienceMetaProps {
  experience: Experience
}

export function ExperienceMeta({ experience }: ExperienceMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <MapPin className="size-4" />
        <span>{experience.location}</span>
      </div>

      <div className="flex items-center gap-2">
        <CalendarDays className="size-4" />
        <span>
          {typeof experience.duration === 'string'
            ? experience.duration
            : `${experience.duration.days} Days`}
        </span>
      </div>

      {experience.altitude && (
        <div className="flex items-center gap-2">
          <Mountain className="size-4" />
          <span>
            {typeof experience.altitude === 'string'
              ? experience.altitude
              : `${experience.altitude.metres.toLocaleString()} m`}
          </span>
        </div>
      )}
    </div>
  )
}
