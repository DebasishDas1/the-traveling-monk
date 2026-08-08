import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'
import { Heading } from '@/components/common/Heading'
import { Media } from '@/components/common/Media'

export function Community() {
  return (
    <Section className="bg-muted/20">
      <Container className="max-w-4xl">
        <Heading
          eyebrow="Community"
          title="Travel ends. Belonging doesn't."
          description="Meet people who become lifelong friends."
          align="center"
        />
         <Media src="/illustrations/community.png" alt="Group around a campfire" ratio="1/1" />
      </Container>
    </Section>
  )
}
