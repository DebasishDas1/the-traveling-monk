/**
 * Experience Types - Optimized with Discriminated Unions
 * Provides type safety for Trek, Escape, and Expedition offerings
 */

// ──────────────────────────────────────────────────────────────────
// ENUMS & CONSTANTS
// ──────────────────────────────────────────────────────────────────

export enum OfferingType {
  TREK = 'trek',
  ESCAPE = 'escape',
  EXPEDITION = 'expedition',
  EXPERIENCE = 'experience',
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

// ──────────────────────────────────────────────────────────────────
// COMMON TYPES
// ──────────────────────────────────────────────────────────────────

export interface MediaUrl {
  url: string
  alt?: string
}

export interface GoogleDriveImage extends MediaUrl {
  fileId: string // Extracted from the Google Drive link
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
  rating: 1 | 2 | 3 | 4 | 5
}

export interface TimelineItem {
  day: number
  title: string
  description: string
  imageUrl?: string
}

export interface TrekTimelineItem extends TimelineItem {
  from: string
  to: string
  altitude: string
  duration: string
}

export interface ExpeditionTimelineItem extends TimelineItem {
  from: string
  to: string
  altitude: string
  duration: string
}

// ──────────────────────────────────────────────────────────────────
// PRICING TYPES - Type-safe per offering
// ──────────────────────────────────────────────────────────────────

export interface EscapePricing {
  double: number
  triple?: number
  currency?: 'INR'
}

export interface ExpeditionPricing {
  twin: number
  single?: number
  currency?: 'INR'
}

export interface TrekPricing {
  perPerson: number
  currency?: 'INR'
}

// ──────────────────────────────────────────────────────────────────
// BASE INTERFACE (Common fields for all offerings)
// ──────────────────────────────────────────────────────────────────

export interface BaseExperience {
  id: string | number
  slug: string
  gallery: (string | MediaUrl)[]
  highlights: string[]
  description: string
  testimonials?: Testimonial[]
  inclusions?: string[]
  exclusions?: string[]
  featured?: boolean
}

// ──────────────────────────────────────────────────────────────────
// TREK TYPE
// ──────────────────────────────────────────────────────────────────

export interface Trek extends BaseExperience {
  type: OfferingType.TREK
  title: string
  tagline: string
  location: string
  duration: string
  difficulty: DifficultyLevel
  priceFrom: number
  maxGroupSize: number
  altitude: number
  nextDate: string
  spotsLeft: number
  minAge?: number
  pickupDrop?: string
  availableDates: AvailableDateSlot[]
  itinerary?: TrekTimelineItem[]
  active: boolean
}

// ──────────────────────────────────────────────────────────────────
// ESCAPE TYPE
// ──────────────────────────────────────────────────────────────────

export interface Escape extends BaseExperience {
  type: OfferingType.ESCAPE
  name: string
  location: string
  duration: string
  pickup: string
  maxGroupSize: number
  price: EscapePricing
  spotsLeft: number
  availableDates: AvailableDateSlot[]
  itinerary?: TimelineItem[]
}

// ──────────────────────────────────────────────────────────────────
// EXPEDITION TYPE
// ──────────────────────────────────────────────────────────────────

export interface Expedition extends BaseExperience {
  type: OfferingType.EXPEDITION
  name: string
  country: string
  location: string
  tagline: string
  tier: TierLevel
  duration: string
  visaRequired: boolean
  bestSeason: string
  priceFrom: number
  maxGroupSize: number
  spotsLeft: number
  price: ExpeditionPricing
  availableDates: AvailableDateSlot[]
  itinerary?: ExpeditionTimelineItem[]
}

// ──────────────────────────────────────────────────────────────────
// UNION TYPE
// ──────────────────────────────────────────────────────────────────

export type Experience = Trek | Escape | Expedition

// Type guards for discriminating between experience types
export const isTrek = (exp: Experience): exp is Trek =>
  exp.type === OfferingType.TREK
export const isEscape = (exp: Experience): exp is Escape =>
  exp.type === OfferingType.ESCAPE
export const isExpedition = (exp: Experience): exp is Expedition =>
  exp.type === OfferingType.EXPEDITION
