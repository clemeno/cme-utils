/**
 * CHECK (is a `bigint`)
 * @param v - The value to check
 * @returns `true` when `v` is a `bigint`
 * @example
 * ```typescript
 * IS_A_BIGINT(42n) // returns true
 * IS_A_BIGINT(42) // returns false
 * IS_A_BIGINT('42') // returns false
 * IS_A_BIGINT(null) // returns false
 * ```
 */
export function IS_A_BIGINT (v: any): v is bigint {
  return typeof v === 'bigint'
}
