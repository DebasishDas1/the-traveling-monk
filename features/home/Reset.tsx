import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'
import { Media, MediaHeading } from '@/components/common'

export function Reset() {
  return (
    <Section className="bg-muted/30">
      <Container className="max-w-5xl">
        <MediaHeading
          eyebrow="The Reset"
          title="You don't need another vacation."
          description="You need a reset."
          imagePosition="left"
          image={
            <Media
              src="/illustrations/not-vacation.png"
              alt="Traveller watching sunrise"
              ratio="1/1"
            />
          }
        />
      </Container>
    </Section>
  )
}
