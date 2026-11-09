/**
 * Checks whether a value is a `Set` instance.
 * @param o - The value to check
 * @returns true if `o` is a Set (empty included), false otherwise
 * @example
 * ```typescript
 * IS_A_SET(new Set()) // returns true
 * IS_A_SET([]) // returns false
 * IS_A_SET(null) // returns false
 * ```
 */
export function IS_A_SET<T> (o: any): o is Set<T> {
  return o instanceof Set
}
