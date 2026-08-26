/**
 * Review Types
 *
 * Generic review model that works across all experience types:
 * - Himalayan Treks
 * - Homestays
 * - International Trips
 */

export type ReviewRating = 1 | 2 | 3 | 4 | 5

export interface Review {
  id: string
  experienceId: number
  name: string
  email?: string
  rating: ReviewRating
  text: string
  timestamp: number
}
