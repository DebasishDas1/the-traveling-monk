import { Star } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Testimonial {
  name: string
  city: string
  quote: string
  image?: string
  rating: 1 | 2 | 3 | 4 | 5
}

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

interface TrekTestimonialsProps {
  testimonials?: Testimonial[]
}

export function TrekTestimonials({ testimonials = [] }: TrekTestimonialsProps) {
  if (!testimonials.length) {
    return null
  }

  return (
    <div className="py-4">
      <div className="mb-12 md:mb-16">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
          From people who went
        </p>

        <h2 className="mt-4 text-4xl font-semibold tracking-tighter md:text-5xl">
          The part they didn&apos;t expect.
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {testimonials.slice(0, 4).map((testimonial, idx) => (
          <Card key={idx} className="border-2 border-secondary bg-white">
            <CardHeader className="flex gap-1">
              {Array.from({
                length: testimonial.rating,
              }).map((_, index) => (
                <Star
                  key={index}
                  className="size-3.5 fill-current text-primary"
                />
              ))}
            </CardHeader>
            <CardContent className="md:text-2xl md:leading-9">
              “{testimonial.quote}”
            </CardContent>
            <CardFooter className="border-t-0">
              <Avatar className="size-10">
                {testimonial.image && (
                  <AvatarImage src={testimonial.image} alt="" />
                )}

                <AvatarFallback>
                  {testimonial.name.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="ml-3">
                <p className="text-sm font-medium">{testimonial.name}</p>

                <p className="text-xs text-muted-foreground">
                  {testimonial.city}
                </p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
