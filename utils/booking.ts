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
  code?: string
}

// Configuration
const BOOKING_CONFIG = {
  MAX_RETRIES: 3,
  INITIAL_RETRY_DELAY: 1000, // ms
  RETRY_BACKOFF: 2, // exponential multiplier
} as const

// Validation patterns
const VALIDATION = {
  NAME_REGEX: /^[a-zA-Z\s\-']{2,}$/,
  PHONE_REGEX: /^[\d\s\-\+\(\)]{7,20}$/,
  PHONE_MIN_DIGITS: 7,
  PHONE_MAX_DIGITS: 15,
} as const

type ErrorType = 'validation' | 'network' | 'server' | 'unknown'

function isBookingPayload(payload: unknown): payload is BookingPayload {
  if (!payload || typeof payload !== 'object') return false
  const obj = payload as Record<string, unknown>
  return (
    typeof obj.slug === 'string' &&
    typeof obj.date === 'string' &&
    typeof obj.guests === 'number' &&
    Number.isInteger(obj.guests) &&
    obj.guests > 0 &&
    typeof obj.total === 'number' &&
    obj.total > 0 &&
    typeof obj.name === 'string' &&
    typeof obj.phone === 'string'
  )
}

function validateName(name: string): string | null {
  const trimmed = name.trim()
  if (trimmed.length < 2) return 'Name must be at least 2 characters'
  if (!VALIDATION.NAME_REGEX.test(trimmed))
    return 'Name contains invalid characters'
  return null
}

function validatePhone(phone: string): string | null {
  const digitsOnly = phone.replace(/\D/g, '')
  if (digitsOnly.length < VALIDATION.PHONE_MIN_DIGITS) {
    return `Phone number must have at least ${VALIDATION.PHONE_MIN_DIGITS} digits`
  }
  if (digitsOnly.length > VALIDATION.PHONE_MAX_DIGITS) {
    return `Phone number must have at most ${VALIDATION.PHONE_MAX_DIGITS} digits`
  }
  if (!VALIDATION.PHONE_REGEX.test(phone)) {
    return 'Phone number contains invalid characters'
  }
  return null
}

function categorizeError(status: number, error: unknown): ErrorType {
  if (status >= 500) return 'server'
  if (status >= 400) return 'validation'
  if (error instanceof TypeError) return 'network'
  return 'unknown'
}

function getErrorMessage(type: ErrorType, status?: number): string {
  switch (type) {
    case 'validation':
      return 'Please check your booking information and try again.'
    case 'network':
      return 'Network error. Please check your connection and try again.'
    case 'server':
      return 'Server error. Please try again in a few moments.'
    case 'unknown':
      return `Error: ${status ? `(${status})` : 'Unknown error'}. Please try again.`
  }
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
      const errorType = categorizeError(response.status, null)

      // Retry on server errors
      if (response.status >= 500 && retryCount < BOOKING_CONFIG.MAX_RETRIES) {
        const delay =
          BOOKING_CONFIG.INITIAL_RETRY_DELAY *
          Math.pow(BOOKING_CONFIG.RETRY_BACKOFF, retryCount)

        await new Promise((resolve) => setTimeout(resolve, delay))
        return submitBooking(payload, retryCount + 1)
      }

      // Parse error response
      let errorData: ErrorResponse = {}
      try {
        errorData = await response.json()
      } catch {
        // Ignore JSON parse errors
      }

      return {
        success: false,
        message:
          errorData.message || getErrorMessage(errorType, response.status),
      }
    }

    const responseData: BookingResponse = await response.json()

    // Return success with booking details
    return {
      success: true,
      message: `Booking confirmed! Confirmation #${responseData.bookingId || 'Pending'}`,
      bookingId: responseData.bookingId,
      data: responseData.data,
    }
  } catch (error) {
    console.error('Booking submission error:', error)

    // Retry on network errors
    if (retryCount < BOOKING_CONFIG.MAX_RETRIES) {
      const delay =
        BOOKING_CONFIG.INITIAL_RETRY_DELAY *
        Math.pow(BOOKING_CONFIG.RETRY_BACKOFF, retryCount)

      await new Promise((resolve) => setTimeout(resolve, delay))
      return submitBooking(payload, retryCount + 1)
    }

    const errorType = categorizeError(0, error)
    return {
      success: false,
      message: getErrorMessage(errorType),
    }
  }
}

export function validateBookingPayload(payload: unknown): string | null {
  if (!isBookingPayload(payload)) {
    return 'Invalid booking data'
  }

  if (!payload.slug || payload.slug.trim().length === 0) {
    return 'Invalid experience'
  }

  if (!payload.date || payload.date.trim().length === 0) {
    return 'Please select a date'
  }

  if (payload.guests < 1 || payload.guests > 50) {
    return 'Invalid number of guests'
  }

  if (payload.total <= 0 || !Number.isFinite(payload.total)) {
    return 'Invalid total price'
  }

  const nameError = validateName(payload.name)
  if (nameError) return nameError

  const phoneError = validatePhone(payload.phone)
  if (phoneError) return phoneError

  return null
}

// Export for testing
export const validators = {
  validateName,
  validatePhone,
  isBookingPayload,
}

export const config = BOOKING_CONFIG
