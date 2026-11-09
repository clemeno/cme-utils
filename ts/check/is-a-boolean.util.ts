/**
 * CHECK (is a `boolean`)
 * @param v - The value to check
 * @returns `true` when `v` is `true` or `false`
 * @example
 * ```typescript
 * IS_A_BOOLEAN(false) // returns true
 * IS_A_BOOLEAN('true') // returns false
 * IS_A_BOOLEAN(0) // returns false
 * IS_A_BOOLEAN(undefined) // returns false
 * ```
 */
export function IS_A_BOOLEAN (v: any): v is boolean {
  return typeof v === 'boolean'
}
