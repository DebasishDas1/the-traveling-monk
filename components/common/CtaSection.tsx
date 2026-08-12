import { Section } from '@/components/common/Section'
import { Container } from '@/components/common/Container'
import { Heading } from '@/components/common/Heading'
import Link from 'next/link'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'

interface CtaSectionProp {
  eyebrow: string
  title: string
  description: string
  buttonText: string
  link: string
}

export function CtaSection({
  eyebrow,
  title,
  description,
  buttonText,
  link,
}: CtaSectionProp) {
  return (
    <Section>
      <Container className="flex flex-col gap-10 items-center">
        <Heading
          align="center"
          eyebrow={eyebrow}
          title={title}
          description={description}
          size="display"
        />

        <Link href={link}>
          <Button>
            {buttonText}
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </Container>
    </Section>
  )
}
