export type ExperienceCategory = 'trek' | 'homestay' | 'international'
export type OfferingType = 'experience' | 'escape' | 'expedition' | 'trek'

export type ExperienceDifficulty =
  | 'Easy'
  | 'Moderate'
  | 'Challenging'
  | 'Difficult'
  | 'Expert'
  | 'Easy to Moderate'
  | 'Moderate to Difficult'

export type ExperienceSeason = 'spring' | 'summer' | 'autumn' | 'winter'

export interface ExperienceImage {
  id: string
  src: string
  alt: string
}

export interface ExperienceHighlight {
  icon?: string
  title: string
  description?: string
}

export interface ExperienceTimelineItem {
  day: number
  title: string
  description: string
  from?: string
  to?: string
  altitude?: string
  duration?: string
  imageUrl?: string
}

export interface ExperienceDuration {
  days: number
  nights?: number
}

export type ExperienceAltitude = { metres: number } | string

export interface ExperiencePricing {
  amount?: number
  currency?: 'INR'
  originalAmount?: number
  [key: string]: number | string | undefined // For flexible pricing like {double: 7999, triple: 8999}
}

export interface AvailableDateSlot {
  date: string
  spots: number
}

export interface Testimonial {
  name: string
  city: string
  quote: string
  image?: string
  rating: number
}

export interface Experience {
  id: string | number
  slug: string

  title?: string
  name?: string // For escapes/expeditions
  subtitle?: string
  tagline?: string // For expeditions

  type?: OfferingType // experience, escape, expedition

  category?: ExperienceCategory

  // Expedition specific
  country?: string
  tier?:
    | 'Easy'
    | 'Moderate'
    | 'Premium'
    | 'Luxury'
    | 'Beginner'
    | 'Intermediate'
    | 'Advanced'
  visaRequired?: boolean
  bestSeason?: string

  // Escape & Trek specific
  pickup?: string
  pickupDrop?: string
  maxGroupSize?: number
  availableDates?: AvailableDateSlot[]
  spotsLeft?: number

  // Trek specific
  active?: boolean
  region?: string
  nextDate?: string
  minAge?: number
  trekAltitude?: number

  location?: string

  duration: string | ExperienceDuration

  difficulty?: ExperienceDifficulty

  altitude?: ExperienceAltitude

  season?: ExperienceSeason[]

  coverImage?: ExperienceImage

  gallery: (string | ExperienceImage)[]

  highlights: (string | ExperienceHighlight)[]

  itinerary?: ExperienceTimelineItem[]

  pricing?: ExperiencePricing
  price?: ExperiencePricing
  priceFrom?: number

  shortDescription?: string

  description: string

  featured?: boolean

  // Additional fields for escapes/expeditions
  inclusions?: string[]
  exclusions?: string[]
  testimonials?: Testimonial[]
}

// Specific type aliases for clarity
export type TrekType = Experience
export type EscapeType = Experience
export type ExpeditionType = Experience