/**
 * CHECK (is a `number`)
 * @param v - The value to check
 * @returns `true` when `v` is a `number` and not `NaN`
 * @example
 * ```typescript
 * IS_A_NUMBER(42) // returns true
 * IS_A_NUMBER(NaN) // returns false
 * IS_A_NUMBER('42') // returns false
 * IS_A_NUMBER(42n) // returns false
 * ```
 */
export function IS_A_NUMBER (v: any): v is number {
  return (typeof v === 'number') && !isNaN(v)
}
