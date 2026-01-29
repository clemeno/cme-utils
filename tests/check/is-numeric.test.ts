import { describe, expect, it } from 'bun:test'
import { IS_NUMERIC } from '../../ts/check/is-numeric.util.js'

describe(
  'IS_NUMERIC',
  () => {
    const testCases = [
      { input: 123, expected: true },
      { input: 0, expected: true },
      { input: -123, expected: true },
      { input: 123.45, expected: true },
      { input: '123', expected: true },
      { input: '0', expected: true },
      { input: '-123', expected: true },
      { input: '123.45', expected: true },
      { input: 'abc', expected: false },
      { input: '', expected: false },
      { input: ' ', expected: false },
      { input: null, expected: false },
      { input: undefined, expected: false },
      { input: {}, expected: false },
      { input: [], expected: false },
      { input: NaN, expected: false },
      { input: Infinity, expected: true },
      { input: -Infinity, expected: true },
    ]

    it(
      'should validate numeric values correctly',
      () => {
        for (const { input, expected } of testCases) {
          expect(IS_NUMERIC(input)).toBe(expected)
        }
      }
    )
  }
)
