import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'
import { Heading } from '@/components/common/Heading'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDownIcon } from 'lucide-react'

const faqItems = [
  {
    id: '01',
    question: 'What is included in the trip?',
    answer:
      'Every experience is different, but the inclusions are clearly listed on its experience page. You will always know what is covered before you book.',
  },
  {
    id: '02',
    question: 'Do I need trekking experience?',
    answer:
      'Not always. Each experience has its own difficulty level, and we clearly mention what you can expect before you join.',
  },
  {
    id: '03',
    question: 'Can I travel alone?',
    answer:
      'Absolutely. Many people join us on their own. You may arrive solo, but shared experiences have a funny way of changing that.',
  },
  {
    id: '04',
    question: 'What happens if I need to cancel?',
    answer:
      'Our cancellation and refund policy depends on the experience. You will see the applicable policy before completing your booking.',
  },
  {
    id: '05',
    question: 'How large are the groups?',
    answer:
      'Group sizes vary by experience. We intentionally keep groups manageable so the journey feels personal rather than crowded.',
  },
  {
    id: '06',
    question: 'What should I pack?',
    answer:
      'Your experience page includes a practical packing guide with everything you need for the journey.',
  },
]

export function FAQ() {
  return (
    <Section>
      <Container className="max-w-4xl">
        <Heading
          eyebrow="FAQ"
          title="Questions before you begin?"
          description="Everything you need to know before your first journey."
          align="center"
        />
        <div className="mt-8 flex flex-col gap-2">
          {faqItems.map((faq, index) => (
            <Collapsible
              key={index}
              className="rounded-lg bg-primary bg-card p-4 text-white"
            >
              <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between text-lg font-medium text-start">
                <span>{faq.question}</span>
                <ChevronDownIcon className="h-4 w-4 shrink-0" />
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-4 pt-4">
                <p>{faq.answer}</p>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </Container>
    </Section>
  )
}
