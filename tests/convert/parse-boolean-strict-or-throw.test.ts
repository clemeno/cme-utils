import { describe, expect, it } from 'bun:test'
import { PARSE_BOOLEAN_STRICT_OR_THROW } from '../../ts/convert/parse-boolean-strict-or-throw.util.js'

describe(
  'PARSE_BOOLEAN_STRICT_OR_THROW',
  () => {
    const trueTestCases = [
      { name: 'boolean true', input: true },
      { name: 'string "true"', input: 'true' },
      { name: 'number 1', input: 1 },
      { name: 'number -1', input: -1 },
      { name: 'string "1"', input: '1' },
      { name: 'string "-1"', input: '-1' },
    ]

    it.each(trueTestCases)(
      'returns true for $name',
      ({ input }) => {
        expect(PARSE_BOOLEAN_STRICT_OR_THROW(input)).toBe(true)
      }
    )

    const falseTestCases = [
      { name: 'boolean false', input: false },
      { name: 'string "false"', input: 'false' },
      { name: 'number 0', input: 0 },
      { name: 'string "0"', input: '0' },
    ]

    it.each(falseTestCases)(
      'returns false for $name',
      ({ input }) => {
        expect(PARSE_BOOLEAN_STRICT_OR_THROW(input)).toBe(false)
      }
    )

    // the message names the offending value: 'null' / 'undefined' for unset inputs, TO_STRING(input) otherwise
    const throwTestCases: Array<{ name: string, input: unknown, expected: string }> = [
      { name: 'null', input: null, expected: 'Invalid serialized boolean value: null' },
      { name: 'undefined', input: undefined, expected: 'Invalid serialized boolean value: undefined' },
      { name: 'non-numeric string "abc"', input: 'abc', expected: 'Invalid serialized boolean value: abc' },
      { name: 'non-numeric string "xyz"', input: 'xyz', expected: 'Invalid serialized boolean value: xyz' },
      { name: 'empty string', input: '', expected: 'Invalid serialized boolean value: ' },
      { name: 'object', input: {}, expected: 'Invalid serialized boolean value: {}' },
      { name: 'array', input: [], expected: 'Invalid serialized boolean value: []' },
    ]

    it.each(throwTestCases)(
      'throws for $name',
      ({ input, expected }) => {
        expect(() => PARSE_BOOLEAN_STRICT_OR_THROW(input)).toThrow(new Error(expected))
      }
    )
  }
)
