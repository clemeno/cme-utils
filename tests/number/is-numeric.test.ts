import { describe, expect, it } from 'bun:test'
import { IS_NUMERIC } from '../../ts/number/is-numeric.util.js'

describe(
  'IS_NUMERIC',
  () => {
    const testCases: Array<{ name: string, input: unknown, expected: boolean }> = [
      { name: 'a positive integer', input: 123, expected: true },
      { name: 'zero', input: 0, expected: true },
      { name: 'a negative integer', input: -123, expected: true },
      { name: 'a decimal', input: 123.45, expected: true },
      { name: 'an integer string', input: '123', expected: true },
      { name: 'the string zero', input: '0', expected: true },
      { name: 'a negative integer string', input: '-123', expected: true },
      { name: 'a decimal string', input: '123.45', expected: true },
      { name: 'a string of letters', input: 'abc', expected: false },
      { name: 'an empty string', input: '', expected: false },
      { name: 'a blank string', input: ' ', expected: false },
      { name: 'a hex string, which parseFloat reads as 0', input: '0x10', expected: false },
      { name: 'a binary string, which parseFloat reads as 0', input: '0b1', expected: false },
      { name: 'an octal string, which parseFloat reads as 0', input: '0o7', expected: false },
      { name: 'null, neither a number nor a string', input: null, expected: false },
      { name: 'undefined', input: undefined, expected: false },
      { name: 'an empty object', input: {}, expected: false },
      { name: 'an empty array', input: [], expected: false },
      { name: 'NaN, the one number that is not numeric', input: NaN, expected: false },
      { name: 'Infinity, a number', input: Infinity, expected: true },
      { name: 'negative Infinity, a number', input: -Infinity, expected: true },
    ]

    it.each(testCases)(
      '$name: IS_NUMERIC($input) → $expected',
      ({ input, expected }) => {
        expect(IS_NUMERIC(input)).toBe(expected)
      }
    )
  }
)
