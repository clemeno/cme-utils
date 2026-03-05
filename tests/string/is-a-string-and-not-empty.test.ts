import { describe, expect, it } from 'bun:test'
import { IS_A_STRING_AND_NOT_EMPTY } from '../../ts/string/is-a-string-and-not-empty.util.js'

describe(
  'IS_A_STRING_AND_NOT_EMPTY',
  () => {
    const testCases = [
      { label: '"hello"', input: 'hello', expected: true },
      { label: '" "', input: ' ', expected: true },
      { label: '"123"', input: '123', expected: true },
      { label: '"a"', input: 'a', expected: true },
      { label: '""', input: '', expected: false },
      { label: '123', input: 123, expected: false },
      { label: 'null', input: null, expected: false },
      { label: 'undefined', input: undefined, expected: false },
      { label: 'true', input: true, expected: false },
      { label: '{}', input: {}, expected: false },
      { label: '[]', input: [], expected: false },
      { label: 'NaN', input: NaN, expected: false },
    ]

    it.each(testCases)(
      'IS_A_STRING_AND_NOT_EMPTY($label) → $expected',
      ({ input, expected }) => {
        expect(IS_A_STRING_AND_NOT_EMPTY(input)).toBe(expected)
      }
    )
  }
)
