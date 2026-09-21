import { push, ref, set, serverTimestamp } from 'firebase/database'

import { getFirebaseDb } from '@/lib/firebase/client'

import type { Review } from '@/types/review'

type CreateReviewInput = Omit<Review, 'id' | 'timestamp'>

export async function submitReview(review: CreateReviewInput) {
  const database = getFirebaseDb()

  const reviewsRef = ref(database, 'reviews')
  const reviewRef = push(reviewsRef)

  await set(reviewRef, {
    id: reviewRef.key,
    experienceId: review.experienceId,
    name: review.name,
    ...(review.email ? { email: review.email } : {}),
    rating: review.rating,
    text: review.text,
    timestamp: serverTimestamp(),
  })

  return {
    success: true,
    id: reviewRef.key,
  }
}
