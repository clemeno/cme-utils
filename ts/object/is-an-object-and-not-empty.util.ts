/**
 * CHECK (is an `object` instance, a `Record` with at least 1 key)
 * @param o - The value to check
 * @returns `true` when `o` is a non-null object with at least 1 key
 * @example
 * ```typescript
 * IS_AN_OBJECT_AND_NOT_EMPTY({ a: 1 }) // returns true
 * IS_AN_OBJECT_AND_NOT_EMPTY({}) // returns false
 * IS_AN_OBJECT_AND_NOT_EMPTY(null) // returns false
 * IS_AN_OBJECT_AND_NOT_EMPTY('a') // returns false
 * ```
 */
export function IS_AN_OBJECT_AND_NOT_EMPTY (o: any): o is any {
  return (
    (o !== null) && (typeof o === 'object') && (Object.keys(o as Record<any, any>).length !== 0)
  )
}
