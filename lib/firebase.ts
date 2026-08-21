import { initializeApp } from 'firebase/app'
import {
  getDatabase,
  ref,
  push,
  query,
  orderByChild,
  equalTo,
  get,
  set,
} from 'firebase/database'
import type { Review } from '@/types/experience'

const firebaseConfig = {
  apiKey: 'AIzaSyAc3HBKKDG2CNKbm8NuKHO9rkCfkDgjr5g',
  authDomain: 'the-traveling-monk-e58c3.firebaseapp.com',
  databaseURL:
    'https://the-traveling-monk-e58c3-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'the-traveling-monk-e58c3',
  storageBucket: 'the-traveling-monk-e58c3.firebasestorage.app',
  messagingSenderId: '598315224276',
  appId: '1:598315224276:web:76b993df8dbddd18563f41',
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export async function submitReview(review: Omit<Review, 'id' | 'timestamp'>) {
  try {
    const reviewsRef = ref(db, 'reviews')
    const newReviewRef = push(reviewsRef)
    await set(newReviewRef, {
      ...review,
      timestamp: Date.now(),
    })
    return { success: true, id: newReviewRef.key }
  } catch (error) {
    console.error('Error submitting review:', error)
    throw error
  }
}

export async function getReviewsByTrekId(trekId: number): Promise<Review[]> {
  try {
    const reviewsRef = ref(db, 'reviews')
    const q = query(reviewsRef, orderByChild('trekId'), equalTo(trekId))
    const snapshot = await get(q)

    if (!snapshot.exists()) {
      return []
    }

    const reviews: Review[] = []
    snapshot.forEach((child) => {
      reviews.push({
        id: child.key!,
        ...child.val(),
      })
    })

    return reviews.sort((a, b) => b.timestamp - a.timestamp)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return []
  }
}
