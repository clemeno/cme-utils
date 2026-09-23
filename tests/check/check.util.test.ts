import { describe, expect, it } from 'bun:test'
import { CHECK } from '../../ts/check/check.util.js'

describe(
  'CHECK',
  () => {
    const returnCases: Array<{ name: string, input: { that: boolean, orThrow?: unknown }, expected: boolean }> = [
      { name: 'should return true when condition is true', input: { that: true }, expected: true },
      { name: 'should return false when condition is false', input: { that: false }, expected: false },
      { name: 'should not throw when condition is true even with orThrow', input: { that: true, orThrow: new Error('Should not throw') }, expected: true },
      { name: 'should not throw when orThrow is null', input: { that: false, orThrow: null }, expected: false },
      { name: 'should not throw when orThrow is undefined', input: { that: false, orThrow: undefined }, expected: false },
    ]

    it.each(returnCases)(
      '$name',
      ({ input, expected }) => {
        expect(CHECK(input)).toBe(expected)
      }
    )

    const throwCases: Array<{ name: string, input: { that: boolean, orThrow: unknown }, expectedMessage: string }> = [
      { name: 'should throw error when condition is false and orThrow is Error', input: { that: false, orThrow: new Error('Test error') }, expectedMessage: 'Test error' },
      { name: 'should throw string when condition is false and orThrow is string', input: { that: false, orThrow: 'error message' }, expectedMessage: 'error message' },
    ]

    it.each(throwCases)(
      '$name',
      ({ input, expectedMessage }) => {
        expect(() => CHECK(input)).toThrow(expectedMessage)
      }
    )
  }
)
