import { BYTE_ARRAY_TO_UUID } from './byte-array-to-uuid.util.js'

/**
 * Generate a standard RFC 9652 UUID v7 string
 */
export const UUID_V7 = (): string => {
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

  // * current timestamp in ms
  const timestampMs = BigInt(+(new Date()))

  // ! timestamp
  randomByteArray[0] = Number((timestampMs >> 40n) & 0xffn)
  randomByteArray[1] = Number((timestampMs >> 32n) & 0xffn)
  randomByteArray[2] = Number((timestampMs >> 24n) & 0xffn)
  randomByteArray[3] = Number((timestampMs >> 16n) & 0xffn)
  randomByteArray[4] = Number((timestampMs >> 8n) & 0xffn)
  randomByteArray[5] = Number(timestampMs & 0xffn)

  // ! version: 7 (time-sortable random UUID)
  randomByteArray[6] = (randomByteArray[6] & 0x0f) | 0x70

  // ! variant: RFC 9652
  randomByteArray[8] = (randomByteArray[8] & 0x3f) | 0x80

  return BYTE_ARRAY_TO_UUID(randomByteArray)
}
