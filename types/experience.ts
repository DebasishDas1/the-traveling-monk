import type { ReviewRating } from './review'

// ─────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────

export enum OfferingType {
  TREK = 'trek',
  GETAWAY = 'getaway',
  INTERNATIONAL = 'international',
}

export enum DifficultyLevel {
  EASY = 'Easy',
  EASY_MODERATE = 'Easy to Moderate',
  MODERATE = 'Moderate',
  MODERATE_DIFFICULT = 'Moderate to Difficult',
  CHALLENGING = 'Challenging',
  DIFFICULT = 'Difficult',
  EXPERT = 'Expert',
}

export enum TierLevel {
  EASY = 'Easy',
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  MODERATE = 'Moderate',
  ADVANCED = 'Advanced',
  PREMIUM = 'Premium',
  LUXURY = 'Luxury',
}

export enum Season {
  SPRING = 'spring',
  SUMMER = 'summer',
  AUTUMN = 'autumn',
  WINTER = 'winter',
}

// ─────────────────────────────────────────────
// MEDIA
// ─────────────────────────────────────────────

export interface MediaUrl {
  url: string
  alt?: string
}

export interface GoogleDriveImage extends MediaUrl {
  fileId: string
}

export type ExperienceMedia = string | MediaUrl | { src: string; alt?: string }

// ─────────────────────────────────────────────
// BOOKING
// ─────────────────────────────────────────────

export interface AvailableDateSlot {
  date: string
  spots: number
}
// ─────────────────────────────────────────────
// SOCIAL PROOF
// ─────────────────────────────────────────────

export interface Testimonial {
  name: string
  city?: string
  quote: string
  image?: string
  rating: ReviewRating
  timestamp?: number
}

// ─────────────────────────────────────────────
// TIMELINE
// ─────────────────────────────────────────────

export interface BaseTimelineItem {
  day: number
  title: string
  description: string
  imageUrl?: string
}

export interface TrekTimelineItem extends BaseTimelineItem {
  from: string
  to: string
  altitude: string
  duration: string
}

export interface GetawayTimelineItem extends BaseTimelineItem {
  from?: string
  to?: string
  pointers: string[]
}

export interface InternationalTimelineItem extends BaseTimelineItem {
  from: string
  to: string
  duration: string
}

// ─────────────────────────────────────────────
// PRICING
// ─────────────────────────────────────────────

export interface TrekPricing {
  perPerson: number
  currency: 'INR'
}

export interface GetawayPricing {
  perNight: number
  currency: 'INR'
}

export interface InternationalPricing {
  perPerson: number
  currency: 'INR'
}

// ─────────────────────────────────────────────
// COMMON EXPERIENCE
// ─────────────────────────────────────────────

export interface BaseExperience {
  id: number
  slug: string
  gallery: ExperienceMedia[]
  highlights: string[]
  description: string
  testimonials?: Testimonial[]
  inclusions?: string[]
  exclusions?: string[]
  featured?: boolean
  active: boolean
}

export interface TrekCoordinate {
  latitude: number
  longitude: number
}

export interface TrekRoute {
  coordinates: TrekCoordinate[]
}

// ─────────────────────────────────────────────
// TREK
// ─────────────────────────────────────────────

export interface Trek extends BaseExperience {
  type: OfferingType.TREK

  title: string
  tagline: string
  location: string
  region?: string
  duration: string
  difficulty: DifficultyLevel
  priceFrom: number
  pricing?: TrekPricing
  maxGroupSize: number
  altitude: number
  nextDate: string
  spotsLeft: number
  minAge?: number
  pickupDrop?: string
  availableDates: AvailableDateSlot[]
  itinerary?: TrekTimelineItem[]
  season?: Season[]
  geoLocation?: string

  route?: TrekRoute
}

// ─────────────────────────────────────────────
// GETAWAY
// ─────────────────────────────────────────────

export interface Getaway extends BaseExperience {
  type: OfferingType.GETAWAY

  name: string
  tagline: string

  location: string
  region?: string

  duration: string

  priceFrom: number
  pricing?: GetawayPricing

  roomDescription: string

  availableDates: AvailableDateSlot[]

  itinerary?: GetawayTimelineItem[]
}

// ─────────────────────────────────────────────
// INTERNATIONAL
// ─────────────────────────────────────────────

export interface International extends BaseExperience {
  type: OfferingType.INTERNATIONAL

  name: string
  tagline: string

  country: string
  location: string

  duration: string

  tier: TierLevel

  priceFrom: number
  pricing?: InternationalPricing

  maxGroupSize: number
  spotsLeft: number

  visaRequired: boolean
  bestSeason: string

  availableDates: AvailableDateSlot[]

  itinerary?: InternationalTimelineItem[]
}

// ─────────────────────────────────────────────
// UNION
// ─────────────────────────────────────────────

export type Experience = Trek | Getaway | International

// ─────────────────────────────────────────────
// TYPE GUARDS
// ─────────────────────────────────────────────

export const isTrek = (experience: Experience): experience is Trek =>
  experience.type === OfferingType.TREK

export const isGetaway = (experience: Experience): experience is Getaway =>
  experience.type === OfferingType.GETAWAY

export const isInternational = (
  experience: Experience
): experience is International => experience.type === OfferingType.INTERNATIONAL
