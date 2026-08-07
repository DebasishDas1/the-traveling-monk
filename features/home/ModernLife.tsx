import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'
import { Heading } from '@/components/common/Heading'

export function ModernLife() {
  return (
    <Section className="py-32">
      <Container>
        <Heading
          align="center"
          eyebrow="Modern Life"
          title="Modern life is loud."
          description="Notifications. Deadlines. Endless scrolling. We forget what silence sounds like."
        />
      </Container>
    </Section>
  )
}
