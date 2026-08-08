import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'
import { Heading } from '@/components/common/Heading'

import { ExperienceCard } from '@/components/experience/TrekCard'
import { Experience } from '@/types/experience'

const mockExperiences: Experience[] = [
  {
    id: '1',
    slug: 'himalayan-retreat',
    title: 'Himalayan Retreat',
    subtitle: 'Find peace in the mountains',
    category: 'trek',
    location: 'Himachal Pradesh, India',
    duration: { days: 5, nights: 4 },
    difficulty: 'moderate',
    season: ['spring', 'autumn'],
    coverImage: {
      id: 'img1',
      src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=3540&auto=format&fit=crop',
      alt: 'Himalayas',
    },
    gallery: [],
    highlights: [],
    timeline: [],
    pricing: { amount: 15000, currency: 'INR' },
    shortDescription:
      'A mindful journey into the Himalayas designed to slow you down.',
    description: 'Detailed description here...',
    featured: true,
  },
]

export function FeaturedExperiences() {
  return (
    <Section>
      <Container>
        <Heading
          eyebrow="Experiences"
          title="Choose your reset."
          description="Journeys designed to slow you down."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {mockExperiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
