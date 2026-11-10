import { ARRAY_LIKE_10_TO_ARRAY_16 } from '../convert/array-like-10-to-array-16.util.js'
import { TO_ANY_ARRAY } from '../convert/to-any-array.util.js'
import { TO_STRING } from '../convert/to-string.util.js'

/**
 * Converts a Buffer to a UUID string, defaults to the string '00000000-0000-0000-0000-000000000000' (= the NIL UUID)
 * @param b - The bytes: a Buffer, a typed array, an array of numbers, or anything with `toString('hex')`; shorter content is left-padded with zeros
 * @returns The UUID string, the NIL UUID when `b` has no hex form
 * @example
 * ```typescript
 * FROM_BUFFER_TO_UUID_ALWAYS(Buffer.from('0123456789abcdef0123456789abcdef', 'hex')) // returns '01234567-89ab-cdef-0123-456789abcdef'
 * FROM_BUFFER_TO_UUID_ALWAYS(Buffer.from('ff', 'hex')) // returns '00000000-0000-0000-0000-0000000000ff'
 * FROM_BUFFER_TO_UUID_ALWAYS(new Uint8Array([255])) // returns '00000000-0000-0000-0000-0000000000ff'
 * FROM_BUFFER_TO_UUID_ALWAYS(null) // returns '00000000-0000-0000-0000-000000000000'
 * ```
 */
export function FROM_BUFFER_TO_UUID_ALWAYS (b: any): string {
  let bytesHex = ''

  // only a Buffer understands toString('hex'): a browser hands typed arrays, so bytes are read one by one
  const bByteList = Array.isArray(b) || ArrayBuffer.isView(b)

  try { bytesHex = bByteList ? ARRAY_LIKE_10_TO_ARRAY_16(TO_ANY_ARRAY(b)).map(s => s.padStart(2, '0')).join('') : TO_STRING(b?.toString('hex')) } catch { }

  // padded after the try, so a value without a hex form gives the NIL UUID
  const hex = bytesHex.padStart(32, '0')

  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join('-')
}
