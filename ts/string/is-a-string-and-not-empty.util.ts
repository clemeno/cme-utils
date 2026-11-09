/**
 * Checks whether a value is a string other than `''`.
 * @param v - The value to check
 * @returns true if `v` is a non-empty string, false otherwise
 * @example
 * ```typescript
 * IS_A_STRING_AND_NOT_EMPTY('a') // returns true
 * IS_A_STRING_AND_NOT_EMPTY('') // returns false
 * IS_A_STRING_AND_NOT_EMPTY(42) // returns false
 * IS_A_STRING_AND_NOT_EMPTY(null) // returns false
 * ```
 */
export function IS_A_STRING_AND_NOT_EMPTY (v: any): v is string {
  return (typeof v === 'string') && (v !== '')
}
