'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'

import { subscribeToReviews } from '@/lib/reviews/queries'
import type { Review } from '@/types/review'

import { Card, CardContent } from '@/components/ui/card'
import { TestimonialCard } from './TestimonialCard'

interface ReviewsListProps {
  experienceId: number
}

function ReviewSkeleton() {
  return (
    <div
      className="grid gap-5 md:grid-cols-2"
      role="status"
      aria-label="Loading reviews"
    >
      {[1, 2].map((item) => (
        <div
          key={item}
          className="h-70 animate-pulse rounded-[30px] bg-muted"
        />
      ))}
    </div>
  )
}

function EmptyReviews() {
  return (
    <Card className="rounded-[30px] border-border bg-muted/30 shadow-none">
      <CardContent className="flex min-h-52 flex-col items-center justify-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background">
          <Star
            size={20}
            className="text-muted-foreground"
            aria-hidden="true"
          />
        </div>

        <p className="mt-4 text-sm font-medium">No reviews yet</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Be the first to share your experience.
        </p>
      </CardContent>
    </Card>
  )
}

function ReviewError() {
  return (
    <Card className="rounded-[30px] border-border bg-muted/30 shadow-none">
      <CardContent className="flex min-h-48 flex-col items-center justify-center text-center">
        <p className="text-sm font-medium">Unable to load reviews</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Please try again in a moment.
        </p>
      </CardContent>
    </Card>
  )
}

export function ReviewsList({ experienceId }: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return
    }

    try {
      const unsubscribe = subscribeToReviews(
        experienceId,
        (nextReviews) => {
          setReviews(nextReviews)
          setIsLoading(false)
          setHasError(false)
        },
        (error) => {
          console.error('Failed to load reviews:', error)
          setIsLoading(false)
          setHasError(true)
        }
      )

      return unsubscribe
    } catch (error) {
      console.error('Failed to subscribe to reviews:', error)
      setTimeout(() => {
        setIsLoading(false)
        setHasError(true)
      }, 0)
    }
  }, [experienceId])

  if (isLoading) {
    return <ReviewSkeleton />
  }

  if (hasError && reviews.length === 0) {
    return <ReviewError />
  }

  if (reviews.length === 0) {
    return <EmptyReviews />
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {reviews.map((review) => (
        <TestimonialCard
          key={review.id}
          testimonial={{
            name: review.name,
            quote: review.text,
            rating: review.rating,
            timestamp: review.timestamp,
          }}
        />
      ))}
    </div>
  )
}
