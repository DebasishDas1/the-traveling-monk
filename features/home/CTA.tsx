import Link from 'next/link'

import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/common'

export function CTA() {
  return (
    <Section>
      <Container>
        <Heading
          title="Ready to disconnect from the noise?"
          description=" The mountains are waiting. Your reset begins with one step."
        />
        <Button asChild size="lg" className="mt-10 rounded-full">
          <Link href="/experiences">Begin Your Reset</Link>
        </Button>
      </Container>
    </Section>
  )
}
