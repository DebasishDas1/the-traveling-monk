import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { trekData } from '@/lib/data/trek-data'
import { OfferingType, type Trek } from '@/types/experience'
import { Container, Heading, Section } from '@/components/common'
import dynamic from 'next/dynamic'

const CompletionFlow = dynamic(() =>
  import('@/components/experience/CompletionFlow').then((m) => m.CompletionFlow)
)

function getTrek(slug: string): Trek | undefined {
  return trekData.find(
    (trek): trek is Trek =>
      trek.type === OfferingType.TREK && trek.active && trek.slug === slug
  )
}

export function generateStaticParams() {
  return trekData
    .filter(
      (trek): trek is Trek => trek.type === OfferingType.TREK && trek.active
    )
    .map((trek) => ({
      trekSlug: trek.slug,
    }))
}

export const dynamicParams = false

interface CompletionPageProps {
  params: Promise<{
    trekSlug: string
  }>
}

export async function generateMetadata({
  params,
}: CompletionPageProps): Promise<Metadata> {
  const { trekSlug } = await params
  const trek = getTrek(trekSlug)

  if (!trek) {
    return { title: 'Trek not found' }
  }

  return {
    title: `Celebrate ${trek.title} | The Traveling Monk`,
    description: `Share your ${trek.title} completion and inspire others`,
  }
}

export default async function CompletionPage({ params }: CompletionPageProps) {
  const { trekSlug } = await params
  const trek = getTrek(trekSlug)

  if (!trek) {
    notFound()
  }

  return (
    <main>
      <Section>
        <Container>
          <Heading
            align="center"
            eyebrow="Trek Completion"
            title="You conquered the mountain."
            description={`Now share your ${trek.title} journey with the world.`}
            size="display"
          />
          <CompletionFlow trek={trek} />
        </Container>
      </Section>
    </main>
  )
}
