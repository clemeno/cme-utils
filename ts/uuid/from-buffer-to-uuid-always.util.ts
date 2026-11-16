import { TO_STRING } from '../convert/to-string.util.js'
import { FROM_HEX_TO_UUID } from './from-hex-to-uuid.util.js'

// the 2 hex digits of each byte, built once
const byteHexList: string[] = []

for (let n = 0; n < 256; n += 1) {
  const byteHex = (n + 0x100).toString(16).slice(1)
  byteHexList.push(byteHex)
}

/**
 * Converts bytes (a Buffer, a typed array or an array of numbers, each taken modulo 256 as a `Uint8Array` does) to a UUID string, defaults to the string '00000000-0000-0000-0000-000000000000' (= the NIL UUID)
 * @param b - The bytes, or anything else with `toString('hex')`; shorter content is left-padded with zeros, longer content keeps its first 16 bytes
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

  if (Array.isArray(b) || ArrayBuffer.isView(b)) {
    bytesHex = Array.from(b as ArrayLike<number>, n => byteHexList[n & 0xff]).join('')
  } else if (typeof b?.toString === 'function' && typeof b !== 'number' && typeof b !== 'bigint') {
    // a number and a bigint take 'hex' as a radix, and throw a RangeError
    bytesHex = TO_STRING(b.toString('hex'))
  }

  return FROM_HEX_TO_UUID(bytesHex)
}
