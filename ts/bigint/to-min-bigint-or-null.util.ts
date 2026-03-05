import { TO_BIGINT_OR_NULL } from './to-bigint-or-null.util.js'

/**
 * Returns the minimum bigint from an iterable of any values, or null if none can be coerced.
 * @param v - an iterable (array, readonly array, set, map values, etc.) of any values
 * @returns The minimum bigint found, or null if no value can be converted to bigint
 * @example
 * ```typescript
 * TO_MIN_BIGINT_OR_NULL([3n, 1n, 2n])                           // returns 1n
 * TO_MIN_BIGINT_OR_NULL(new Set([3n, 1n, 2n]))                  // returns 1n
 * TO_MIN_BIGINT_OR_NULL(new Map([['a', 3n], ['b', 1n]]).values()) // returns 1n
 * TO_MIN_BIGINT_OR_NULL([null, 'foo', {}])                      // returns null
 * TO_MIN_BIGINT_OR_NULL([])                                     // returns null
 * ```
 */
export function TO_MIN_BIGINT_OR_NULL (v: Iterable<unknown>): bigint | null {
  let min: bigint | null = null

  for (const item of v) {
    const b = TO_BIGINT_OR_NULL(item)
    if (b !== null && (min === null || b < min)) {
      min = b
    }
  }

  return min
}
