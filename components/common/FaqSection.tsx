import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ArrowUpRight, ChevronDownIcon } from 'lucide-react'

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
    <Section className="overflow-hidden">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-24">
        {/* Header */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <Heading
              eyebrow={eyebrow}
              title={title}
              description={description}
              size="h2"
            />

            <div className="mt-8 hidden items-center gap-3 lg:flex">
              <span className="accent-dot" />

              <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                No silly questions
              </span>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="lg:col-span-8">
          <div className="space-y-3">
            {items.map(({ question, answer }, index) => (
              <Collapsible
                key={`${question}-${index}`}
                className="
                  group
                  overflow-hidden
                  rounded-2xl
                  border border-border
                  bg-surface
                  transition-[border-color,background-color,box-shadow]
                  duration-300
                  data-[state=open]:border-primary/20
                  data-[state=open]:bg-surface-secondary
                  data-[state=open]:shadow-sm
                "
              >
                <CollapsibleTrigger
                  className="
                    flex w-full items-center gap-5
                    px-5 py-5
                    text-left
                    outline-none
                    transition-colors
                    hover:bg-muted/50
                    focus-visible:ring-2
                    focus-visible:ring-ring
                    focus-visible:ring-inset
                    sm:px-6 sm:py-6
                  "
                >
                  {/* Number */}
                  <span
                    className="
                      flex size-9 shrink-0 items-center justify-center
                      rounded-full
                      bg-muted
                      text-xs font-semibold
                      text-muted-foreground
                      transition-colors duration-300
                      group-data-[state=open]:bg-primary
                      group-data-[state=open]:text-primary-foreground
                    "
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Question */}
                  <span
                    className="
                      flex-1
                      text-base font-medium leading-6
                      text-foreground
                      sm:text-lg
                    "
                  >
                    {question}
                  </span>

                  {/* Icon */}
                  <span
                    className="
                      flex size-9 shrink-0 items-center justify-center
                      rounded-full
                      border border-border
                      bg-background
                      transition-[background-color,border-color,transform]
                      duration-300
                      group-data-[state=open]:border-primary
                      group-data-[state=open]:bg-primary
                      group-data-[state=open]:text-primary-foreground
                    "
                  >
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="
                        size-4
                        transition-transform duration-300
                        group-data-[state=open]:rotate-180
                      "
                    />
                  </span>
                </CollapsibleTrigger>

                <CollapsibleContent
                  className="
                    overflow-hidden
                    data-[state=closed]:animate-accordion-up
                    data-[state=open]:animate-accordion-down
                  "
                >
                  <div className="px-5 pb-6 sm:px-6 sm:pb-7">
                    <div className="ml-14 border-l border-accent/40 pl-5 sm:pl-6">
                      <p className="pt-2 text-sm leading-7 text-muted-foreground sm:text-base">
                        {answer}
                      </p>

                      <div className="mt-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-accent">
                        <span>Good to know</span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-3.5"
                        />
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}