import type { getRandomValuesFnType } from '../get-random-values-fn-type.js'
import { GET_RANDOM_BYTE_LIST } from '../number/get-random-byte-list.util.js'
import { BYTE_ARRAY_TO_UUID } from './byte-array-to-uuid.util.js'

/**
 * Generate a standard RFC 4122 UUID v4 string
 * Its randomness comes from the first source available: the `getRandomValues` given, then the global `crypto.randomUUID`, then the global `crypto.getRandomValues`, then `Math.random`, which is not cryptographically secure.
 * Node 16 to 18 have no global `crypto` by default: pass `getRandomValues: webcrypto.getRandomValues.bind(webcrypto)` (`webcrypto` of `node:crypto`), or run Node 16.15+ or 17.6+ with `--experimental-global-webcrypto`.
 * @param _ - Optional source
 * @param _.getRandomValues - A Web Crypto `getRandomValues` bound to its `crypto`; it comes before the global `crypto`
 * @returns A random lowercase UUID v4 string
 * @example
 * ```typescript
 * IS_UUID_STRING(UUID_V4()) // returns true
 * UUID_V4()[14] // returns '4'
 * UUID_V4() === UUID_V4() // returns false
 * IS_UUID_STRING(UUID_V4({ getRandomValues: webcrypto.getRandomValues.bind(webcrypto) })) // returns true
 * UUID_V4({ getRandomValues: array => array.fill(0) }) // returns '00000000-0000-4000-8000-000000000000'
 * ```
 */
export function UUID_V4 (_?: { getRandomValues?: getRandomValuesFnType }): string {
  const getRandomValues = _?.getRandomValues

  // missing on Node 16 to 18, unless run with --experimental-global-webcrypto, and randomUUID in a page served over http
  const globalCrypto: Partial<Crypto> | undefined = globalThis.crypto

  let res = ''

  if (getRandomValues == null && typeof globalCrypto?.randomUUID === 'function') {
    res = globalCrypto.randomUUID()
  } else {
    const randomByteArray = GET_RANDOM_BYTE_LIST({ length: 16, getRandomValues })

    // ! version: 4 (random UUID)
    randomByteArray[6] = (randomByteArray[6] & 0x0f) | 0x40

    // ! variant: RFC 4122
    randomByteArray[8] = (randomByteArray[8] & 0x3f) | 0x80

    res = BYTE_ARRAY_TO_UUID(randomByteArray)
  }

  return res
}
