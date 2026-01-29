import { describe, expect, it } from 'bun:test'
import { IS_A_BOOLEAN } from '../../ts/check/is-a-boolean.util.js'

describe(
  'IS_A_BOOLEAN',
  () => {
    const testCases = [
      { name: 'should return true for true', input: true, expected: true },
      { name: 'should return true for false', input: false, expected: true },
      { name: 'should return false for 0', input: 0, expected: false },
      { name: 'should return false for 1', input: 1, expected: false },
      { name: 'should return false for "true"', input: 'true', expected: false },
      { name: 'should return false for "false"', input: 'false', expected: false },
      { name: 'should return false for null', input: null, expected: false },
      { name: 'should return false for undefined', input: undefined, expected: false },
      { name: 'should return false for {}', input: {}, expected: false },
      { name: 'should return false for []', input: [], expected: false },
    ]

    it.each(testCases)('$name', ({ input, expected }) => {
      expect(IS_A_BOOLEAN(input)).toBe(expected)
    })
  }
)
