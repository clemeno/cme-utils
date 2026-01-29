import { describe, expect, it } from 'bun:test'
import { IS_AN_ARRAY } from '../../ts/check/is-an-array.util.js'

describe(
  'IS_AN_ARRAY',
  () => {
    const testCases = [
      { name: 'should return true for empty array', input: [], expected: true },
      { name: 'should return true for array [1, 2, 3]', input: [1, 2, 3], expected: true },
      { name: 'should return true for array ["a", "b"]', input: ['a', 'b'], expected: true },
      { name: 'should return true for array [{}]', input: [{}], expected: true },
      { name: 'should return false for string "hello"', input: 'hello', expected: false },
      { name: 'should return false for number 123', input: 123, expected: false },
      { name: 'should return false for null', input: null, expected: false },
      { name: 'should return false for undefined', input: undefined, expected: false },
      { name: 'should return false for boolean true', input: true, expected: false },
      { name: 'should return false for empty object', input: {}, expected: false },
      { name: 'should return false for NaN', input: NaN, expected: false },
    ]

    it.each(testCases)(
      '%s',
      ({ name, input, expected }) => {
        expect(IS_AN_ARRAY(input)).toBe(expected)
      }
    )
  }
)
