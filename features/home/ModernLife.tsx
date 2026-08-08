import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'
import { Media, MediaHeading } from '@/components/common'

export function ModernLife() {
  return (
    <Section className="py-32">
      <Container>
        <MediaHeading
          eyebrow="Modern Life"
          title="Modern life is loud."
          description="Notifications. Deadlines. Endless scrolling. We forget what silence sounds like."
          size="display"
          image={
            <Media
              src="/illustrations/modern-life.png"
              alt="Traveller watching sunrise"
              ratio="1/1"
            />
          }
        />
      </Container>
    </Section>
  )
}
