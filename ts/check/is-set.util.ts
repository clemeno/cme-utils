/**
 * CHECK (is set: neither `null` nor `undefined`)
 * @param v - The value to check
 * @returns `true` when `v` is neither `null` nor `undefined`
 * @example
 * ```typescript
 * IS_SET(0) // returns true
 * IS_SET('') // returns true
 * IS_SET(null) // returns false
 * IS_SET(undefined) // returns false
 * ```
 */
export function IS_SET<T> (v: T | null | undefined): v is T {
  return (v !== null) && (typeof v !== 'undefined')
}
