import { describe, expect, it } from 'bun:test'
import { IS_A_SET_AND_EMPTY } from '../../ts/check/is-a-set-and-empty.util.js'

describe(
  'IS_A_SET_AND_EMPTY',
  () => {
    const testCases = [
      { name: 'should return true for empty Set', input: new Set(), expected: true },
      { name: 'should return false for Set with one element', input: new Set([1]), expected: false },
      { name: 'should return false for Set with multiple elements', input: new Set([1, 2, 3]), expected: false },
      { name: 'should return false for Set with string element', input: new Set(['a']), expected: false },
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
      expect(IS_A_SET_AND_EMPTY(input)).toBe(expected)
    })
  }
)
