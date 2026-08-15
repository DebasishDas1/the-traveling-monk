import type { Metadata } from 'next'
import Link from 'next/link'

import {
  Container,
  CtaSection,
  FaqSection,
  Heading,
  Media,
  MediaHeading,
  Section,
} from '@/components/common'

import { ContactForm } from '@/components/experience/ContactForm'
import { LocationMap } from '@/components/experience/LocationMap'

import { contactOptions, faqs } from '@/lib/data/contact-page'

export const metadata: Metadata = {
  title: 'Contact | The Traveling Monk',
  description:
    'Have a question about an experience, need help planning your journey, or simply want to talk? Get in touch with The Traveling Monk.',
}

export default function ContactPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <Section>
        <Container>
          <MediaHeading
            eyebrow="Get in touch"
            title="Let's talk about your next journey."
            description="Whether you know exactly where you want to go or have absolutely no idea yet, we're here."
            size="display"
            image={
              <Media
                src="/illustrations/conversation.png"
                alt="Travellers having a conversation"
                ratio="1/1"
              />
            }
          />
        </Container>
      </Section>

      {/* Contact */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
            {/* Form */}
            <div>
              <Heading
                eyebrow="Start a conversation"
                title="Tell us a little about what you're looking for."
                description="No sales pitch. No complicated forms. Just tell us what's on your mind and we'll take it from there."
                size="h2"
              />

              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            {/* Direct contact */}
            <div className="lg:pt-1">
              <Heading
                title="We like talking to people."
                description="Have questions about a trek, need help choosing an experience, or simply want to know whether a particular journey is right for you? Send us a message."
                size="h3"
              />

              <div className="mt-8 grid grid-cols-2 gap-3">
                {contactOptions.map(({ title, href, icon: Icon }) => {
                  const isExternal = href.startsWith('http')

                  return (
                    <Link
                      key={title}
                      href={href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="flex min-h-28 flex-col items-center justify-center gap-3 rounded-2xl bg-primary p-4 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <Icon aria-hidden="true" className="size-8 sm:size-9" />

                      <span className="text-center text-sm font-medium">
                        {title}
                      </span>
                    </Link>
                  )
                })}
              </div>

              <div className="mt-8">
                <LocationMap
                  geoLocation="https://maps.app.goo.gl/Mpv9rsTpxxU4Jw6d8"
                  name="The Traveling Monk | Location"
                  size="h3"
                />
              </div>
            </div>
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
    </main>
  )
}
