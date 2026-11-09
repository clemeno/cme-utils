import { IS_NUMERIC } from '../number/is-numeric.util.js'
import { IS_SET } from '../check/is-set.util.js'
import { TO_NUMBER } from '../convert/to-number.util.js'
import type { AppValidatorFn } from '../app-validator-fn.js'

/**
 * Form validator: accepts an unsigned 32-bit integer (0 to 4294967295), as a number or a numeric string.
 * An unset or empty value is valid (combine with a required validator).
 * @param control - The form control, read through its `value`
 * @returns null when the value is valid, otherwise the error `{ isSmallInt: true }` (the error key of the source, shared with the small and tiny variants)
 * @example
 * ```typescript
 * IS_INT_UNSIGNED_VALIDATOR({ value: 4294967295 }) // returns null
 * IS_INT_UNSIGNED_VALIDATOR({ value: '' }) // returns null
 * IS_INT_UNSIGNED_VALIDATOR({ value: 4294967296 }) // returns { isSmallInt: true }
 * IS_INT_UNSIGNED_VALIDATOR({ value: -1 }) // returns { isSmallInt: true }
 * IS_INT_UNSIGNED_VALIDATOR({ value: 1.5 }) // returns { isSmallInt: true }
 * ```
 */
export const IS_INT_UNSIGNED_VALIDATOR: AppValidatorFn = control => {
  const value = TO_NUMBER(control.value)

  let res: any = null

  if (
    IS_SET(control.value) &&
    (control.value !== '') &&
    (!IS_NUMERIC(value) || !Number.isInteger(value) || (value < 0) || (4294967295 < value))
  ) {
    res = { isSmallInt: true }
  }

  return res
}
