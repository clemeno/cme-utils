import { describe, expect, it } from 'bun:test'
import { IS_A_NUMBER } from '../../ts/check/is-a-number.util.js'

describe(
  'IS_A_NUMBER',
  () => {
    const testCases = [
      { name: 'should return true for number 0', input: 0, expected: true },
      { name: 'should return true for number 123', input: 123, expected: true },
      { name: 'should return true for number -123', input: -123, expected: true },
      { name: 'should return true for number 123.45', input: 123.45, expected: true },
      { name: 'should return true for number -123.45', input: -123.45, expected: true },
      { name: 'should return false for NaN', input: NaN, expected: false },
      { name: 'should return false for string "123"', input: '123', expected: false },
      { name: 'should return false for null', input: null, expected: false },
      { name: 'should return false for undefined', input: undefined, expected: false },
      { name: 'should return false for boolean true', input: true, expected: false },
      { name: 'should return false for empty object', input: {}, expected: false },
      { name: 'should return false for empty array', input: [], expected: false },
      { name: 'should return false for empty string', input: '', expected: false },
    ]

    it.each(testCases)(
      '%s',
      ({ name, input, expected }) => {
        expect(IS_A_NUMBER(input)).toBe(expected)
      }
    )
  }
)
