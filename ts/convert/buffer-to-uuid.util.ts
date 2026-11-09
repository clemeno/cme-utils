import { ARRAY_LIKE_10_TO_ARRAY_16 } from './array-like-10-to-array-16.util.js'
import { TO_ANY_ARRAY } from './to-any-array.util.js'

/**
 * Converts the first 16 bytes of a buffer, typed array or array of numbers into a UUID string.
 * @param b - The bytes, as a Buffer, a typed array or an array of numbers
 * @returns The UUID string `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`; only dashes when there are no bytes
 * @example
 * ```typescript
 * BUFFER_TO_UUID([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 255]) // returns '00010203-0405-0607-0809-0a0b0c0d0eff'
 * BUFFER_TO_UUID(new Uint8Array(16)) // returns '00000000-0000-0000-0000-000000000000'
 * BUFFER_TO_UUID([]) // returns '----'
 * ```
 */
export function BUFFER_TO_UUID (b: any): string {
  const input = TO_ANY_ARRAY(b).slice(0, 16)

  const parts = [
    input.slice(0, 4),
    input.slice(4, 6),
    input.slice(6, 8),
    input.slice(8, 10),
    input.slice(10, 16),
  ]

  return parts.map(p => ARRAY_LIKE_10_TO_ARRAY_16(p).map(s => s.padStart(2, '0')).join('')).join('-')
}
