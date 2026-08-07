export type ExperienceCategory = 'trek' | 'homestay' | 'international'

export type ExperienceDifficulty = 'easy' | 'moderate' | 'challenging'

export type ExperienceSeason = 'spring' | 'summer' | 'autumn' | 'winter'

export interface ExperienceImage {
  id: string
  src: string
  alt: string
}

export interface ExperienceHighlight {
  icon: string
  title: string
  description: string
}

export interface ExperienceTimelineItem {
  day: number
  title: string
  description: string
}

export interface ExperienceDuration {
  days: number
  nights?: number
}

export interface ExperienceAltitude {
  metres: number
}

export interface ExperiencePricing {
  amount: number
  currency: 'INR'
  originalAmount?: number
}

export interface Experience {
  id: string
  slug: string

  title: string
  subtitle: string

  category: ExperienceCategory

  location: string

  duration: ExperienceDuration

  difficulty?: ExperienceDifficulty

  altitude?: ExperienceAltitude

  season: ExperienceSeason[]

  coverImage: ExperienceImage

  gallery: ExperienceImage[]

  highlights: ExperienceHighlight[]

  timeline: ExperienceTimelineItem[]

  pricing: ExperiencePricing

  shortDescription: string

  description: string

  featured: boolean
}
