import { describe, expect, it } from 'bun:test'
import { REGEX_DEC_INT_AND_NOT_EMPTY } from '../../ts/regex/regex-dec-int-and-not-empty.util.js'

describe(
  'REGEX_DEC_INT_AND_NOT_EMPTY',
  () => {
    const testCases = [
      { input: '123', expected: true },
      { input: '-456', expected: true },
      { input: '0', expected: true },
      { input: '789', expected: true },
      { input: '', expected: false },
      { input: '123.45', expected: false },
      { input: '-123.45', expected: false },
      { input: ' 123', expected: false },
      { input: '123 ', expected: false },
      { input: ' -123 ', expected: false },
      { input: 'abc', expected: false },
      { input: '123abc', expected: false },
      { input: '-123abc', expected: false },
      { input: '+123', expected: false },
    ]

    it.each(testCases)(
      'REGEX_DEC_INT_AND_NOT_EMPTY.test("$input") → $expected',
      ({ input, expected }) => {
        expect(REGEX_DEC_INT_AND_NOT_EMPTY.test(input)).toBe(expected)
      }
    )

    it(
      'is a RegExp',
      () => {
        expect(REGEX_DEC_INT_AND_NOT_EMPTY).toBeInstanceOf(RegExp)
      }
    )
  }
)
