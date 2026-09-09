// utils/booking.ts
import { BookingPayload } from '@/types/booking'

export interface BookingData {
  slug: string
  date: string
  guests: number
  total: number
  name: string
  phone: string
  bookingId: string
  timestamp: string
}

export interface BookingResponse {
  success: boolean
  message: string
  bookingId?: string
  data?: BookingData
}

interface ErrorResponse {
  message?: string
}

const MAX_RETRIES = 3
const RETRY_DELAY = 1000

function isBookingPayload(payload: unknown): payload is BookingPayload {
  if (!payload || typeof payload !== 'object') return false
  const obj = payload as Record<string, unknown>
  return (
    typeof obj.slug === 'string' &&
    typeof obj.date === 'string' &&
    Number.isInteger(obj.guests) &&
    typeof obj.total === 'number' &&
    typeof obj.name === 'string' &&
    typeof obj.phone === 'string'
  )
}

export async function submitBooking(
  payload: BookingPayload,
  retryCount = 0
): Promise<BookingResponse> {
  try {
    const response = await fetch('/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      if (response.status >= 500 && retryCount < MAX_RETRIES) {
        await new Promise((resolve) =>
          setTimeout(resolve, RETRY_DELAY * (retryCount + 1))
        )
        return submitBooking(payload, retryCount + 1)
      }

      const errorData: ErrorResponse = await response.json().catch(() => ({}))
      return {
        success: false,
        message: errorData.message ?? `Booking failed (${response.status})`,
      }
    }

    const responseData: BookingResponse = await response.json()
    return {
      success: true,
      message: responseData.message ?? 'Booking successful',
      bookingId: responseData.bookingId,
      data: responseData.data,
    }
  } catch (error) {
    console.error('submitBooking error:', error)

    if (retryCount < MAX_RETRIES) {
      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAY * (retryCount + 1))
      )
      return submitBooking(payload, retryCount + 1)
    }

    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
    }
  }
}

export function validateBookingPayload(payload: unknown): string | null {
  if (!isBookingPayload(payload)) {
    return 'Invalid booking data'
  }

  if (!payload.slug) {
    return 'Invalid experience slug'
  }
  if (!payload.date) {
    return 'Please select a date'
  }
  if (payload.guests < 1) {
    return 'Invalid number of guests'
  }
  if (payload.total <= 0) {
    return 'Invalid total price'
  }
  if (!payload.name || payload.name.trim().length < 2) {
    return 'Please enter a valid name'
  }
  if (!payload.phone || payload.phone.trim().length < 10) {
    return 'Please enter a valid phone number'
  }
  return null
}
