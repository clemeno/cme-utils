import { TO_BIGINT_OR_NULL } from './to-bigint-or-null.util.js'

/**
 * Converts a value to a bigint like `TO_BIGINT_OR_NULL`, falling back to `0n`.
 * @param v - The value to convert
 * @returns The bigint, or 0n when the value has no exact bigint form
 * @example
 * ```typescript
 * TO_BIGINT_OR_ZERO('42') // returns 42n
 * TO_BIGINT_OR_ZERO(5n) // returns 5n
 * TO_BIGINT_OR_ZERO(1.5) // returns 0n
 * TO_BIGINT_OR_ZERO(null) // returns 0n
 * ```
 */
export function TO_BIGINT_OR_ZERO (v: any): bigint {
  return TO_BIGINT_OR_NULL(v) ?? 0n
}
