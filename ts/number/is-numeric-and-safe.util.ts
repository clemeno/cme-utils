import type { numeric } from '../numeric.js'
import { TO_NUMBER } from '../convert/to-number.util.js'
import { IS_NUMERIC } from './is-numeric.util.js'

/**
 * CHECK (is a `numeric` value where `abs(v) = 0` or `abs(v) ∈ [ε, MAX_SAFE_INTEGER]`)
 * @param v - The value to check
 * @returns `true` when `v` is numeric and safe
 * @example
 * ```typescript
 * IS_NUMERIC_AND_SAFE(42) // returns true
 * IS_NUMERIC_AND_SAFE('0') // returns true
 * IS_NUMERIC_AND_SAFE(0) // returns true
 * IS_NUMERIC_AND_SAFE(Number.MAX_SAFE_INTEGER + 1) // returns false
 * IS_NUMERIC_AND_SAFE(1e-20) // returns false
 * IS_NUMERIC_AND_SAFE('abc') // returns false
 * ```
 */
export function IS_NUMERIC_AND_SAFE (v: any): v is numeric {
  return (
    IS_NUMERIC(v) &&
    ((Math.abs(TO_NUMBER(v)) === 0) || ((Number.EPSILON <= Math.abs(TO_NUMBER(v))) && (Math.abs(TO_NUMBER(v)) <= Number.MAX_SAFE_INTEGER)))
  )
}
