import { Container, FaqSection, Media, MediaHeading } from '@/components/common'
import { faqItems } from '@/lib/data/home-page'
import { faqs } from '@/lib/data/contact-page'

export default function FAQPage() {
  return (
    <main>
      <Container>
        <MediaHeading
          eyebrow="Frequently Asked Questions"
          title="Everything you need to know about traveling with us"
          description="Whether you're traveling for the first time or you're a seasoned traveler, we've got you covered."
          image={
            <Media
              src="/illustrations/about-me.png"
              alt="Travellers discussing their journey"
              ratio="1/1"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          }
        />
      </Container>

      <FaqSection
        eyebrow="FAQ"
        title="Questions before you begin?"
        description="Everything you need to know before your first journey."
        items={faqItems}
      />
      <FaqSection
        eyebrow="Before you write"
        title="Maybe we've already answered it."
        description="Find answers to the questions we hear most often."
        items={faqs}
      />

      {/* <FaqSection
        eyebrow="Good to know"
        title="Before you go."
        description="A few things worth knowing before you pack your bag."
        items={faqs}
      /> */}
    </main>
  )
}
