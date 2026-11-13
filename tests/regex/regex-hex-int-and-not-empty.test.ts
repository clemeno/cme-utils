import { describe, expect, it } from 'bun:test'
import { REGEX_HEX_INT_AND_NOT_EMPTY } from '../../ts/regex/regex-hex-int-and-not-empty.util.js'

describe(
  'REGEX_HEX_INT_AND_NOT_EMPTY',
  () => {
    const testCases: Array<{ name: string, input: string, expected: boolean }> = [
      { name: 'decimal digits', input: '123', expected: true },
      { name: 'uppercase hex letters', input: 'ABC', expected: true },
      { name: 'lowercase hex letters', input: 'abc', expected: true },
      { name: 'digits and hex letters', input: '123ABC', expected: true },
      { name: 'a negative hex integer', input: '-123ABC', expected: true },
      { name: 'zero', input: '0', expected: true },
      { name: 'a byte value', input: 'FF', expected: true },
      { name: 'an empty string', input: '', expected: false },
      { name: 'a letter past F', input: '123G', expected: false },
      { name: 'letters past F only', input: 'XYZ', expected: false },
      { name: 'a decimal', input: '123.45', expected: false },
      { name: 'a leading space', input: ' 123', expected: false },
      { name: 'a trailing space', input: 'ABC ', expected: false },
      { name: 'spaces around a negative hex integer', input: ' -123ABC ', expected: false },
      { name: 'a plus sign', input: '+123', expected: false },
    ]

    it.each(testCases)(
      '$name: REGEX_HEX_INT_AND_NOT_EMPTY.test("$input") → $expected',
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
