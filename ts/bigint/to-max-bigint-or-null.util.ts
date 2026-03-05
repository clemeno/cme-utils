import { TO_BIGINT_OR_NULL } from './to-bigint-or-null.util.js'

/**
 * Returns the maximum bigint from an iterable of any values, or null if none can be coerced.
 * @param v - an iterable (array, readonly array, set, map values, etc.) of any values
 * @returns The maximum bigint found, or null if no value can be converted to bigint
 * @example
 * ```typescript
 * TO_MAX_BIGINT_OR_NULL([3n, 1n, 2n])                           // returns 3n
 * TO_MAX_BIGINT_OR_NULL(new Set([1n, 3n, 2n]))                  // returns 3n
 * TO_MAX_BIGINT_OR_NULL(new Map([['a', 1n], ['b', 3n]]).values()) // returns 3n
 * TO_MAX_BIGINT_OR_NULL([null, 'foo', {}])                      // returns null
 * TO_MAX_BIGINT_OR_NULL([])                                     // returns null
 * ```
 */
export function TO_MAX_BIGINT_OR_NULL (v: Iterable<unknown>): bigint | null {
  let max: bigint | null = null

  for (const item of v) {
    const b = TO_BIGINT_OR_NULL(item)
    if (b !== null && (max === null || b > max)) {
      max = b
    }
  }

  return max
}
