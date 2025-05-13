// app/api/generate-blurhash/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getBlurHash } from '@/app/utils/blurhash'

export async function POST(req: NextRequest) {
  try {
    const { fileData } = await req.json()
    const buffer = Buffer.from(fileData, 'base64')

    const blurHash = await getBlurHash(buffer)
    return NextResponse.json({ blurHash })
  } catch (error) {
    alert(`Failed to Generate BlurHash with ${error}`)
    return NextResponse.json(
      { error: 'Failed to generate blurhash.' },
      { status: 500 }
    )
  }
}


