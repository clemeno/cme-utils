import type { numeric } from '../numeric.js'
import { TO_NUMBER } from '../convert/to-number.util.js'
import { IS_NUMERIC } from './is-numeric.util.js'

/** CHECK (is a `numeric` value where `abs(v) = 0` or `abs(v) ∈ [ε, MAX_SAFE_INTEGER]`) */
export function IS_NUMERIC_AND_SAFE (v: any): v is numeric {
  return (
    IS_NUMERIC(v) &&
    ((Math.abs(TO_NUMBER(v)) === 0) || ((Number.EPSILON <= Math.abs(TO_NUMBER(v))) && (Math.abs(TO_NUMBER(v)) <= Number.MAX_SAFE_INTEGER)))
  )
}
