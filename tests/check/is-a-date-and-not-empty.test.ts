import { describe, expect, it } from 'bun:test'
import { IS_A_DATE_AND_NOT_EMPTY } from '../../ts/check/is-a-date-and-not-empty.util.js'

describe(
  'IS_A_DATE_AND_NOT_EMPTY',
  () => {
    const testCases = [
      { name: 'should return true for new Date()', input: new Date(), expected: true },
      { name: 'should return true for valid date string', input: new Date('2023-01-01'), expected: true },
      { name: 'should return true for Date(0)', input: new Date(0), expected: true },
      { name: 'should return true for Date(1234567890)', input: new Date(1234567890), expected: true },
      { name: 'should return false for invalid Date "invalid"', input: new Date('invalid'), expected: false },
      { name: 'should return false for Date(NaN)', input: new Date(NaN), expected: false },
      { name: 'should return false for string "2023-01-01"', input: '2023-01-01', expected: false },
      { name: 'should return false for number 1234567890', input: 1234567890, expected: false },
      { name: 'should return false for {}', input: {}, expected: false },
      { name: 'should return false for []', input: [], expected: false },
      { name: 'should return false for null', input: null, expected: false },
      { name: 'should return false for undefined', input: undefined, expected: false },
      { name: 'should return false for true', input: true, expected: false },
    ]

    it.each(testCases)('%s', ({ input, expected }) => {
      expect(IS_A_DATE_AND_NOT_EMPTY(input)).toBe(expected)
    })
  }
)
