// app/api/resolve-location/route.ts

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'Missing URL' }, { status: 400 })
  }

  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    })

    const finalUrl = response.url

    return NextResponse.json({
      url: finalUrl,
    })
  } catch {
    return NextResponse.json(
      { error: 'Unable to resolve Google Maps URL' },
      { status: 500 }
    )
  }
}
