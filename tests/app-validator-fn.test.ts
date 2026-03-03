import { describe, expect, it } from 'bun:test'
import type { AppAbstractControl } from '../ts/app-abstract-control.js'
import type { AppValidationErrors } from '../ts/app-validation-errors.js'
import type { AppValidatorFn } from '../ts/app-validator-fn.js'
import { IS_A_STRING_AND_NOT_EMPTY } from '../ts/check/is-a-string-and-not-empty.util.js'

describe(
  'AppValidatorFn',
  () => {
    it(
      'creates a validator function that returns null when valid',
      () => {
        const validator: AppValidatorFn = (_control: AppAbstractControl) => null

        const ctrl: AppAbstractControl<string> = { value: 'valid' }

        expect(validator(ctrl)).toBeNull()
      }
    )

    it(
      'creates a validator function that returns errors when invalid',
      () => {
        const validator: AppValidatorFn = (control: AppAbstractControl) => {
          return IS_A_STRING_AND_NOT_EMPTY(control.value) ? null : { required: true }
        }

        const emptyCtrl: AppAbstractControl<string> = { value: '' }

        const errors = validator(emptyCtrl) as AppValidationErrors

        expect(errors).not.toBeNull()
        expect(errors['required']).toBe(true)
      }
    )

    it(
      'creates a validator function that checks min length',
      () => {
        const minLength = 3

        const validator: AppValidatorFn = (control: AppAbstractControl) => {
          const val = String(control.value ?? '')

          return (val.length >= minLength) ? null : { minLength: { requiredLength: minLength, actualLength: val.length } }
        }

        const shortCtrl: AppAbstractControl<string> = { value: 'ab' }

        const result = validator(shortCtrl) as AppValidationErrors

        expect(result['minLength'].requiredLength).toBe(3)
      }
    )

    it(
      'validator receives the control value',
      () => {
        let received: any

        const validator: AppValidatorFn = (control: AppAbstractControl) => {
          received = control.value

          return null
        }

        const ctrl: AppAbstractControl<number> = { value: 99 }

        validator(ctrl)

        expect(received).toBe(99)
      }
    )
  }
)
