import { describe, expect, it } from 'bun:test'
import { IS_A_STRING_AND_EMPTY } from '../../ts/check/is-a-string-and-empty.util.js'

describe(
  'IS_A_STRING_AND_EMPTY',
  () => {
    const testCases = [
      { label: '""', input: '', expected: true },
      { label: '"hello"', input: 'hello', expected: false },
      { label: '" "', input: ' ', expected: false },
      { label: '"123"', input: '123', expected: false },
      { label: '123', input: 123, expected: false },
      { label: 'null', input: null, expected: false },
      { label: 'undefined', input: undefined, expected: false },
      { label: 'true', input: true, expected: false },
      { label: '{}', input: {}, expected: false },
      { label: '[]', input: [], expected: false },
      { label: 'NaN', input: NaN, expected: false },
    ]

    it.each(testCases)(
      'IS_A_STRING_AND_EMPTY($label) → $expected',
      ({ input, expected }) => {
        expect(IS_A_STRING_AND_EMPTY(input)).toBe(expected)
      }
    )
  }
)
