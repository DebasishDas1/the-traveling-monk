import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Container, Heading, Media } from '@/components/common'
import { stories } from '@/lib/data/stories-page'

/** Find a story by its slug. */
function getStory(slug: string) {
  return stories.find((s) => s.slug === slug)
}

/** Generate SEO metadata for each story page. */
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const story = getStory(params.slug)
  if (!story) return {}

  return {
    title: `${story.title} – ${story.category} – ${process.env.NEXT_PUBLIC_SITE_NAME ?? 'The Traveling Monk'}`,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thetravelingmonk.com'}/stories/${story.slug}`,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? 'The Traveling Monk',
      images: [
        { url: story.image, width: 1200, height: 630, alt: story.imageAlt },
      ],
      locale: 'en_IN',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: story.title,
      description: story.excerpt,
      images: [story.image],
    },
  }
}

/** Pre‑render all story pages at build time. */
export async function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }))
}

/** Story detail page component. */
export default function StoryPage({ params }: { params: { slug: string } }) {
  const story = getStory(params.slug)
  if (!story) notFound()

  return (
    <main>
      {/* Hero */}
      <Container className="pt-12">
        <Heading
          eyebrow={`Story • ${story.category}`}
          title={story.title}
          description={story.excerpt}
          size="display"
          align="center"
        />
        <div className="mt-8">
          <Media
            src={story.image}
            alt={story.imageAlt}
            ratio="16/9"
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>
      </Container>
    </main>
  )
}
