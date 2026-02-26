import { describe, expect, it } from 'bun:test'
import type { AppAbstractControl } from '../ts/app-abstract-control.js'

describe(
  'AppAbstractControl',
  () => {
    it(
      'creates a control with a string value',
      () => {
        const ctrl: AppAbstractControl<string> = { value: 'hello' }
        expect(ctrl.value).toBe('hello')
      }
    )

    it(
      'creates a control with a number value',
      () => {
        const ctrl: AppAbstractControl<number> = { value: 42 }
        expect(ctrl.value).toBe(42)
      }
    )

    it(
      'creates a control with a null value',
      () => {
        const ctrl: AppAbstractControl<null> = { value: null }
        expect(ctrl.value).toBeNull()
      }
    )

    it(
      'creates a control with an object value',
      () => {
        const ctrl: AppAbstractControl<{ id: number }> = { value: { id: 1 } }
        expect(ctrl.value.id).toBe(1)
      }
    )

    it(
      'creates a control with default any value',
      () => {
        const ctrl: AppAbstractControl = { value: 'anything' }
        expect(ctrl.value).toBe('anything')
      }
    )
  }
)
