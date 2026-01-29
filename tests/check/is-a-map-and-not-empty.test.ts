import { describe, expect, it } from 'bun:test'
import { IS_A_MAP_AND_NOT_EMPTY } from '../../ts/check/is-a-map-and-not-empty.util.js'

describe(
  'IS_A_MAP_AND_NOT_EMPTY',
  () => {
    const testCases = [
      { name: 'should return true for Map with one entry', input: new Map([['key', 'value']]), expected: true },
      { name: 'should return true for Map with multiple entries', input: new Map([[1, 'one'], [2, 'two']]), expected: true },
      { name: 'should return true for Map with object value', input: new Map([['a', {}]]), expected: true },
      { name: 'should return false for empty Map', input: new Map(), expected: false },
      { name: 'should return false for []', input: [], expected: false },
      { name: 'should return false for {}', input: {}, expected: false },
      { name: 'should return false for string "hello"', input: 'hello', expected: false },
      { name: 'should return false for number 123', input: 123, expected: false },
      { name: 'should return false for null', input: null, expected: false },
      { name: 'should return false for undefined', input: undefined, expected: false },
      { name: 'should return false for true', input: true, expected: false },
      { name: 'should return false for new Set()', input: new Set(), expected: false },
    ]

    it.each(testCases)('%s', ({ input, expected }) => {
      expect(IS_A_MAP_AND_NOT_EMPTY(input)).toBe(expected)
    })
  }
)
