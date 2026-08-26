import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const trekSlug = formData.get('trekSlug') as string

    if (!file || !trekSlug) {
      return NextResponse.json(
        { error: 'Missing file or trek slug' },
        { status: 400 }
      )
    }

    const buffer = await file.arrayBuffer()
    const blob = await put(
      `trek-photos/${trekSlug}/${Date.now()}-${file.name}`,
      buffer,
      {
        access: 'public',
      }
    )

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
