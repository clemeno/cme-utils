/**
 * Checks whether a value is a `Map` instance with at least 1 entry.
 * @param o - The value to check
 * @returns true if `o` is a Map with at least 1 entry, false otherwise
 * @example
 * ```typescript
 * IS_A_MAP_AND_NOT_EMPTY(new Map([['a', 1]])) // returns true
 * IS_A_MAP_AND_NOT_EMPTY(new Map()) // returns false
 * IS_A_MAP_AND_NOT_EMPTY({ a: 1 }) // returns false
 * IS_A_MAP_AND_NOT_EMPTY(undefined) // returns false
 * ```
 */
export function IS_A_MAP_AND_NOT_EMPTY<T, U> (o: any): o is Map<T, U> {
  return (o instanceof Map) && (o.size !== 0)
}
