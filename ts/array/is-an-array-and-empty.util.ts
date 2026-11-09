/**
 * Checks whether a value is an empty `Array` instance (`[]`).
 * @param v - The value to check
 * @returns True when the value is an array with no slot, narrowing it to `T[]`
 * @example
 * ```typescript
 * IS_AN_ARRAY_AND_EMPTY([]) // returns true
 * IS_AN_ARRAY_AND_EMPTY([1]) // returns false
 * IS_AN_ARRAY_AND_EMPTY(undefined) // returns false
 * ```
 */
export function IS_AN_ARRAY_AND_EMPTY<T = any> (v: any): v is T[] {
  return Array.isArray(v) && (v.length === 0)
}
