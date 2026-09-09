// app/api/booking/route.ts
import { google } from 'googleapis'
import type { BookingPayload } from '@/types/booking'

const sheets = google.sheets('v4')

type SheetRow = [
  string,
  string,
  string,
  string,
  number,
  number,
  string,
  string,
  string,
  string,
]

async function getAuthClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY

  if (!email || !privateKey) {
    throw new Error('Google service account credentials not configured')
  }

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

function generateBookingId(): string {
  return `BOOK-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`
}

type AuthClient = Awaited<ReturnType<typeof getAuthClient>>

async function appendToSheet(
  auth: AuthClient,
  spreadsheetId: string,
  sheetName: string,
  values: SheetRow[]
) {
  await sheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: `${sheetName}!A:J`,
    valueInputOption: 'RAW',
    requestBody: { values },
  })
}

function validatePayload(payload: BookingPayload): {
  valid: boolean
  error?: string
} {
  if (!payload.slug || typeof payload.slug !== 'string') {
    return { valid: false, error: 'Invalid experience slug' }
  }
  if (!payload.date || typeof payload.date !== 'string') {
    return { valid: false, error: 'Invalid date' }
  }
  if (!Number.isInteger(payload.guests) || payload.guests < 1) {
    return { valid: false, error: 'Invalid guest count' }
  }
  if (typeof payload.total !== 'number' || payload.total <= 0) {
    return { valid: false, error: 'Invalid total price' }
  }
  if (!payload.name || typeof payload.name !== 'string') {
    return { valid: false, error: 'Invalid name' }
  }
  if (!payload.phone || typeof payload.phone !== 'string') {
    return { valid: false, error: 'Invalid phone' }
  }
  return { valid: true }
}

export async function POST(request: Request) {
  try {
    const payload: BookingPayload = await request.json()

    const validation = validatePayload(payload)
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ success: false, message: validation.error }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { slug, date, guests, total, name, phone } = payload
    const bookingId = generateBookingId()
    const timestamp = new Date().toISOString()

    const auth = await getAuthClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_BOOKING_ID
    const sheetName = process.env.GOOGLE_SHEET_BOOKING_TAB || 'Bookings'

    if (!spreadsheetId) {
      throw new Error('Google Sheets Booking ID not configured')
    }

    // Columns: A-J (BookingID, Timestamp, Slug, Date, Guests, Total, Name, Phone, Status, Notes)
    const rowData: SheetRow[] = [
      [bookingId, timestamp, slug, date, guests, total, name, phone, '', ''],
    ]

    await appendToSheet(auth, spreadsheetId, sheetName, rowData)

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Booking confirmed',
        bookingId,
        data: { ...payload, bookingId, timestamp },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Booking API error:', error)

    const message =
      error instanceof Error
        ? error.message
        : 'Server error occurred while processing booking'

    return new Response(JSON.stringify({ success: false, message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
