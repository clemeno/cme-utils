import { TO_STRING } from '../convert/to-string.util.js'
import { FROM_HEX_TO_UUID } from './from-hex-to-uuid.util.js'

// the 2 hex digits of each byte, built once: UUID_V4 and UUID_V7 format through this table
const n2hh: string[] = []

for (let n = 0; n < 256; n += 1) {
  const hh = (n + 0x100).toString(16).slice(1)
  n2hh.push(hh)
}

/**
 * Converts a Buffer to a UUID string, defaults to the string '00000000-0000-0000-0000-000000000000' (= the NIL UUID)
 * @param b - The bytes: a Buffer, a typed array, an array of numbers, or anything with `toString('hex')`; shorter content is left-padded with zeros, longer content keeps its first 16 bytes
 * @returns The UUID string, the NIL UUID when `b` has no bytes or no hex form
 * @example
 * ```typescript
 * FROM_BUFFER_TO_UUID_ALWAYS(Buffer.from('0123456789abcdef0123456789abcdef', 'hex')) // returns '01234567-89ab-cdef-0123-456789abcdef'
 * FROM_BUFFER_TO_UUID_ALWAYS(Buffer.from('ff', 'hex')) // returns '00000000-0000-0000-0000-0000000000ff'
 * FROM_BUFFER_TO_UUID_ALWAYS(new Uint8Array([255])) // returns '00000000-0000-0000-0000-0000000000ff'
 * FROM_BUFFER_TO_UUID_ALWAYS([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 255]) // returns '00010203-0405-0607-0809-0a0b0c0d0eff'
 * FROM_BUFFER_TO_UUID_ALWAYS([]) // returns '00000000-0000-0000-0000-000000000000'
 * FROM_BUFFER_TO_UUID_ALWAYS(null) // returns '00000000-0000-0000-0000-000000000000'
 * ```
 */
export function FROM_BUFFER_TO_UUID_ALWAYS (b: any): string {
  let bytesHex = ''

  // only a Buffer understands toString('hex'): a browser hands typed arrays, so bytes are read one by one
  const bByteList = Array.isArray(b) || ArrayBuffer.isView(b)

  // & 0xff wraps a number past 255 as a Uint8Array does, rather than missing the table
  try { bytesHex = bByteList ? Array.from(b as ArrayLike<number>, n => n2hh[n & 0xff]).join('') : TO_STRING(b?.toString('hex')) } catch { }

  return FROM_HEX_TO_UUID(bytesHex)
}
