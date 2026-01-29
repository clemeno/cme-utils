import { describe, expect, it } from 'bun:test'
import { REGEX_HEX_INT_OR_EMPTY } from '../../ts/regex/regex-hex-int-or-empty.util.js'

describe(
  'REGEX_HEX_INT_OR_EMPTY',
  () => {
    const testCases = [
      { name: 'valid decimal', input: '123', expected: true },
      { name: 'valid uppercase hex', input: 'ABC', expected: true },
      { name: 'valid lowercase hex', input: 'abc', expected: true },
      { name: 'valid mixed hex', input: '123ABC', expected: true },
      { name: 'valid negative hex', input: '-123ABC', expected: true },
      { name: 'valid zero', input: '0', expected: true },
      { name: 'valid FF', input: 'FF', expected: true },
      { name: 'empty string', input: '', expected: true },
      { name: 'invalid hex character G', input: '123G', expected: false },
      { name: 'invalid hex XYZ', input: 'XYZ', expected: false },
      { name: 'invalid decimal point', input: '123.45', expected: false },
      { name: 'leading whitespace', input: ' 123', expected: false },
      { name: 'trailing whitespace', input: 'ABC ', expected: false },
      { name: 'negative with whitespace', input: ' -123ABC ', expected: false },
      { name: 'only whitespace', input: ' ', expected: false },
      { name: 'plus sign', input: '+123', expected: false },
    ]

    it.each(testCases)(
      '$name',
      tc => {
        expect(REGEX_HEX_INT_OR_EMPTY.test(tc.input)).toBe(tc.expected)
      }
    )

    it(
      'should be a RegExp',
      () => {
        expect(REGEX_HEX_INT_OR_EMPTY).toBeInstanceOf(RegExp)
      }
    )
  }
)
