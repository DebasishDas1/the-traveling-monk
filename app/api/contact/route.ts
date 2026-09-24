import { NextResponse } from 'next/server'
import { google } from 'googleapis'

interface ContactPayload {
  name: string
  email: string
  phone?: string
  enquiry: string
  message: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload

    const name = body.name?.trim()
    const email = body.email?.trim()
    const phone = body.phone?.trim() ?? ''
    const enquiry = body.enquiry?.trim()
    const message = body.message?.trim()

    if (!name || !email || !enquiry || !message) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please complete all required fields.',
        },
        { status: 400 }
      )
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(
          /\\n/g,
          '\n'
        ),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({
      version: 'v4',
      auth,
    })

    const submittedAt = new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    }).format(new Date())

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'Sheet1!A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[submittedAt, name, email, phone, enquiry, message]],
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully.',
    })
  } catch (error) {
    console.error('Contact form error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to send your message. Please try again.',
      },
      { status: 500 }
    )
  }
}
