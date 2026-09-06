import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Star } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

import type { Testimonial } from '@/types/experience'

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { timestamp, name, city, quote, image, rating } = testimonial

  const timeAgo = timestamp
    ? formatDistanceToNow(timestamp, { addSuffix: true })
    : null

  const starCount = Math.max(0, Math.min(5, rating))

  return (
    <Card className="bg-white">
      <CardHeader className="flex gap-3">
        <Avatar className="size-10 shrink-0">
          {image && <AvatarImage src={image} alt={name} />}
          <AvatarFallback aria-hidden>
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <p className="truncate font-bold">{name}</p>
          <p className="text-xs text-muted-foreground">Traveler</p>
        </div>
      </CardHeader>

      <CardContent className="flex flex-wrap items-center gap-0 border-t-0">
        <div
          className="flex"
          aria-label={`${starCount} out of 5 stars`}
          role="img"
        >
          {Array.from({ length: rating }, (_, index) => (
            <Star
              key={index}
              className="size-3.5 fill-current text-primary"
              aria-hidden="true"
            />
          ))}
        </div>

        <p className="ml-2 text-xs text-muted-foreground">
          {city}
          {timeAgo && ` · ${timeAgo}`}
        </p>
      </CardContent>
      <CardFooter className="border-none text-xl">{quote}</CardFooter>
    </Card>
  )
}
