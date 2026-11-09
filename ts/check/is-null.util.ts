/**
 * CHECK (is `null`)
 * @param v - The value to check
 * @returns `true` when `v` is `null`
 * @example
 * ```typescript
 * IS_NULL(null) // returns true
 * IS_NULL(undefined) // returns false
 * IS_NULL(0) // returns false
 * ```
 */
export function IS_NULL (v: any): v is null {
  return v === null
}
