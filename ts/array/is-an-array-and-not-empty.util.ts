/**
 * Checks whether a value is an `Array` instance with at least 1 slot.
 * @param v - The value to check
 * @returns True when the value is a non-empty array, narrowing it to `T[]`
 * @example
 * ```typescript
 * IS_AN_ARRAY_AND_NOT_EMPTY([1, 2, 3]) // returns true
 * IS_AN_ARRAY_AND_NOT_EMPTY([]) // returns false
 * IS_AN_ARRAY_AND_NOT_EMPTY('hello') // returns false
 * ```
 */
export function IS_AN_ARRAY_AND_NOT_EMPTY<T = any> (v: any): v is T[] {
  return Array.isArray(v) && (v.length !== 0)
}
