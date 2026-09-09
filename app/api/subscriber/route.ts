// app/api/subscriber/route.ts
import { google } from 'googleapis'

const sheets = google.sheets('v4')

type SubscriberRow = [string, string, string]

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

type AuthClient = Awaited<ReturnType<typeof getAuthClient>>

async function appendToSheet(
  auth: AuthClient,
  spreadsheetId: string,
  sheetName: string,
  values: SubscriberRow[]
) {
  await sheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: `${sheetName}!A:C`,
    valueInputOption: 'RAW',
    requestBody: { values },
  })
}

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()

    if (!email || typeof email !== 'string') {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid email' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const auth = await getAuthClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_SUBSCRIBER_ID
    const sheetName = process.env.GOOGLE_SHEET_SUBSCRIBER_TAB || 'Subscribers'
    const timestamp = new Date().toISOString()

    if (!spreadsheetId) {
      throw new Error('Google Sheets Subscriber ID not configured')
    }

    const rowData: SubscriberRow[] = [[email, name || '', timestamp]]
    await appendToSheet(auth, spreadsheetId, sheetName, rowData)

    return new Response(
      JSON.stringify({ success: true, message: 'Subscribed successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Subscriber API error:', error)

    const message =
      error instanceof Error
        ? error.message
        : 'Server error occurred while subscribing'

    return new Response(JSON.stringify({ success: false, message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
