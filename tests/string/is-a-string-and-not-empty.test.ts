import { describe, expect, it } from 'bun:test'
import { IS_A_STRING_AND_NOT_EMPTY } from '../../ts/string/is-a-string-and-not-empty.util.js'

describe(
  'IS_A_STRING_AND_NOT_EMPTY',
  () => {
    const testCases: Array<{ name: string, input: unknown, expected: boolean }> = [
      { name: '"hello"', input: 'hello', expected: true },
      { name: '" "', input: ' ', expected: true },
      { name: '"123"', input: '123', expected: true },
      { name: '"a"', input: 'a', expected: true },
      { name: '""', input: '', expected: false },
      { name: '123', input: 123, expected: false },
      { name: 'null', input: null, expected: false },
      { name: 'undefined', input: undefined, expected: false },
      { name: 'true', input: true, expected: false },
      { name: '{}', input: {}, expected: false },
      { name: '[]', input: [], expected: false },
      { name: 'NaN', input: NaN, expected: false },
    ]

    it.each(testCases)(
      'IS_A_STRING_AND_NOT_EMPTY($name) → $expected',
      ({ input, expected }) => {
        expect(IS_A_STRING_AND_NOT_EMPTY(input)).toBe(expected)
      }
    )
  }
)
