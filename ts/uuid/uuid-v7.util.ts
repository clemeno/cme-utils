import type { getRandomValuesFnType } from '../get-random-values-fn-type.js'
import { GET_RANDOM_BYTE_LIST } from '../number/get-random-byte-list.util.js'
import { BYTE_ARRAY_TO_UUID } from './byte-array-to-uuid.util.js'
import { TO_NUMBER } from '../convert/to-number.util.js'

/**
 * Generate a standard RFC 9562 UUID v7 string
 * Its random bits come from the first source available: the `getRandomValues` given, then the global `crypto.getRandomValues`, then `Math.random`, which is not cryptographically secure.
 * Node 16 to 18 have no global `crypto` by default: pass `getRandomValues: webcrypto.getRandomValues.bind(webcrypto)` (`webcrypto` of `node:crypto`), or run Node 16.15+ or 17.6+ with `--experimental-global-webcrypto`.
 * @param _ - Optional source
 * @param _.getRandomValues - A Web Crypto `getRandomValues` bound to its `crypto`; it comes before the global one
 * @returns A lowercase UUID v7 string, whose first 48 bits are the current timestamp in milliseconds
 * @example
 * ```typescript
 * IS_UUID_STRING(UUID_V7()) // returns true
 * UUID_V7()[14] // returns '7'
 * UUID_V7() === UUID_V7() // returns false
 * IS_UUID_STRING(UUID_V7({ getRandomValues: webcrypto.getRandomValues.bind(webcrypto) })) // returns true
 * // after the 48 bits of the timestamp
 * UUID_V7({ getRandomValues: array => array.fill(0) }).slice(13) // returns '-7000-8000-000000000000'
 * ```
 */
export function UUID_V7 (_?: { getRandomValues?: getRandomValuesFnType }): string {
  const randomByteArray = GET_RANDOM_BYTE_LIST({ length: 16, getRandomValues: _?.getRandomValues })

  // * current timestamp in ms
  const timestampMs = BigInt(TO_NUMBER(new Date()))

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
