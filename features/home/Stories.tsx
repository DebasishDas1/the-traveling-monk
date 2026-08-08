import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'
import { Media, MediaHeading } from '@/components/common'

export function Stories() {
  return (
    <Section>
      <Container>
        <MediaHeading
          eyebrow="Stories"
          title="Some journeys stay with you."
          description="Real moments shared by our community."
          imagePosition="left"
          image={
            <Media src="/illustrations/stay-with-you.png" alt="Group around a campfire" />
          }
        />
      </Container>
    </Section>
  )
}
