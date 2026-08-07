import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'
import { SectionHeader } from '@/components/common/SectionHeader'

import { ExperienceCard, ExperienceGrid } from '@/components/experience'

// import { featuredExperiences } from './featured.data'

export function FeaturedExperiences() {
  return (
    <Section>
      <Container className="space-y-16">
        <SectionHeader
          eyebrow="Featured Experiences"
          title="Begin where your soul feels lighter."
          description="Handpicked journeys designed for stillness, adventure and genuine connection."
          action={{
            label: 'View all',
            href: '/experiences',
          }}
        />

        {/* <ExperienceGrid>
          {featuredExperiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </ExperienceGrid> */}
      </Container>
    </Section>
  )
}
