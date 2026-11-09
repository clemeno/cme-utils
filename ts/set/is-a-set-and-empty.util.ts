/**
 * Checks whether a value is a `Set` instance with no member.
 * @param o - The value to check
 * @returns true if `o` is an empty Set, false otherwise
 * @example
 * ```typescript
 * IS_A_SET_AND_EMPTY(new Set()) // returns true
 * IS_A_SET_AND_EMPTY(new Set([1])) // returns false
 * IS_A_SET_AND_EMPTY([]) // returns false
 * IS_A_SET_AND_EMPTY(null) // returns false
 * ```
 */
export function IS_A_SET_AND_EMPTY<T> (o: any): o is Set<T> {
  return (o instanceof Set) && (o.size === 0)
}
