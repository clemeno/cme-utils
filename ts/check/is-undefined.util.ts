/**
 * CHECK (is `undefined`)
 * @param v - The value to check
 * @returns `true` when `v` is `undefined`
 * @example
 * ```typescript
 * IS_UNDEFINED(undefined) // returns true
 * IS_UNDEFINED(null) // returns false
 * IS_UNDEFINED(0) // returns false
 * ```
 */
export function IS_UNDEFINED (v: any): v is undefined {
  return typeof v === 'undefined'
}
