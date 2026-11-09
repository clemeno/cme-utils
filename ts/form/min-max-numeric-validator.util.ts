import { IS_NUMERIC } from '../number/is-numeric.util.js'
import { IS_SET } from '../check/is-set.util.js'
import { TO_NUMBER } from '../convert/to-number.util.js'
import type { AppValidatorFn } from '../app-validator-fn.js'

/**
 * Builds a form validator that accepts a numeric value between `min` and `max` (both inclusive).
 * An unset or empty value is valid (combine with a required validator).
 * @param _ - The parameter object
 * @param _.min - The smallest accepted value
 * @param _.max - The largest accepted value
 * @returns A validator returning null when the control value is valid, otherwise `{ minMaxNumeric: true }`
 * @example
 * ```typescript
 * const validator = MIN_MAX_NUMERIC_VALIDATOR({ min: 1, max: 10 })
 * validator({ value: 5 }) // returns null
 * validator({ value: '' }) // returns null
 * validator({ value: 0 }) // returns { minMaxNumeric: true }
 * validator({ value: 11 }) // returns { minMaxNumeric: true }
 * validator({ value: 'abc' }) // returns { minMaxNumeric: true }
 * ```
 */
export function MIN_MAX_NUMERIC_VALIDATOR (_: { min: number, max: number }): AppValidatorFn {
  return control => {
    const value = TO_NUMBER(control.value)

    let res: any = null

    if (
      IS_SET(control.value) &&
      (control.value !== '') &&
      (!IS_NUMERIC(value) || (value < _.min) || (_.max < value))
    ) {
      res = { minMaxNumeric: true }
    }

    return res
  }
}
