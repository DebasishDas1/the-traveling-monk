import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDownIcon } from 'lucide-react'

import { Section } from '@/components/common/Section'
import { Container } from '@/components/common/Container'
import { Heading } from '@/components/common/Heading'

interface FAQItem {
  question: string
  answer: string
}

interface FaqSectionProps {
  eyebrow: string
  title: string
  description: string
  items: FAQItem[]
}

export function FaqSection({
  eyebrow,
  title,
  description,
  items,
}: FaqSectionProps) {
  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-24">
        {/* Header */}
        <div className="lg:col-span-4">
          <Heading
            eyebrow={eyebrow}
            title={title}
            description={description}
            size="h2"
          />
        </div>

        {/* FAQs */}
        <div className="space-y-2 lg:col-span-8">
          {items.map(({ question, answer }, index) => (
            <Collapsible
              key={`${question}-${index}`}
              className="group rounded-lg p-4 bg-primary text-white"
            >
              <CollapsibleTrigger
                className="
                  flex w-full items-center justify-between gap-4
                  text-left text-lg font-medium
                  transition-colors
                  [&[data-state=open]>svg]:rotate-180
                "
              >
                <span>{question}</span>

                <ChevronDownIcon
                  aria-hidden="true"
                  className="
                    size-5 shrink-0
                    transition-transform duration-200
                  "
                />
              </CollapsibleTrigger>

              <CollapsibleContent
                className="pt-4 text-white/80"
              >
                <p>{answer}</p>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </Container>
    </Section>
  )
}