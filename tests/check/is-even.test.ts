import { describe, expect, it } from 'bun:test'
import { IS_EVEN } from '../../ts/check/is-even.util.js'

describe(
  'IS_EVEN',
  () => {
    const testCases = [
      { name: 'should return true for even number 0', input: 0, expected: true },
      { name: 'should return true for even number 2', input: 2, expected: true },
      { name: 'should return true for even number 4', input: 4, expected: true },
      { name: 'should return true for even number -2', input: -2, expected: true },
      { name: 'should return true for even number -4', input: -4, expected: true },
      { name: 'should return true for even number 100', input: 100, expected: true },
      { name: 'should return true for even numeric string "0"', input: '0', expected: true },
      { name: 'should return true for even numeric string "2"', input: '2', expected: true },
      { name: 'should return true for even numeric string "4"', input: '4', expected: true },
      { name: 'should return true for even numeric string "-2"', input: '-2', expected: true },
      { name: 'should return true for even numeric string "100"', input: '100', expected: true },
      { name: 'should return false for odd number 1', input: 1, expected: false },
      { name: 'should return false for odd number 3', input: 3, expected: false },
      { name: 'should return false for odd number -1', input: -1, expected: false },
      { name: 'should return false for odd number -3', input: -3, expected: false },
      { name: 'should return false for odd number 99', input: 99, expected: false },
      { name: 'should return false for odd numeric string "1"', input: '1', expected: false },
      { name: 'should return false for odd numeric string "3"', input: '3', expected: false },
      { name: 'should return false for odd numeric string "-1"', input: '-1', expected: false },
      { name: 'should return false for odd numeric string "99"', input: '99', expected: false },
      { name: 'should return false for non-numeric string "hello"', input: 'hello', expected: false },
      { name: 'should return false for empty string', input: '', expected: false },
      { name: 'should return false for null', input: null, expected: false },
      { name: 'should return false for undefined', input: undefined, expected: false },
      { name: 'should return false for boolean true', input: true, expected: false },
      { name: 'should return false for empty object', input: {}, expected: false },
      { name: 'should return false for empty array', input: [], expected: false },
      { name: 'should return false for NaN', input: NaN, expected: false },
    ]

    it.each(testCases)(
      '%s',
      ({ name, input, expected }) => {
        expect(IS_EVEN(input)).toBe(expected)
      }
    )
  }
)
