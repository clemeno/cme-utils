import { describe, expect, it } from 'bun:test'
import { IS_A_DATE_AND_EMPTY } from '../../ts/check/is-a-date-and-empty.util.js'

describe(
  'IS_A_DATE_AND_EMPTY',
  () => {
    const testCases = [
      { name: 'should return true for invalid Date "invalid"', input: new Date('invalid'), expected: true },
      { name: 'should return true for Date(NaN)', input: new Date(NaN), expected: true },
      { name: 'should return false for new Date()', input: new Date(), expected: false },
      { name: 'should return false for valid date string', input: new Date('2023-01-01'), expected: false },
      { name: 'should return false for Date(0)', input: new Date(0), expected: false },
      { name: 'should return false for Date(1234567890)', input: new Date(1234567890), expected: false },
      { name: 'should return false for string "2023-01-01"', input: '2023-01-01', expected: false },
      { name: 'should return false for number 1234567890', input: 1234567890, expected: false },
      { name: 'should return false for {}', input: {}, expected: false },
      { name: 'should return false for []', input: [], expected: false },
      { name: 'should return false for null', input: null, expected: false },
      { name: 'should return false for undefined', input: undefined, expected: false },
      { name: 'should return false for true', input: true, expected: false },
    ]

    it.each(testCases)('%s', ({ input, expected }) => {
      expect(IS_A_DATE_AND_EMPTY(input)).toBe(expected)
    })
  }
)
