import { describe, expect, it } from 'bun:test'
import { IS_ODD } from '../../ts/check/is-odd.util.js'

describe(
  'IS_ODD',
  () => {
    const testCases = [
      { name: 'odd number 1', input: 1, expected: true },
      { name: 'odd number 3', input: 3, expected: true },
      { name: 'odd number 5', input: 5, expected: true },
      { name: 'odd negative number -1', input: -1, expected: true },
      { name: 'odd negative number -3', input: -3, expected: true },
      { name: 'odd number 99', input: 99, expected: true },
      { name: 'odd numeric string "1"', input: '1', expected: true },
      { name: 'odd numeric string "3"', input: '3', expected: true },
      { name: 'odd numeric string "5"', input: '5', expected: true },
      { name: 'odd numeric string "-1"', input: '-1', expected: true },
      { name: 'odd numeric string "99"', input: '99', expected: true },
      { name: 'even number 0', input: 0, expected: false },
      { name: 'even number 2', input: 2, expected: false },
      { name: 'even number 4', input: 4, expected: false },
      { name: 'even negative number -2', input: -2, expected: false },
      { name: 'even negative number -4', input: -4, expected: false },
      { name: 'even number 100', input: 100, expected: false },
      { name: 'even numeric string "0"', input: '0', expected: false },
      { name: 'even numeric string "2"', input: '2', expected: false },
      { name: 'even numeric string "4"', input: '4', expected: false },
      { name: 'even numeric string "-2"', input: '-2', expected: false },
      { name: 'even numeric string "100"', input: '100', expected: false },
      { name: 'non-numeric string "hello"', input: 'hello', expected: false },
      { name: 'empty string', input: '', expected: false },
      { name: 'null', input: null, expected: false },
      { name: 'undefined', input: undefined, expected: false },
      { name: 'boolean true', input: true, expected: false },
      { name: 'object', input: {}, expected: false },
      { name: 'array', input: [], expected: false },
      { name: 'NaN', input: NaN, expected: false },
    ]

    it.each(testCases)(
      'should return %s for %s',
      ({ name, input, expected }) => {
        expect(IS_ODD(input)).toBe(expected)
      }
    )
  }
)
