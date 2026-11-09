/**
 * ! internal
 * CHECK (is `falsy`)
 */
function IS_OFF (v: any): boolean {
  return (
    (typeof v === 'undefined') ||
    (v === null) ||
    (v === false) ||
    (v === '') ||
    (v === 0) ||
    ((typeof v === 'number') && isNaN(v))
  )
}

/**
 * CHECK (is `truthy`)
 * @param v - The value to check
 * @returns `true` when `v` is not `undefined`, `null`, `false`, `''`, `0` or `NaN`
 * @example
 * ```typescript
 * IS_ON(1) // returns true
 * IS_ON('a') // returns true
 * IS_ON([]) // returns true
 * IS_ON(0) // returns false
 * IS_ON('') // returns false
 * IS_ON(NaN) // returns false
 * IS_ON(null) // returns false
 * ```
 */
export function IS_ON<T = any> (v: T | null | undefined | false | '' | 0): v is T {
  return !IS_OFF(v)
}
