import { TO_NUMBER } from '../convert/to-number.util.js'
import { IS_NUMERIC } from '../number/is-numeric.util.js'

/**
 * CHECK (is an even `numeric` value)
 * @param v - The value to check
 * @returns `true` when `v` is numeric and even
 * @example
 * ```typescript
 * IS_EVEN(4) // returns true
 * IS_EVEN('-2') // returns true
 * IS_EVEN(3) // returns false
 * IS_EVEN('abc') // returns false
 * IS_EVEN(null) // returns false
 * ```
 */
export function IS_EVEN (v: any): boolean {
  let res = false

  if (IS_NUMERIC(v)) {
    res = (TO_NUMBER(v) % 2) === 0
  }

  return res
}
