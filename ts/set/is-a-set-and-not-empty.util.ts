/**
 * Checks whether a value is a `Set` instance with at least 1 member.
 * @param o - The value to check
 * @returns true if `o` is a Set with at least 1 member, false otherwise
 * @example
 * ```typescript
 * IS_A_SET_AND_NOT_EMPTY(new Set([1])) // returns true
 * IS_A_SET_AND_NOT_EMPTY(new Set()) // returns false
 * IS_A_SET_AND_NOT_EMPTY([1]) // returns false
 * IS_A_SET_AND_NOT_EMPTY(undefined) // returns false
 * ```
 */
export function IS_A_SET_AND_NOT_EMPTY<T> (o: any): o is Set<T> {
  return (o instanceof Set) && (o.size !== 0)
}
