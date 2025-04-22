import { TO_STRING } from './convert/to-string.util.js'

const n2hh: string[] = []

for (let n = 0; n < 256; n += 1) {
  const hh = (n + 0x100).toString(16).slice(1)
  n2hh.push(hh)
}

/**
 *
 * @param uint8Array - A Uint8Array of 16 bytes (128 bits) representing a UUID
 * @description Converts a Uint8Array to a UUID string.
 * The UUID string is formatted as 8-4-4-4-12 hexadecimal digits, separated by hyphens.
 * @returns A UUID string in the format 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
 */
export const BYTE_ARRAY_TO_UUID = (uint8Array: Uint8Array) => {
  const ah = Array.from(uint8Array).map(n => n2hh[n])
  const partList = [ah.slice(0, 4), ah.slice(4, 6), ah.slice(6, 8), ah.slice(8, 10), ah.slice(10, 16)]
  return partList.map(p => p.join('')).join('-').toLowerCase()
}

/** defaults to the string '00000000-0000-0000-0000-000000000000' (= the NIL UUID) */
export const FROM_BUFFER_TO_UUID_ALWAYS = (b: any): string => {
  let hex = ''
  try { hex = TO_STRING(b?.toString('hex')).padStart(32, '0') } catch { }

  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join('-')
}

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

    // ! set the version to 4 (random UUID) and the variant to RFC 4122
    randomByteArray[6] = (randomByteArray[6] & 0x0f) | 0x40
    randomByteArray[8] = (randomByteArray[8] & 0x3f) | 0x80

    res = BYTE_ARRAY_TO_UUID(randomByteArray)
  }

  return res
}

export const IS_UUID_STRING = (v: any): boolean => {
  return (
    (typeof v === 'string') &&
    (v !== '') &&
    (v.length === 36) &&
    (v[8] === '-') &&
    (v[13] === '-') &&
    (v[18] === '-') &&
    (v[23] === '-') &&
    (v === v.toLowerCase()) &&
    (v === v.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)?.[0])
  )
}
