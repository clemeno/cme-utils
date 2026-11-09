import type { AppValidatorFn } from '../app-validator-fn.js'
import { TO_NUMBER } from '../convert/to-number.util.js'

/**
 * Form validator: accepts a non-negative integer, as a number or as an untrimmed numeric string.
 * Unlike the unsigned int validators, an unset or empty value is invalid.
 * @param control - The form control, read through its `value`
 * @returns null when the value is valid, otherwise the error `{ isNumericPositiveInteger: true }`
 * @example
 * ```typescript
 * IS_NUMERIC_POSITIVE_INTEGER_VALIDATOR({ value: 5 }) // returns null
 * IS_NUMERIC_POSITIVE_INTEGER_VALIDATOR({ value: '5' }) // returns null
 * IS_NUMERIC_POSITIVE_INTEGER_VALIDATOR({ value: '' }) // returns { isNumericPositiveInteger: true }
 * IS_NUMERIC_POSITIVE_INTEGER_VALIDATOR({ value: null }) // returns { isNumericPositiveInteger: true }
 * IS_NUMERIC_POSITIVE_INTEGER_VALIDATOR({ value: -1 }) // returns { isNumericPositiveInteger: true }
 * IS_NUMERIC_POSITIVE_INTEGER_VALIDATOR({ value: ' 5' }) // returns { isNumericPositiveInteger: true }
 * ```
 */
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
