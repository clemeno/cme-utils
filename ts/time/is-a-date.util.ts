/**
 * CHECK (is a `Date` instance)
 * @param o - The value to check
 * @returns `true` when `o` is a `Date`, valid or not
 * @example
 * ```typescript
 * IS_A_DATE(new Date(0)) // returns true
 * IS_A_DATE(new Date('invalid')) // returns true
 * IS_A_DATE('2024-01-01') // returns false
 * ```
 */
export function IS_A_DATE (o: any): o is Date {
  return o instanceof Date
}
