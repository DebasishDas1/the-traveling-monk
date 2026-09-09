// app/api/stories/route.ts
import { google } from 'googleapis'

const sheets = google.sheets('v4')

// Fix: 12 columns (A-L) instead of 11
type StoryRow = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
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

type AuthClient = Awaited<ReturnType<typeof getAuthClient>>

async function appendToSheet(
  auth: AuthClient,
  spreadsheetId: string,
  sheetName: string,
  values: StoryRow[]
) {
  await sheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: `${sheetName}!A:L`,
    valueInputOption: 'RAW',
    requestBody: { values },
  })
}

async function getStoriesFromSheet(
  auth: AuthClient,
  spreadsheetId: string,
  sheetName: string
) {
  const response = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: `${sheetName}!A:L`,
  })

  return response.data.values || []
}

function generateStoryId(): string {
  return `STORY-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`
}

// GET - Fetch all approved stories
export async function GET() {
  try {
    const auth = await getAuthClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_BOOKING_ID
    const sheetName = process.env.GOOGLE_SHEET_STORY_TAB || 'Stories'

    if (!spreadsheetId) {
      throw new Error('Google Sheets ID not configured')
    }

    const rows = await getStoriesFromSheet(auth, spreadsheetId, sheetName)

    // Skip header row and map to stories
    const stories = rows
      .slice(1)
      .map((row: string[]) => ({
        id: row[0],
        name: row[1],
        email: row[2],
        phone: row[3],
        title: row[4],
        excerpt: row[5],
        content: row[6],
        category: row[7],
        location: row[8],
        imageUrl: row[9],
        approved: row[10] === 'true',
        createdAt: row[11],
      }))
      .filter((story) => story.approved)

    return new Response(JSON.stringify({ success: true, data: stories }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Get stories error:', error)
    const message =
      error instanceof Error ? error.message : 'Failed to fetch stories'
    return new Response(JSON.stringify({ success: false, message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// POST - Submit new story
export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      phone,
      title,
      excerpt,
      content,
      category,
      location,
      imageUrl,
    } = await request.json()

    // Validate
    if (
      !name ||
      !email ||
      !phone ||
      !title ||
      !excerpt ||
      !content ||
      !category ||
      !location
    ) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const storyId = generateStoryId()
    const timestamp = new Date().toISOString()

    const auth = await getAuthClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_BOOKING_ID
    const sheetName = process.env.GOOGLE_SHEET_STORY_TAB || 'Stories'

    if (!spreadsheetId) {
      throw new Error('Google Sheets ID not configured')
    }

    // Columns: A-L (ID, Name, Email, Phone, Title, Excerpt, Content, Category, Location, ImageUrl, Approved, CreatedAt)
    const rowData: StoryRow[] = [
      [
        storyId,
        name,
        email,
        phone,
        title,
        excerpt,
        content,
        category,
        location,
        imageUrl || '',
        'false',
        timestamp,
      ],
    ]

    await appendToSheet(auth, spreadsheetId, sheetName, rowData)

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Story submitted for review. We will publish it soon!',
        storyId,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Submit story error:', error)
    const message =
      error instanceof Error ? error.message : 'Failed to submit story'
    return new Response(JSON.stringify({ success: false, message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
