// import { type AbstractControl, type ValidationErrors, type ValidatorFn } from '@angular/forms'
import { IS_NUMERIC } from './check/check.util.js'
import { IS_SET } from './check/is-set.util.js'
import { TO_NUMBER } from './convert/convert.util.js'

/** Mimic Angular forms `ValidationErrors` type definition */
export type AppValidationErrors = Record<string, any>

/** Mimic Angular forms `AbstractControl` abstract class definition */
export interface AppAbstractControl <TValue = any> {
  readonly value: TValue
}

/** Mimic Angular forms `ValidatorFn` type definition */
export type AppValidatorFn = (control: AppAbstractControl) => AppValidationErrors | null

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

export const IS_SMALL_INT_UNSIGNED_VALIDATOR: AppValidatorFn = control => {
  const value = TO_NUMBER(control.value)

  let res: any = null

  if (
    IS_SET(control.value) &&
    (control.value !== '') &&
    (!IS_NUMERIC(value) || !Number.isInteger(value) || (value < 0) || (65535 < value))
  ) {
    res = { isSmallInt: true }
  }

  return res
}

export const IS_TINY_INT_UNSIGNED_VALIDATOR: AppValidatorFn = control => {
  const value = TO_NUMBER(control.value)

  let res: any = null

  if (
    IS_SET(control.value) &&
    (control.value !== '') &&
    (!IS_NUMERIC(value) || !Number.isInteger(value) || (value < 0) || (255 < value))
  ) {
    res = { isSmallInt: true }
  }

  return res
}

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
