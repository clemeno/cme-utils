import { describe, expect, it } from 'bun:test'
import { PARSE_BOOL } from '../../ts/convert/parse-bool.util.js'

describe(
  'PARSE_BOOL',
  () => {
    const booleanTestCases = [
      { name: 'true', input: true, expected: true },
      { name: 'false', input: false, expected: false },
    ]

    it.each(booleanTestCases)(
      'should return boolean $name as-is',
      ({ input, expected }) => {
        expect(PARSE_BOOL(input)).toBe(expected)
      }
    )

    const numberTestCases = [
      { name: '1', input: 1, expected: true },
      { name: '0', input: 0, expected: false },
      { name: '2', input: 2, expected: false },
      { name: '-1', input: -1, expected: false },
      { name: '1.0', input: 1.0, expected: true },
      { name: '1.5', input: 1.5, expected: false },
    ]

    it.each(numberTestCases)(
      'should convert number $name to boolean',
      ({ input, expected }) => {
        expect(PARSE_BOOL(input)).toBe(expected)
      }
    )

    const truthyStringTestCases = [
      { name: 'true', input: 'true', expected: true },
      { name: 'TRUE', input: 'TRUE', expected: true },
      { name: 'True', input: 'True', expected: true },
      { name: '1', input: '1', expected: true },
      { name: 'yes', input: 'yes', expected: true },
      { name: 'YES', input: 'YES', expected: true },
      { name: 'on', input: 'on', expected: true },
      { name: 'ON', input: 'ON', expected: true },
      { name: 'y', input: 'y', expected: true },
      { name: 'Y', input: 'Y', expected: true },
      { name: 'ok', input: 'ok', expected: true },
      { name: 'OK', input: 'OK', expected: true },
    ]

    it.each(truthyStringTestCases)(
      'should convert truthy string "$name" to true',
      ({ input, expected }) => {
        expect(PARSE_BOOL(input)).toBe(expected)
      }
    )

    const falsyStringTestCases = [
      { name: 'false', input: 'false', expected: false },
      { name: 'FALSE', input: 'FALSE', expected: false },
      { name: '0', input: '0', expected: false },
      { name: 'no', input: 'no', expected: false },
      { name: 'off', input: 'off', expected: false },
      { name: 'n', input: 'n', expected: false },
      { name: 'anything else', input: 'anything else', expected: false },
      { name: 'empty string', input: '', expected: false },
    ]

    it.each(falsyStringTestCases)(
      'should convert falsy string "$name" to false',
      ({ input, expected }) => {
        expect(PARSE_BOOL(input)).toBe(expected)
      }
    )

    const falsyValueTestCases = [
      { name: 'null', input: null },
      { name: 'undefined', input: undefined },
      { name: 'empty object', input: {} },
      { name: 'empty array', input: [] },
      { name: 'object with value', input: { value: true } },
    ]

    it.each(falsyValueTestCases)(
      'should return false for $name',
      ({ input }) => {
        expect(PARSE_BOOL(input)).toBe(false)
      }
    )
  }
)
