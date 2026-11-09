import type { AppValidatorFn } from '../app-validator-fn.js'
import { TO_NUMBER } from '../convert/to-number.util.js'

export const IS_NUMERIC_POSITIVE_INTEGER_VALIDATOR: AppValidatorFn = control => {
  const value = control.value
  const bNumber = typeof value === 'number'
  const bString = typeof value === 'string'

  let res: any = null

  if (
    (!bNumber && !bString) ||
    (bNumber && Number.isNaN(value)) ||
    (bString && ((value === '') || ((TO_NUMBER(value) - TO_NUMBER(value)) !== 0))) ||
    (bNumber && (value < 0)) ||
    (bString && (TO_NUMBER(value) < 0)) ||
    (bNumber && !Number.isInteger(value)) ||
    (bString && !Number.isInteger(TO_NUMBER(value))) ||
    (bString && (value !== value.trim()))
  ) {
    res = { isNumericPositiveInteger: true }
  }

  return res
}
