/**
 * CHECK (is an `object` instance, not `null`)
 * @param o - The value to check
 * @returns `true` when `o` is a non-null object (arrays included)
 * @example
 * ```typescript
 * IS_AN_OBJECT({}) // returns true
 * IS_AN_OBJECT([]) // returns true
 * IS_AN_OBJECT(null) // returns false
 * IS_AN_OBJECT('a') // returns false
 * IS_AN_OBJECT(undefined) // returns false
 * ```
 */
export function IS_AN_OBJECT (o: any): o is any {
  return (o !== null) && (typeof o === 'object')
}
