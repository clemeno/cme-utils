import { describe, expect, it } from 'bun:test'
import type { AppValidationErrors } from '../ts/app-validation-errors.js'

describe(
  'AppValidationErrors',
  () => {
    it(
      'creates an empty validation errors object',
      () => {
        const errors: AppValidationErrors = {}
        expect(errors).toEqual({})
      }
    )

    it(
      'creates a validation errors object with a string error',
      () => {
        const errors: AppValidationErrors = { required: 'Field is required' }
        expect(errors['required']).toBe('Field is required')
      }
    )

    it(
      'creates a validation errors object with a boolean error',
      () => {
        const errors: AppValidationErrors = { minLength: true }
        expect(errors['minLength']).toBe(true)
      }
    )

    it(
      'creates a validation errors object with an object error',
      () => {
        const errors: AppValidationErrors = { minLength: { requiredLength: 5, actualLength: 3 } }
        expect(errors['minLength'].requiredLength).toBe(5)
      }
    )

    it(
      'creates a validation errors object with multiple errors',
      () => {
        const errors: AppValidationErrors = { required: true, pattern: 'Invalid format' }
        expect(Object.keys(errors)).toHaveLength(2)
      }
    )
  }
)
