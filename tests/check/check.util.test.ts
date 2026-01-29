import { describe, expect, it } from 'bun:test'
import { CHECK } from '../../ts/check/check.util.js'

describe(
  'CHECK',
  () => {
    const testCases = [
      { name: 'should return true when condition is true', input: { that: true }, expected: true, isThrow: false },
      { name: 'should return false when condition is false', input: { that: false }, expected: false, isThrow: false },
      { name: 'should throw error when condition is false and orThrow is Error', input: { that: false, orThrow: new Error('Test error') }, expected: 'Test error', isThrow: true },
      { name: 'should throw string when condition is false and orThrow is string', input: { that: false, orThrow: 'error message' }, expected: 'error message', isThrow: true },
      { name: 'should not throw when condition is true even with orThrow', input: { that: true, orThrow: new Error('Should not throw') }, expected: true, isThrow: false },
      { name: 'should not throw when orThrow is null', input: { that: false, orThrow: null }, expected: false, isThrow: false },
      { name: 'should not throw when orThrow is undefined', input: { that: false, orThrow: undefined }, expected: false, isThrow: false },
    ]

    it.each(testCases)('%s', ({ input, expected, isThrow }) => {
      if (isThrow) {
        expect(() => CHECK(input)).toThrow(expected)
      } else {
        expect(CHECK(input)).toBe(expected)
      }
    })
  }
)
