import { IS_SET } from '../check/is-set.util.js'
import { TO_BIGINT_OR_NULL } from './to-bigint-or-null.util.js'

/**
 * Returns the absolute bigint value of the input, or null if it cannot be coerced to bigint.
 * @param v - any value to coerce to a non-negative bigint
 * @returns The absolute bigint value (>= 0n), or null if the value cannot be converted
 * @example
 * ```typescript
 * TO_ABS_BIGINT_OR_NULL(-42n) // returns 42n
 * TO_ABS_BIGINT_OR_NULL(42n)  // returns 42n
 * TO_ABS_BIGINT_OR_NULL(0n)   // returns 0n
 * TO_ABS_BIGINT_OR_NULL(-42)  // returns 42n
 * TO_ABS_BIGINT_OR_NULL('42') // returns 42n
 * TO_ABS_BIGINT_OR_NULL(null) // returns null
 * TO_ABS_BIGINT_OR_NULL({})   // returns null
 * ```
 */
export function TO_ABS_BIGINT_OR_NULL (v: unknown): bigint | null {
  const b = TO_BIGINT_OR_NULL(v)
  return IS_SET(b) ? (b < 0n ? -b : b) : null
}
