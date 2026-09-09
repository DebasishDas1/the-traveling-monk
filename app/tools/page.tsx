import Link from 'next/link'
import { Backpack, CalendarDays, Wallet } from 'lucide-react'
import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { Container, Media, MediaHeading } from '@/components/common'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: `Tools – ${siteConfig.name}`,
  description: 'Explore travel tools that make your trips easier.',
  openGraph: {
    title: `Tools – ${siteConfig.name}`,
    description: 'Explore travel tools that make your trips easier.',
    url: `${siteConfig.url}/tools`,
    siteName: siteConfig.name,
    images: [
      { url: '/og-image.jpg', width: 1200, height: 630, alt: siteConfig.name },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Tools – ${siteConfig.name}`,
    description: 'Explore travel tools that make your trips easier.',
    images: ['/og-image.jpg'],
  },
}

const toolList = [
  {
    title: 'SplitMate',
    description: 'Split the bill. Keep the trip moving.',
    icon: Wallet,
    href: '/tools/splitmate',
    available: true,
  },
  {
    title: 'PlanMate',
    description: 'Plan the trip together, without the chaos.',
    icon: CalendarDays,
    href: '/tools/planmate',
    available: false,
  },
  {
    title: 'PackMate',
    description: 'Pack smarter. Travel lighter.',
    icon: Backpack,
    href: '/tools/packmate',
    available: false,
  },
]

export default function ToolsPage() {
  return (
    <main>
      <Container>
        <MediaHeading
          eyebrow="Travel tools"
          title="Make your trip easier."
          description="Simple tools designed to make travelling with your people a little easier."
          size="display"
          image={
            <Media
              src="/illustrations/tool.png"
              alt="Traveller beginning a journey through the Himalayan mountains"
              ratio="1/1"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          }
        />
      </Container>

      <Container>
        <section className="pb-20">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {toolList.map((tool) => {
              const Icon = tool.icon

              const content = (
                <Card
                  className={[
                    'group flex h-full min-h-72 flex-col overflow-hidden',
                    'bg-white shadow-sm',
                    'transition-all duration-300',
                    tool.available
                      ? 'hover:-translate-y-1 hover:border-border hover:shadow-lg hover:shadow-black/5'
                      : 'opacity-60',
                  ].join(' ')}
                >
                  <CardHeader className="flex-1 p-6 sm:p-7">
                    <div className="flex items-start justify-between">
                      <div
                        className={[
                          'flex size-10 items-center justify-center rounded-full',
                          'bg-muted/70',
                          tool.available
                            ? 'transition-transform duration-300 group-hover:scale-105'
                            : '',
                        ].join(' ')}
                      >
                        <Icon className="size-32" strokeWidth={1.7} />
                      </div>
                    </div>

                    <div className="mt-auto pt-12">
                      <CardTitle className="text-3xl font-black tracking-tight">
                        {tool.title}
                      </CardTitle>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {tool.description}
                      </p>
                    </div>
                  </CardHeader>

                  {tool.available && (
                    <CardContent className="px-6 pb-6 pt-0 sm:px-7 sm:pb-7 border-none">
                      <Button>Start splitting</Button>
                    </CardContent>
                  )}

                  {!tool.available && (
                    <CardContent className="px-6 pb-6 pt-0 sm:px-7 sm:pb-7">
                      <span className="text-lg font-medium text-muted-foreground">
                        Coming soon...
                      </span>
                    </CardContent>
                  )}
                </Card>
              )

              if (!tool.available) {
                return <div key={tool.title}>{content}</div>
              }

              return (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                >
                  {content}
                </Link>
              )
            })}
          </div>
        </section>
      </Container>
    </main>
  )
}
