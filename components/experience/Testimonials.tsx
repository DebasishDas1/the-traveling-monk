import type { Testimonial } from '@/types/experience'
import { TestimonialCard } from '@/components/experience/TestimonialCard'
import { Heading } from '../common'

export function Testimonials({
  testimonials = [],
}: {
  testimonials?: Testimonial[]
}) {
  if (!testimonials.length) {
    return null
  }

  return (
    <div className="py-4">
      <Heading
        eyebrow="From people who went"
        title="The part they didn't expect."
        className="mb-10"
      />

      <div className="grid gap-5 md:grid-cols-2">
        {testimonials.slice(0, 4).map((testimonial, idx) => (
          <TestimonialCard key={idx} testimonial={testimonial} />
        ))}
      </div>
    </div>
  )
}
