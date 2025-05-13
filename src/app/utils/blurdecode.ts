import { decode } from 'blurhash'

export function blurHashToDataURL(blurHash: string, width = 32, height = 32) {
  const pixels = decode(blurHash, width, height)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  const imageData = ctx!.createImageData(width, height)
  imageData.data.set(pixels)
  ctx!.putImageData(imageData, 0, 0)

  return canvas.toDataURL()
}