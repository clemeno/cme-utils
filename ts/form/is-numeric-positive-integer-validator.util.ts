import type { AppValidatorFn } from '../app-validator-fn.js'

export const IS_NUMERIC_POSITIVE_INTEGER_VALIDATOR: AppValidatorFn = control => {
  const value = control.value
  const bNumber = typeof value === 'number'
  const bString = typeof value === 'string'

  let res: any = null

  if (
    (!bNumber && !bString) ||
    (bNumber && Number.isNaN(value)) ||
    (bString && ((value === '') || ((+value - +value) !== 0))) ||
    (bNumber && (value < 0)) ||
    (bString && (+value < 0)) ||
    (bNumber && !Number.isInteger(value)) ||
    (bString && !Number.isInteger(+value)) ||
    (bString && (value !== value.trim()))
  ) {
    res = { isNumericPositiveInteger: true }
  }

  return res
}
