/**
 * Checks whether a value is a `Map` instance with no entry.
 * @param o - The value to check
 * @returns true if `o` is an empty Map, false otherwise
 * @example
 * ```typescript
 * IS_A_MAP_AND_EMPTY(new Map()) // returns true
 * IS_A_MAP_AND_EMPTY(new Map([['a', 1]])) // returns false
 * IS_A_MAP_AND_EMPTY({}) // returns false
 * IS_A_MAP_AND_EMPTY(null) // returns false
 * ```
 */
export function IS_A_MAP_AND_EMPTY<T = any, U = any> (o: any): o is Map<T, U> {
  return (o instanceof Map) && (o.size === 0)
}
