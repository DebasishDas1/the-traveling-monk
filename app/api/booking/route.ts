// app/api/booking/route.ts
import type { BookingPayload } from '@/types/experience';

export async function POST(request: Request) {
  try {
    const payload: BookingPayload = await request.json();
    const { slug, date, guests, total } = payload;
    if (!slug || !date || typeof guests !== 'number' || typeof total !== 'number') {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid booking data' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    // TODO: integrate with real booking backend / DB
    return new Response(
      JSON.stringify({ success: true, message: 'Booking received', booking: payload }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Booking API error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
