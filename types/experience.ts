export type ExperienceCategory = 'trek' | 'homestay' | 'international'

export type ItineraryDayType = {
  day: number
  title: string
  from: string
  to: string
  altitude?: string
  duration?: string
  description: string
  imageUrl?: string
}

export type TestimonialType = {
  name: string
  city: string
  quote: string
  image: string
  rating: number
}

export type TrekAvailableDateType = {
  date: string
  spots: number
}

export type TrekDifficultyType =
  | 'Easy'
  | 'Easy to Moderate'
  | 'Moderate'
  | 'Moderate to Difficult'
  | 'Difficult'

export type TrekTierType = 'Beginner' | 'Intermediate' | 'Advanced' | 'All'

export interface Experience {
  id: string
  slug: string

  category: ExperienceCategory

  featured: boolean
  active: boolean

  title: string
  subtitle?: string

  location: string
  country?: string

  duration: string

  priceFrom: number

  maxGroupSize: number

  gallery: string[]

  description: string

  highlights: string[]

  itinerary: ItineraryDayType[]

  testimonials: TestimonialType[]

  availableDates: TrekAvailableDateType[]

  inclusions: string[]
  exclusions: string[]

  metadata: {
    difficulty?: TrekDifficultyType
    altitude?: string
    tier?: TrekTierType
    visaRequired?: boolean
    pickup?: string
    bestSeason?: string
  }
}
