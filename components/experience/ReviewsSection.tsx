'use client'

import { useState } from 'react'
import { ReviewForm } from './ReviewForm'
import { ReviewsList } from './ReviewsList'

interface ReviewsSectionProps {
  trekId: number
}

export function ReviewsSection({ trekId }: ReviewsSectionProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleSuccess = () => {
    setRefreshTrigger((current) => current + 1)
  }

  return (
    <section id="reviews" className="scroll-mt-24">
      <div className="mx-auto">
        {/* Reviews */}
        <div>
          <div className="mb-8 sm:mb-10">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Reviews
            </h2>

            <p className="mt-3 text-small leading-6 text-muted-foreground sm:text-base">
              See what other trekkers thought about their experience.
            </p>
          </div>

          <ReviewsList trekId={trekId} refreshTrigger={refreshTrigger} />
        </div>
        <ReviewForm trekId={trekId} onSuccess={handleSuccess} />
      </div>
    </section>
  )
}
