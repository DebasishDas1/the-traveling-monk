import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'
import { Heading } from '@/components/common/Heading'

export function WhyWeTravel() {
  return (
    <Section className="bg-muted/20">
      <Container className="max-w-4xl">
        <Heading
          eyebrow="Why We Travel"
          title="Travel changes more than your location."
          description="The mountains don't fix us. They remind us who we've always been."
          align="center"
        />
      </Container>
    </Section>
  )
}
