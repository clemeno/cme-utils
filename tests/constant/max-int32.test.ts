import { describe, expect, it } from 'bun:test'
import { MAX_INT32 } from '../../ts/constant/max-int32.util.js'

describe(
  'MAX_INT32',
  () => {
    const valueTestCases = [
      { name: 'literal value', expected: 2147483647 },
      { name: 'calculated value', expected: 2 ** 31 - 1 },
    ]

    it.each(valueTestCases)(
      'should be the maximum value for a 32-bit signed integer ($name)',
      ({ expected }) => {
        expect(MAX_INT32).toBe(expected)
      }
    )

    const typeTestCases = [
      { name: 'typeof check', check: () => typeof MAX_INT32 === 'number', expected: true },
      { name: 'isInteger check', check: () => Number.isInteger(MAX_INT32), expected: true },
    ]

    it.each(typeTestCases)(
      'should be a number ($name)',
      ({ check, expected }) => {
        expect(check()).toBe(expected)
      }
    )
  }
)
