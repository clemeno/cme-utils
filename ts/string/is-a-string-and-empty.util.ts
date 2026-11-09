/**
 * Checks whether a value is the empty string `''`.
 * @param v - The value to check
 * @returns true if `v` is '' (empty string), false otherwise
 * @example
 * ```typescript
 * IS_A_STRING_AND_EMPTY('') // returns true
 * IS_A_STRING_AND_EMPTY('a') // returns false
 * IS_A_STRING_AND_EMPTY(null) // returns false
 * IS_A_STRING_AND_EMPTY(undefined) // returns false
 * ```
 */
export function IS_A_STRING_AND_EMPTY (v: any): v is string {
  return v === ''
}
