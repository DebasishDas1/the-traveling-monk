// app/api/resolve-location/route.ts

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'Missing URL' }, { status: 400 })
  }

  function tryParseUrl(value: string) {
    try {
      return new URL(value)
    } catch {
      return null
    }
  }

  function canResolveLocationUrl(parsedUrl: URL) {
    const host = parsedUrl.host.toLowerCase()

    if (
      host === 'maps.app.goo.gl' ||
      host === 'goo.gl' ||
      host === 'g.page'
    ) {
      return true
    }

    if (host.endsWith('.google.com')) {
      return (
        parsedUrl.pathname.startsWith('/maps') ||
        parsedUrl.pathname.startsWith('/search') ||
        parsedUrl.searchParams.has('q') ||
        parsedUrl.searchParams.has('ll') ||
        parsedUrl.searchParams.has('query')
      )
    }

    return false
  }

  const parsedUrl = tryParseUrl(url)

  if (!parsedUrl || !canResolveLocationUrl(parsedUrl)) {
    return NextResponse.json(
      { error: 'Unsupported location URL' },
      { status: 400 }
    )
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
  } catch (error) {
    console.error('resolve-location failed:', error)
    return NextResponse.json(
      { error: 'Unable to resolve Google Maps URL' },
      { status: 500 }
    )
  }
}
