import Link from 'next/link'

import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'

import { Button } from '@/components/ui/button'

export function CTA() {
  return (
    <Section>
      <Container>
        <div className="rounded-[48px] bg-primary px-8 py-24 text-center text-primary-foreground md:px-16">
          <h2 className="mx-auto max-w-3xl text-5xl font-semibold tracking-tight">
            Ready to disconnect from the noise?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg opacity-80">
            The mountains are waiting. Your reset begins with one step.
          </p>

          <Button
            asChild
            size="lg"
            className="mt-10 rounded-full"
            variant="secondary"
          >
            <Link href="/experiences">Begin Your Reset</Link>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
