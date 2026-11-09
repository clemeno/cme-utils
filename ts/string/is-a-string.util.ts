/**
 * Checks whether a value is a `string`.
 * @param v - The value to check
 * @returns true if `v` is a string (empty string included), false otherwise
 * @example
 * ```typescript
 * IS_A_STRING('a') // returns true
 * IS_A_STRING('') // returns true
 * IS_A_STRING(42) // returns false
 * IS_A_STRING(null) // returns false
 * ```
 */
export function IS_A_STRING (v: any): v is string {
  return typeof v === 'string'
}
