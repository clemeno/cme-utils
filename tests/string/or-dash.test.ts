import { describe, expect, it } from 'bun:test'
import { OR_DASH } from '../../ts/string/or-dash.util.js'

describe(
  'OR_DASH',
  () => {
    const testCases = [
      { name: 'number 123', input: 123, expected: 123 },
      { name: 'string "123"', input: '123', expected: '123' },
      { name: 'zero', input: 0, expected: 0 },
      { name: 'true', input: true, expected: true },
      { name: 'one', input: 1, expected: 1 },
      { name: 'string "on"', input: 'on', expected: 'on' },
      { name: 'false', input: false, expected: '-' },
      { name: 'empty string', input: '', expected: '-' },
      { name: 'null', input: null, expected: '-' },
      { name: 'undefined', input: undefined, expected: '-' },
      { name: 'string "hello"', input: 'hello', expected: 'hello' },
    ]

    it.each(testCases)(
      'should return correct value for $name',
      ({ name, input, expected }) => {
        expect(OR_DASH(input)).toBe(expected)
      }
    )
  }
)
