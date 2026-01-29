import { describe, expect, it } from 'bun:test'
import { MAX_SAFE_INTEGER } from '../../ts/constant/max-safe-integer.util.js'

describe(
  'MAX_SAFE_INTEGER',
  () => {
    const valueTestCases = [
      { name: 'literal value', expected: 9007199254740991 },
      { name: 'calculated value', expected: 2 ** 53 - 1 },
      { name: 'Number.MAX_SAFE_INTEGER', expected: Number.MAX_SAFE_INTEGER },
    ]

    it.each(valueTestCases)(
      'should be the maximum safe integer in JavaScript ($name)',
      ({ expected }) => {
        expect(MAX_SAFE_INTEGER).toBe(expected)
      }
    )

    const typeTestCases = [
      { name: 'typeof check', check: () => typeof MAX_SAFE_INTEGER === 'number', expected: true },
      { name: 'isInteger check', check: () => Number.isInteger(MAX_SAFE_INTEGER), expected: true },
      { name: 'isSafeInteger check', check: () => Number.isSafeInteger(MAX_SAFE_INTEGER), expected: true },
    ]

    it.each(typeTestCases)(
      'should be a number ($name)',
      ({ check, expected }) => {
        expect(check()).toBe(expected)
      }
    )
  }
)
