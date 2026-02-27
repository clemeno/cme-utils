import { describe, expect, it } from 'bun:test'
import { REGEX_HEX_INT_AND_NOT_EMPTY } from '../../ts/regex/regex-hex-int-and-not-empty.util.js'

describe(
  'REGEX_HEX_INT_AND_NOT_EMPTY',
  () => {
    const testCases = [
      { input: '123', expected: true },
      { input: 'ABC', expected: true },
      { input: 'abc', expected: true },
      { input: '123ABC', expected: true },
      { input: '-123ABC', expected: true },
      { input: '0', expected: true },
      { input: 'FF', expected: true },
      { input: '', expected: false },
      { input: '123G', expected: false },
      { input: 'XYZ', expected: false },
      { input: '123.45', expected: false },
      { input: ' 123', expected: false },
      { input: 'ABC ', expected: false },
      { input: ' -123ABC ', expected: false },
      { input: '+123', expected: false },
    ]

    it.each(testCases)(
      'REGEX_HEX_INT_AND_NOT_EMPTY.test("$input") → $expected',
      ({ input, expected }) => {
        expect(REGEX_HEX_INT_AND_NOT_EMPTY.test(input)).toBe(expected)
      }
    )

    it(
      'is a RegExp',
      () => {
        expect(REGEX_HEX_INT_AND_NOT_EMPTY).toBeInstanceOf(RegExp)
      }
    )
  }
)
