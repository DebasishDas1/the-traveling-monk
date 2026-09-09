// types/experience.ts
export interface BookingPayload {
  slug: string
  date: string
  guests: number
  total: number
  name: string
  phone: string
}

export interface AvailableDateSlot {
  date: string
  spotsAvailable?: number
  priceAdjustment?: number
}

export interface Experience {
  id: string
  slug: string
  title: string
  description: string
  price: number
  priceLabel: string
  maxGuests: number
  availableDates?: AvailableDateSlot[] | null
  images: string[]
  duration?: string
  location?: string
  highlights?: string[]
}

export interface BookingResponse {
  success: boolean
  message: string
  bookingId?: string
  data?: BookingPayload & { bookingId: string; timestamp: string }
}
