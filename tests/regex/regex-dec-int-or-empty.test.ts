import { describe, expect, it } from 'bun:test'
import { REGEX_DEC_INT_OR_EMPTY } from '../../ts/regex/regex-dec-int-or-empty.util.js'

describe(
  'REGEX_DEC_INT_OR_EMPTY',
  () => {
    const testCases: Array<{ name: string, input: string, expected: boolean }> = [
      { name: 'a positive integer', input: '123', expected: true },
      { name: 'a negative integer', input: '-456', expected: true },
      { name: 'zero', input: '0', expected: true },
      { name: 'another positive integer', input: '789', expected: true },
      { name: 'an empty string', input: '', expected: true },
      { name: 'a decimal', input: '123.45', expected: false },
      { name: 'a negative decimal', input: '-123.45', expected: false },
      { name: 'a leading space', input: ' 123', expected: false },
      { name: 'a trailing space', input: '123 ', expected: false },
      { name: 'spaces around a negative integer', input: ' -123 ', expected: false },
      { name: 'a blank string', input: ' ', expected: false },
      { name: 'letters', input: 'abc', expected: false },
      { name: 'letters after digits', input: '123abc', expected: false },
      { name: 'letters after a negative integer', input: '-123abc', expected: false },
      { name: 'a plus sign', input: '+123', expected: false },
    ]

    it.each(testCases)(
      '$name: REGEX_DEC_INT_OR_EMPTY.test("$input") → $expected',
      ({ input, expected }) => {
        expect(REGEX_DEC_INT_OR_EMPTY.test(input)).toBe(expected)
      }
    )

    it(
      'is a RegExp',
      () => {
        expect(REGEX_DEC_INT_OR_EMPTY).toBeInstanceOf(RegExp)
      }
    )
  }
)
