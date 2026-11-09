/**
 * CHECK (is an `object` instance of `{}`, an empty `Record`)
 * @param o - The value to check
 * @returns `true` when `o` is a non-null object without keys
 * @example
 * ```typescript
 * IS_AN_OBJECT_AND_EMPTY({}) // returns true
 * IS_AN_OBJECT_AND_EMPTY([]) // returns true
 * IS_AN_OBJECT_AND_EMPTY({ a: 1 }) // returns false
 * IS_AN_OBJECT_AND_EMPTY(null) // returns false
 * ```
 */
export function IS_AN_OBJECT_AND_EMPTY (o: any): o is any {
  return (
    (o !== null) && (typeof o === 'object') && (Object.keys(o as Record<any, any>).length === 0)
  )
}
