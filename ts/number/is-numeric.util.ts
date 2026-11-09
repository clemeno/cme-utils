import { TO_NUMBER } from '../convert/to-number.util.js'

/** CHECK (is a numeric `string`, by the same strict test as `TO_NUMBER`) or (a `number`, not `NaN`) */
export function IS_NUMERIC (v: any): boolean {
  return (
    ((typeof v === 'number') && !Number.isNaN(v)) ||
    ((typeof v === 'string') && !Number.isNaN(TO_NUMBER(v)))
  )
}
