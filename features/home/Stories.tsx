import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'
import { Heading } from '@/components/common/Heading'

export function Stories() {
  return (
    <Section>
      <Container>
        <Heading
          eyebrow="Stories"
          title="Some journeys stay with you."
          description="Real moments shared by our community."
        />

        <div className="mt-16 h-96 rounded-[40px] border border-dashed" />
      </Container>
    </Section>
  )
}
