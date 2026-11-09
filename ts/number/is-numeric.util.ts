import { TO_NUMBER } from '../convert/to-number.util.js'

/**
 * CHECK (is a numeric `string`, by the same strict test as `TO_NUMBER`) or (a `number`, not `NaN`)
 * @param v - The value to check
 * @returns `true` when `v` is a number or a numeric string
 * @example
 * ```typescript
 * IS_NUMERIC(42) // returns true
 * IS_NUMERIC('42.5') // returns true
 * IS_NUMERIC('abc') // returns false
 * IS_NUMERIC(NaN) // returns false
 * IS_NUMERIC(null) // returns false
 * ```
 */
export function IS_NUMERIC (v: any): boolean {
  return (
    ((typeof v === 'number') && !Number.isNaN(v)) ||
    ((typeof v === 'string') && !Number.isNaN(TO_NUMBER(v)))
  )
}
