import { describe, expect, it } from 'bun:test'
import { IS_A_SET_AND_NOT_EMPTY } from '../../ts/set/is-a-set-and-not-empty.util.js'

describe(
  'IS_A_SET_AND_NOT_EMPTY',
  () => {
    const testCases = [
      { name: 'should return true for Set with one number', input: new Set([1]), expected: true },
      { name: 'should return true for Set with multiple numbers', input: new Set([1, 2, 3]), expected: true },
      { name: 'should return true for Set with string', input: new Set(['a']), expected: true },
      { name: 'should return true for Set with object', input: new Set([{}]), expected: true },
      { name: 'should return false for empty Set', input: new Set(), expected: false },
      { name: 'should return false for []', input: [], expected: false },
      { name: 'should return false for {}', input: {}, expected: false },
      { name: 'should return false for string "hello"', input: 'hello', expected: false },
      { name: 'should return false for number 123', input: 123, expected: false },
      { name: 'should return false for null', input: null, expected: false },
      { name: 'should return false for undefined', input: undefined, expected: false },
      { name: 'should return false for true', input: true, expected: false },
      { name: 'should return false for new Map()', input: new Map(), expected: false },
    ]

    it.each(testCases)('%s', ({ input, expected }) => {
      expect(IS_A_SET_AND_NOT_EMPTY(input)).toBe(expected)
    })
  }
)
