import { IS_NUMERIC } from '../check/is-numeric.util.js'
import { IS_SET } from '../check/is-set.util.js'
import { TO_NUMBER } from '../convert/to-number.util.js'
import type { AppValidatorFn } from '../app-validator-fn.js'

export const MIN_MAX_NUMERIC_VALIDATOR = (_: { min: number, max: number }): AppValidatorFn => {
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
