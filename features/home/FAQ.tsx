import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'
import { Heading } from '@/components/common/Heading'

export function FAQ() {
  return (
    <Section>
      <Container className="max-w-4xl">
        <Heading
          eyebrow="FAQ"
          title="Questions before you begin?"
          description="Everything you need to know before your first journey."
          align="center"
        />
      </Container>
    </Section>
  )
}
