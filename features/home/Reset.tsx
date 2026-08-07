import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'
import { Heading } from '@/components/common/Heading'

export function Reset() {
  return (
    <Section className="bg-muted/30">
      <Container className="max-w-5xl">
        <Heading
          eyebrow="The Reset"
          title="You don't need another vacation."
          description="You need time to breathe, reconnect, and remember who you are."
          align="center"
        />
      </Container>
    </Section>
  )
}
