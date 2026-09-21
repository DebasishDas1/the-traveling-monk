import {
  onValue,
  ref,
  query,
  orderByChild,
  equalTo,
  type DataSnapshot,
} from 'firebase/database'

import { getFirebaseDb } from '@/lib/firebase/client'

import type { Review } from '@/types/review'

function parseReviews(snapshot: DataSnapshot): Review[] {
  const reviews: Review[] = []

  snapshot.forEach((child) => {
    const data = child.val()

    if (!data || typeof data !== 'object') {
      return
    }

    reviews.push({
      id: child.key!,
      ...data,
    })
  })

  return reviews.sort((a, b) => b.timestamp - a.timestamp)
}

export function subscribeToReviews(
  experienceId: number,
  onData: (reviews: Review[]) => void,
  onError: (error: Error) => void
) {
  let database

  try {
    database = getFirebaseDb()
  } catch (error) {
    onError(
      error instanceof Error
        ? error
        : new Error('Firebase database not initialized')
    )
    return () => {}
  }

  const reviewsRef = ref(database, 'reviews')
  const q = query(
    reviewsRef,
    orderByChild('experienceId'),
    equalTo(experienceId)
  )

  return onValue(
    q,
    (snapshot) => {
      onData(parseReviews(snapshot))
    },
    onError
  )
}
