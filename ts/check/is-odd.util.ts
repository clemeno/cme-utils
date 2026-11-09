import { TO_NUMBER } from '../convert/to-number.util.js'
import { IS_NUMERIC } from '../number/is-numeric.util.js'

/**
 * CHECK (is an odd `numeric` value)
 * @param v - The value to check
 * @returns `true` when `v` is numeric and odd
 * @example
 * ```typescript
 * IS_ODD(3) // returns true
 * IS_ODD('-3') // returns true
 * IS_ODD(4) // returns false
 * IS_ODD('abc') // returns false
 * IS_ODD(null) // returns false
 * ```
 */
export function IS_ODD (v: any): boolean {
  let res = false

  if (IS_NUMERIC(v)) {
    res = (TO_NUMBER(v) % 2) !== 0
  }

  return res
}
