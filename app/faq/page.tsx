import {
  Container,
  FaqSection,
  Media,
  MediaHeading,
  Page,
  Section,
} from '@/components/common'

import { faqItems } from '@/lib/data/home-page'
import { faqs } from '@/lib/data/contact-page'

export default function FAQPage() {
  return (
    <Page>
      {/* Hero */}
      <Section className="pt-12 md:pt-16">
        <Container>
          <MediaHeading
            eyebrow="Questions, answered"
            title="Before you pack your bag, let's clear a few things up."
            description="First trek? Seasoned traveller? Somewhere beautifully in between? Here's what you probably want to know before heading out with us."
            size="display"
            image={
              <Media
                src="/illustrations/about-me.png"
                alt="Travellers discussing their journey"
                ratio="1/1"
                radius="xl"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            }
          />
        </Container>
      </Section>

      {/* General */}
      <FaqSection
        eyebrow="Start here"
        title="The basics"
        description="The things you're probably wondering before booking your first journey with us."
        items={faqItems}
      />

      {/* Before you go */}
      <Section className="bg-surface-secondary">
        <FaqSection
          eyebrow="Before you go"
          title="A few things worth knowing."
          description="Packing, planning, logistics and everything that happens before you hit the trail."
          items={faqs}
        />
      </Section>

      {/* Still curious */}
      <Section>
        <Container>
          <div className="rounded-[2rem] bg-primary px-6 py-12 text-primary-foreground md:px-12 md:py-16 lg:px-16">
              <p className="eyebrow text-primary-foreground/60">
                Still curious?
              </p>

              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.035em] md:text-5xl">
                Some questions are easier to answer over a conversation.
              </h2>

              <p className="mt-5 text-base leading-7 text-primary-foreground/70 md:text-lg">
                If you couldn't find what you were looking for, just ask.
                We're humans. We talk to humans.
              </p>

              <a
                href="/contact"
                className="
                  mt-8
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  rounded-full
                  bg-primary-foreground
                  px-5
                  text-sm
                  font-medium
                  text-primary
                  transition-transform
                  duration-200
                  hover:-translate-y-0.5
                  active:scale-[0.98]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-ring
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-primary
                "
              >
                Ask us anything
              </a>
          </div>
        </Container>
      </Section>
    </Page>
  )
}