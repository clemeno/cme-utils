import { BYTE_ARRAY_TO_UUID } from './byte-array-to-uuid.util.js'

/**
 * Generate a standard RFC 4122 UUID v4 string
 */
export const UUID_V4 = (): string => {
  let res = ''

  let bErr = false

  try {
    // @ts-ignore
    res = crypto.randomUUID()
  } catch {
    bErr = true
  }

  if (bErr) {
    const randomByteArrayLength = 16
    let randomByteArray = new Uint8Array(randomByteArrayLength)

    try {
      // @ts-ignore
      randomByteArray = crypto.getRandomValues(randomByteArray)
    } catch {
      for (let i = 0; i < randomByteArrayLength; i += 1) {
        randomByteArray[i] = Math.floor(Math.random() * 256)
      }
    }

    // ! version: 4 (random UUID)
    randomByteArray[6] = (randomByteArray[6] & 0x0f) | 0x40

    // ! variant: RFC 4122
    randomByteArray[8] = (randomByteArray[8] & 0x3f) | 0x80

    res = BYTE_ARRAY_TO_UUID(randomByteArray)
  }

  return res
}
