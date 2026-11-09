/**
 * CHECK (is a `function`)
 * @param o - The value to check
 * @returns `true` when `o` is a function
 * @example
 * ```typescript
 * IS_A_FUNCTION(() => 1) // returns true
 * IS_A_FUNCTION(Math.max) // returns true
 * IS_A_FUNCTION('max') // returns false
 * IS_A_FUNCTION(null) // returns false
 * ```
 */
export function IS_A_FUNCTION<T> (o: any): o is ((..._: any) => T) {
  return typeof o === 'function'
}
