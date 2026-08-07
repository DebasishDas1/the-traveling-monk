import { Container, Heading, Section, Stack } from '@/components/common'

import { ExperienceTimelineItem } from '@/types/experience'

interface ExperienceTimelineProps {
  timeline: ExperienceTimelineItem[]
}

export function ExperienceTimeline({ timeline }: ExperienceTimelineProps) {
  return (
    <Section>
      <Container>
        <Stack gap="lg">
          <Heading title="Journey" description="One step at a time." />

          <div className="space-y-8">
            {timeline.map((day) => (
              <div key={day.day} className="border-l pl-6">
                <p className="mb-2 text-sm text-muted-foreground">
                  Day {day.day}
                </p>

                <h3 className="text-xl font-semibold">{day.title}</h3>

                <p className="mt-2 text-muted-foreground">{day.description}</p>
              </div>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  )
}
