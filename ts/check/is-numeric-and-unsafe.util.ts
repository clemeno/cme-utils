import type { numeric } from '../numeric.js'

/** CHECK (is a `numeric` value `∉ [ε, MAX_SAFE_INTEGER]`) */
export const IS_NUMERIC_AND_UNSAFE = (v: any): v is numeric => (
  (
    ((typeof v === 'number') && !Number.isNaN(v)) ||
    ((typeof v === 'string') && (v !== '') && !Number.isNaN(Number(v)) && !Number.isNaN(Number.parseFloat(v)))
  ) &&
  (+v < Number.EPSILON) && (Number.MAX_SAFE_INTEGER < +v)
)
