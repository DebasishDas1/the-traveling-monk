import { BookingPayload } from '@/types/experience';

/**
 * Submits a booking request to the backend.
 * Adjust the endpoint as needed for your API implementation.
 */
export async function submitBooking(payload: BookingPayload) {
  try {
    const response = await fetch('/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, message: errorData.message ?? 'Booking failed' };
    }

    const data = await response.json();
    return { success: true, ...data };
  } catch (error) {
    console.error('submitBooking error:', error);
    return { success: false, message: 'Network error' };
  }
}
