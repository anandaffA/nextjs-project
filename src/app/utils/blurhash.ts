// utils/blurhash.ts
import sharp from 'sharp'
import { encode} from 'blurhash'

export async function getBlurHash(imageBuffer: Buffer): Promise<string> {
  const image = sharp(imageBuffer)
  const { data, info } = await image
    .raw()
    .ensureAlpha()
    .resize(32, 32, { fit: 'inside' })
    .toBuffer({ resolveWithObject: true })

  const blurHash = encode(
    new Uint8ClampedArray(data),
    info.width,
    info.height,
    4,
    4
  )

  return blurHash
}




