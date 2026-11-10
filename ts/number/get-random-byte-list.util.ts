import type { getRandomValuesFnType } from '../get-random-values-fn-type.js'

// getRandomValues throws a QuotaExceededError when asked for more bytes in one call
const maxByteCountPerCall = 65536

/**
 * Random bytes, drawn from the first source available: the `getRandomValues` given, then the global `crypto.getRandomValues` (browsers, bun, Node 19+), then `Math.random`, which is not cryptographically secure.
 * Node 16 to 18 have no global `crypto` by default: pass `getRandomValues: webcrypto.getRandomValues.bind(webcrypto)` (`webcrypto` of `node:crypto`), or run Node 16.15+ or 17.6+ with `--experimental-global-webcrypto`.
 * @param _ - The byte count and the source
 * @param _.length - How many bytes to draw
 * @param _.getRandomValues - Optional source, a Web Crypto `getRandomValues` bound to its `crypto`; it comes before the global one
 * @returns A `Uint8Array` of `length` random bytes
 * @example
 * ```typescript
 * GET_RANDOM_BYTE_LIST({ length: 16 }).length // returns 16
 * GET_RANDOM_BYTE_LIST({ length: 0 }) // returns new Uint8Array(0)
 * GET_RANDOM_BYTE_LIST({ length: 16, getRandomValues: webcrypto.getRandomValues.bind(webcrypto) }).length // returns 16
 * GET_RANDOM_BYTE_LIST({ length: 3, getRandomValues: array => array.fill(255) }) // returns new Uint8Array([255, 255, 255])
 * ```
 */
export function GET_RANDOM_BYTE_LIST (_: { length: number, getRandomValues?: getRandomValuesFnType }): Uint8Array {
  const { length } = _

  // missing on Node 16 to 18, unless run with --experimental-global-webcrypto
  const globalCrypto: Partial<Crypto> | undefined = globalThis.crypto

  let getRandomValues = _.getRandomValues

  if (getRandomValues == null && typeof globalCrypto?.getRandomValues === 'function') {
    getRandomValues = globalCrypto.getRandomValues.bind(globalCrypto)
  }

  let res = new Uint8Array(length)

  if (getRandomValues == null) {
    res = res.map(() => Math.floor(Math.random() * 256))
  } else {
    for (let offset = 0; offset < length; offset += maxByteCountPerCall) {
      getRandomValues(res.subarray(offset, offset + maxByteCountPerCall))
    }
  }

  return res
}
