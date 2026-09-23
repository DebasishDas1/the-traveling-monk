import type { Metadata } from 'next'
import Link from 'next/link'

import {
  Container,
  CtaSection,
  FaqSection,
  Heading,
  Media,
  MediaHeading,
  Page,
  Section,
} from '@/components/common'

import { ContactForm } from '@/components/experience/ContactForm'
import { LocationMap } from '@/components/experience/LocationMap'

import { contactOptions, faqs } from '@/lib/data/contact-page'

export const metadata: Metadata = {
  title: 'Contact The Traveling Monk',
  description:
    'Have questions about Himalayan treks, getaways, or international journeys? Contact The Traveling Monk and let us help plan your next journey.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact The Traveling Monk',
    description:
      'Questions about a trek, getaway, or journey? Get in touch with The Traveling Monk.',
    type: 'website',
    images: [
      {
        url: '/illustrations/conversation.png',
        alt: 'Travellers having a conversation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact The Traveling Monk',
    description:
      'Questions about a trek, getaway, or journey? Get in touch with The Traveling Monk.',
    images: ['/illustrations/conversation.png'],
  },
}

export default function ContactPage() {
  return (
    <Page>
      {/* Hero */}
      <Section className="pt-12 md:pt-16">
        <Container>
          <MediaHeading
            eyebrow="Get in touch"
            title="Let's talk about your next journey."
            description="Whether you know exactly where you want to go or have absolutely no idea yet, we're here."
            size="display"
            imagePosition="left"
            image={
              <Media
                src="/illustrations/conversation.png"
                alt="Travellers having a conversation"
                ratio="1/1"
                radius="xl"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            }
          />
        </Container>
      </Section>

      {/* Contact */}
      <Section className="bg-surface-secondary">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            {/* Form */}
            <section aria-labelledby="contact-form-heading">
              <Heading
                eyebrow="Start a conversation"
                title="Tell us a little about what you're looking for."
                description="No sales pitch. No complicated forms. Just tell us what's on your mind and we'll take it from there."
                size="h2"
              />

              <div className="mt-8 md:mt-10">
                <ContactForm />
              </div>
            </section>

            {/* Direct contact */}
            <aside
              aria-labelledby="direct-contact-heading"
              className="lg:pt-1"
            >
              <Heading
                title="We like talking to people."
                description="Have questions about a trek, need help choosing an experience, or simply want to know whether a particular journey is right for you? Send us a message."
                size="h3"
              />

              <nav
                aria-label="Contact options"
                className="mt-8 grid grid-cols-2 gap-3 sm:gap-4"
              >
                {contactOptions.map(
                  ({ title, href, icon: Icon }) => {
                    const isExternal = href.startsWith('http')

                    return (
                      <Link
                        key={href}
                        href={href}
                        target={isExternal ? '_blank' : undefined}
                        rel={
                          isExternal
                            ? 'noopener noreferrer'
                            : undefined
                        }
                        className="
                          group
                          flex
                          min-h-24
                          flex-col
                          items-center
                          justify-center
                          gap-3
                          rounded-2xl
                          border
                          border-border
                          bg-background
                          p-4
                          text-center
                          transition-[background-color,border-color,transform]
                          duration-200
                          hover:-translate-y-0.5
                          hover:border-input
                          hover:bg-surface
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-ring
                          focus-visible:ring-offset-2
                          focus-visible:ring-offset-surface-secondary
                          sm:min-h-28
                        "
                      >
                        <Icon
                          aria-hidden="true"
                          className="
                            size-6
                            text-accent
                            transition-transform
                            duration-200
                            group-hover:scale-105
                            sm:size-7
                          "
                          strokeWidth={1.75}
                        />

                        <span className="text-xs font-medium text-foreground sm:text-sm">
                          {title}
                        </span>
                      </Link>
                    )
                  }
                )}
              </nav>

              {/* Location */}
              <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-background p-4">
                <LocationMap
                  geoLocation="https://maps.app.goo.gl/Mpv9rsTpxxU4Jw6d8"
                  name="The Traveling Monk location"
                  size="h3"
                />
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <FaqSection
        eyebrow="Before you write"
        title="Maybe we've already answered it."
        description="Find answers to the questions we hear most often."
        items={faqs}
      />

      {/* CTA */}
      <CtaSection
        eyebrow="Ready when you are"
        title="Your next story might start with a simple hello."
        description="Let us help you find the perfect journey to reconnect with yourself and the world."
        buttonText="Start Your Journey"
        link="/experiences"
      />
    </Page>
  )
}