/**
 * Checks whether a value is an `Array` instance.
 * @param v - The value to check
 * @returns True when the value is an array, narrowing it to `T[]`
 * @example
 * ```typescript
 * IS_AN_ARRAY([1, 2, 3]) // returns true
 * IS_AN_ARRAY([]) // returns true
 * IS_AN_ARRAY('abc') // returns false
 * IS_AN_ARRAY(null) // returns false
 * ```
 */
export function IS_AN_ARRAY<T = any> (v: any): v is T[] {
  return Array.isArray(v)
}
