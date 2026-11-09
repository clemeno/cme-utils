/**
 * Checks whether a value is a `Map` instance.
 * @param o - The value to check
 * @returns true if `o` is a Map (empty included), false otherwise
 * @example
 * ```typescript
 * IS_A_MAP(new Map()) // returns true
 * IS_A_MAP({}) // returns false
 * IS_A_MAP(null) // returns false
 * ```
 */
export function IS_A_MAP<T = any, U = any> (o: any): o is Map<T, U> {
  return o instanceof Map
}
