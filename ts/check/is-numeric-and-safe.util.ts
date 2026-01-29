import type { numeric } from '../numeric.js'

/** CHECK (is a `numeric` value where `abs(v) = 0` or `abs(v) ∈ [ε, MAX_SAFE_INTEGER]`) */
export const IS_NUMERIC_AND_SAFE = (v: any): v is numeric => (
  (
    ((typeof v === 'number') && !Number.isNaN(v)) ||
    ((typeof v === 'string') && (v !== '') && !Number.isNaN(Number(v)) && !Number.isNaN(Number.parseFloat(v)))
  ) &&
  ((Math.abs(+v) === 0) || ((Number.EPSILON <= Math.abs(+v)) && (Math.abs(+v) <= Number.MAX_SAFE_INTEGER)))
)
