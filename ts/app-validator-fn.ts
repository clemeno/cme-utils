import type { AppAbstractControl } from './app-abstract-control.js'
import type { AppValidationErrors } from './app-validation-errors.js'

/** Mimic Angular forms `ValidatorFn` type definition */
export type AppValidatorFn = (control: AppAbstractControl) => AppValidationErrors | null
