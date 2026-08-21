'use client'

import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Star } from 'lucide-react'

import { getReviewsByTrekId } from '@/lib/firebase'
import type { Review } from '@/types/experience'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

interface ReviewsListProps {
  trekId: number
  refreshTrigger?: number
}

function ReviewSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading reviews">
      {[1, 2].map((item) => (
        <div
          key={item}
          className="h-70 animate-pulse rounded-[30px] bg-muted"
        />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  const initial = review.name.trim().charAt(0).toUpperCase()

  const rating = Number(review.rating).toFixed(1)

  const timeAgo = formatDistanceToNow(review.timestamp, {
    addSuffix: true,
  })

  return (
    <Card className="overflow-hidden rounded-[30px] bg-primary text-white shadow-none">
      <CardContent className="p-7 sm:p-10 lg:p-12">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          {/* User */}
          <div className="flex min-w-0 items-center gap-4">
            <Avatar className="h-16 w-16 shrink-0 border sm:h-20 sm:w-20">
              <AvatarFallback className="text-lg font-medium sm:text-xl">
                {initial}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <h3 className="truncate text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                {review.name}
              </h3>

              <p className="mt-1 text-base text-white/55 sm:text-xl">
                Trekker on Doorin
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex shrink-0 items-center gap-2">
            <Star
              className="h-9 w-9 fill-yellow-400 text-yellow-400 sm:h-10 sm:w-10"
              strokeWidth={1.5}
            />

            <span className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              {rating}
            </span>
          </div>
        </div>

        {/* Review */}
        <p className="mt-8 max-w-5xl text-xl font-normal leading-[1.45] tracking-[-0.015em] sm:mt-10 sm:text-2xl lg:text-[30px] lg:leading-[1.45]">
          {review.text}
        </p>

        {/* Meta */}
        <p className="mt-6 text-xs">{timeAgo}</p>
      </CardContent>
    </Card>
  )
}

export function ReviewsList({ trekId, refreshTrigger = 0 }: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    const fetchReviews = async () => {
      setIsLoading(true)
      setError(false)

      try {
        const data = await getReviewsByTrekId(trekId)

        if (!cancelled) {
          setReviews(data)
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error)

        if (!cancelled) {
          setReviews([])
          setError(true)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchReviews()

    return () => {
      cancelled = true
    }
  }, [trekId, refreshTrigger])

  if (isLoading) {
    return <ReviewSkeleton />
  }

  if (error) {
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

  if (reviews.length === 0) {
    return (
      <Card className="rounded-[30px] border-border bg-muted/30 shadow-none">
        <CardContent className="flex min-h-52 flex-col items-center justify-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background">
            <Star size={20} className="text-muted-foreground" />
          </div>

          <p className="mt-4 text-sm font-medium">No reviews yet</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Be the first to share your experience.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  )
}
