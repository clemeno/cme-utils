import { describe, expect, it } from 'bun:test'
import type { numeric } from '../ts/numeric.js'

describe(
  'numeric',
  () => {
    const testCases: Array<{ name: string, value: numeric }> = [
      { name: 'number', value: 42 },
      { name: 'float number', value: 3.14 },
      { name: 'negative number', value: -7 },
      { name: 'numeric string', value: '123' },
      { name: 'empty string', value: '' },
      { name: 'string "NaN"', value: 'NaN' },
    ]

    it.each(testCases)(
      '$name',
      ({ value }) => {
        const v: numeric = value
        expect(v).toBe(value)
      }
    )

    it(
      'accepts NaN',
      () => {
        const v: numeric = NaN
        expect(v).toBeNaN()
      }
    )
  }
)
