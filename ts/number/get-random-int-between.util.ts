import type { getRandomValuesFnType } from '../get-random-values-fn-type.js'
import { GET_RANDOM_BYTE_LIST } from './get-random-byte-list.util.js'

/**
 * Random integer between `a` and `b`, both bounds included, in any order (decimals are truncated first).
 * Every integer of the range is equally likely: a draw past the range is discarded and drawn again, never folded back into it.
 * Its randomness comes from the first source available: the `getRandomValues` given, then the global `crypto.getRandomValues`, then `Math.random`, which is not cryptographically secure.
 * Node 16 to 18 have no global `crypto` by default: pass `getRandomValues: webcrypto.getRandomValues.bind(webcrypto)` (`webcrypto` of `node:crypto`), or run Node 16.15+ or 17.6+ with `--experimental-global-webcrypto`.
 * @param _ - The bounds and the source
 * @param _.a - One bound
 * @param _.b - The other bound, which may be lower than `a`
 * @param _.getRandomValues - Optional source, a Web Crypto `getRandomValues` bound to its `crypto`; it comes before the global one
 * @returns A random integer `n` with `min(a, b) <= n <= max(a, b)`, or NaN when a bound is NaN or infinite
 * @example
 * ```typescript
 * GET_RANDOM_INT_BETWEEN({ a: 1, b: 6 }) // returns a random integer from 1 to 6
 * GET_RANDOM_INT_BETWEEN({ a: 6, b: 1 }) // returns a random integer from 1 to 6
 * GET_RANDOM_INT_BETWEEN({ a: 3.9, b: 3.2 }) // returns 3
 * GET_RANDOM_INT_BETWEEN({ a: -2, b: -2 }) // returns -2
 * GET_RANDOM_INT_BETWEEN({ a: 1, b: 6, getRandomValues: webcrypto.getRandomValues.bind(webcrypto) }) // returns a random integer from 1 to 6
 * GET_RANDOM_INT_BETWEEN({ a: 1, b: 6, getRandomValues: array => array.fill(2) }) // returns 3
 * GET_RANDOM_INT_BETWEEN({ a: 1, b: Infinity }) // returns NaN
 * ```
 */
export function GET_RANDOM_INT_BETWEEN (_: { a: number, b: number, getRandomValues?: getRandomValuesFnType }): number {
  const a = Math.trunc(_.a)
  const b = Math.trunc(_.b)

  const min = Math.min(a, b)
  const max = Math.max(a, b)

  let res = NaN

  if (Number.isFinite(min) && Number.isFinite(max)) {
    // in BigInt: between safe integers, max - min reaches 2^54 - 2, past MAX_SAFE_INTEGER
    const maxOffset = BigInt(max) - BigInt(min)
    const bitCount = (maxOffset === 0n) ? 0 : maxOffset.toString(2).length
    const mask = (1n << BigInt(bitCount)) - 1n

    let offset = maxOffset + 1n

    while (maxOffset < offset) {
      const byteList = GET_RANDOM_BYTE_LIST({ length: Math.ceil(bitCount / 8), getRandomValues: _.getRandomValues })
      // eslint-disable-next-line max-params
      offset = byteList.reduce((acc, byte) => (acc << 8n) | BigInt(byte), 0n) & mask
    }

    res = Number(BigInt(min) + offset)
  }

  return res
}
