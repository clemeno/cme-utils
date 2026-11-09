import type { numeric } from '../numeric.js'
import { TO_NUMBER } from '../convert/to-number.util.js'
import { IS_NUMERIC } from './is-numeric.util.js'

/**
 * CHECK (is a `numeric` value where `abs(v) ≠ 0` and `abs(v) ∉ [ε, MAX_SAFE_INTEGER]`)
 * @param v - The value to check
 * @returns `true` when `v` is numeric and unsafe
 * @example
 * ```typescript
 * IS_NUMERIC_AND_UNSAFE(Number.MAX_SAFE_INTEGER + 1) // returns true
 * IS_NUMERIC_AND_UNSAFE(1e-20) // returns true
 * IS_NUMERIC_AND_UNSAFE(42) // returns false
 * IS_NUMERIC_AND_UNSAFE(0) // returns false
 * IS_NUMERIC_AND_UNSAFE('abc') // returns false
 * ```
 */
export function IS_NUMERIC_AND_UNSAFE (v: any): v is numeric {
  return (
    IS_NUMERIC(v) &&
    (Math.abs(TO_NUMBER(v)) !== 0) && ((Math.abs(TO_NUMBER(v)) < Number.EPSILON) || (Number.MAX_SAFE_INTEGER < Math.abs(TO_NUMBER(v))))
  )
}
