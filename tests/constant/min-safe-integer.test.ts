import { describe, expect, it } from 'bun:test'
import { MIN_SAFE_INTEGER } from '../../ts/constant/min-safe-integer.util.js'

describe(
  'MIN_SAFE_INTEGER',
  () => {
    const valueTestCases = [
      { name: 'literal value', expected: -9007199254740991 },
      { name: 'calculated value', expected: -(2 ** 53 - 1) },
      { name: 'Number.MIN_SAFE_INTEGER', expected: Number.MIN_SAFE_INTEGER },
    ]

    it.each(valueTestCases)(
      'should be the minimum safe integer in JavaScript ($name)',
      ({ expected }) => {
        expect(MIN_SAFE_INTEGER).toBe(expected)
      }
    )

    const typeTestCases = [
      { name: 'typeof check', check: () => typeof MIN_SAFE_INTEGER === 'number', expected: true },
      { name: 'isInteger check', check: () => Number.isInteger(MIN_SAFE_INTEGER), expected: true },
      { name: 'isSafeInteger check', check: () => Number.isSafeInteger(MIN_SAFE_INTEGER), expected: true },
    ]

    it.each(typeTestCases)(
      'should be a number ($name)',
      ({ check, expected }) => {
        expect(check()).toBe(expected)
      }
    )
  }
)
