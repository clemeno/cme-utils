import { describe, expect, it } from 'bun:test'
import type { numeric } from '../ts/numeric.js'

describe(
  'numeric',
  () => {
    it(
      'accepts a number',
      () => {
        const v: numeric = 42
        expect(v).toBe(42)
      }
    )

    it(
      'accepts a float number',
      () => {
        const v: numeric = 3.14
        expect(v).toBe(3.14)
      }
    )

    it(
      'accepts a negative number',
      () => {
        const v: numeric = -7
        expect(v).toBe(-7)
      }
    )

    it(
      'accepts a numeric string',
      () => {
        const v: numeric = '123'
        expect(v).toBe('123')
      }
    )

    it(
      'accepts an empty string',
      () => {
        const v: numeric = ''
        expect(v).toBe('')
      }
    )

    it(
      'accepts NaN',
      () => {
        const v: numeric = NaN
        expect(v).toBeNaN()
      }
    )

    it(
      'accepts a string representation of NaN',
      () => {
        const v: numeric = 'NaN'
        expect(v).toBe('NaN')
      }
    )
  }
)
