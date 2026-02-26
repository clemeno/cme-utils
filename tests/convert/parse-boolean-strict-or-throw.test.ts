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

    const throwTestCases = [
      { name: 'null', input: null },
      { name: 'undefined', input: undefined },
      { name: 'non-numeric string "abc"', input: 'abc' },
      { name: 'empty string', input: '' },
      { name: 'object', input: {} },
      { name: 'array', input: [] },
    ]

    it.each(throwTestCases)(
      'throws for $name',
      ({ input }) => {
        expect(() => PARSE_BOOLEAN_STRICT_OR_THROW(input)).toThrow()
      }
    )

    it('throw message contains "null" for null input', () => {
      expect(() => PARSE_BOOLEAN_STRICT_OR_THROW(null)).toThrow('null')
    })

    it('throw message contains "undefined" for undefined input', () => {
      expect(() => PARSE_BOOLEAN_STRICT_OR_THROW(undefined)).toThrow('undefined')
    })

    it('throw message contains input value for string input', () => {
      expect(() => PARSE_BOOLEAN_STRICT_OR_THROW('xyz')).toThrow('xyz')
    })
  }
)
