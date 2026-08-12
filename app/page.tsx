import { Hero } from '@/features/home/Hero/Hero'

import {
  Container,
  CtaSection,
  FaqSection,
  Heading,
  Media,
  MediaHeading,
  Page,
  Section,
  SectionHeader,
} from '@/components/common'

import { faqItems } from '@/lib/data/home-page'

export default function HomePage() {
  return (
    <Page>
      <Hero />

      {/* Modern Life */}
      <Section className="py-24 md:py-32">
        <Container>
          <MediaHeading
            eyebrow="Modern Life"
            title="Modern life is loud."
            description="Notifications. Deadlines. Endless scrolling. We forget what silence sounds like."
            size="display"
            image={
              <Media
                src="/illustrations/modern-life.png"
                alt="Traveller watching the sunrise"
                ratio="1/1"
              />
            }
          />
        </Container>
      </Section>

      {/* The Reset */}
      <Section className="bg-muted/30">
        <Container className="max-w-5xl">
          <MediaHeading
            eyebrow="The Reset"
            title="You don't need another vacation."
            description="You need a reset."
            imagePosition="left"
            image={
              <Media
                src="/illustrations/not-vacation.png"
                alt="Traveller taking a quiet moment"
                ratio="1/1"
              />
            }
          />
        </Container>
      </Section>

      {/* Featured Experiences */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Featured Experiences"
            title="Begin where your soul feels lighter."
            description="Handpicked journeys designed for stillness, adventure and genuine connection."
            action={{
              label: 'View all',
              href: '/experiences',
            }}
          />
        </Container>
      </Section>

      {/* Why We Travel */}
      <Section className="bg-muted/20">
        <Container className="max-w-4xl">
          <Heading
            eyebrow="Why We Travel"
            title="Travel changes more than your location."
            description="The mountains don't fix us. They remind us who we've always been."
            align="center"
          />
        </Container>
      </Section>

      {/* Stories */}
      <Section>
        <Container>
          <MediaHeading
            eyebrow="Stories"
            title="Some journeys stay with you."
            description="Real moments shared by our community."
            imagePosition="left"
            image={
              <Media
                src="/illustrations/stay-with-you.png"
                alt="Friends gathered around a campfire"
                ratio="1/1"
              />
            }
          />
        </Container>
      </Section>

      {/* Community */}
      <Section>
        <Container className="max-w-4xl">
          <Heading
            eyebrow="Community"
            title="Travel ends. Belonging doesn't."
            description="Meet people who become lifelong friends."
            align="center"
          />

          <div className="mt-12">
            <Media
              src="/illustrations/community.png"
              alt="Friends gathered together"
              ratio="1/1"
            />
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <FaqSection
        eyebrow="FAQ"
        title="Questions before you begin?"
        description="Everything you need to know before your first journey."
        items={faqItems}
      />

      {/* CTA */}
      <CtaSection
        eyebrow="Your next chapter"
        title="Ready to disconnect from the noise?"
        description="The mountains are waiting. Your reset begins with one step."
        buttonText="Begin Your Reset"
        link="/experiences"
      />
    </Page>
  )
}