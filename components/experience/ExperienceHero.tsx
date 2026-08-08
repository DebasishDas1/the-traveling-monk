import { Container, Heading, Media, Section } from '@/components/common'

import { Experience } from '@/types/experience'

import { ExperienceBadge } from './ExperienceBadge'
import { ExperienceMeta } from './ExperienceMeta'

interface ExperienceHeroProps {
  experience: Experience
}

export function ExperienceHero({ experience }: ExperienceHeroProps) {
  return (
    <Section>
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            {experience.category && <ExperienceBadge category={experience.category} />}

            <Heading
              title={experience.title || experience.name || ''}
              description={experience.subtitle}
            />

            <ExperienceMeta experience={experience} />
          </div>

          <div className="relative aspect-4/5 overflow-hidden rounded-3xl">
            {experience.coverImage && (
              <Media
                src={experience.coverImage.src}
                alt={experience.coverImage.alt}
                priority
                className="object-cover"
              />
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}
