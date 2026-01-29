import { describe, expect, it } from 'bun:test'
import { REGEX_DEC_INT_OR_EMPTY } from '../../ts/regex/regex-dec-int-or-empty.util.js'

describe(
  'REGEX_DEC_INT_OR_EMPTY',
  () => {
    it(
      'should match valid decimal integer strings',
      () => {
        expect(REGEX_DEC_INT_OR_EMPTY.test('123')).toBe(true)
        expect(REGEX_DEC_INT_OR_EMPTY.test('-456')).toBe(true)
        expect(REGEX_DEC_INT_OR_EMPTY.test('0')).toBe(true)
        expect(REGEX_DEC_INT_OR_EMPTY.test('789')).toBe(true)
      }
    )

    it(
      'should match empty strings',
      () => {
        expect(REGEX_DEC_INT_OR_EMPTY.test('')).toBe(true)
      }
    )

    it(
      'should not match strings with decimal points',
      () => {
        expect(REGEX_DEC_INT_OR_EMPTY.test('123.45')).toBe(false)
        expect(REGEX_DEC_INT_OR_EMPTY.test('-123.45')).toBe(false)
      }
    )

    it(
      'should not match strings with leading or trailing whitespace',
      () => {
        expect(REGEX_DEC_INT_OR_EMPTY.test(' 123')).toBe(false)
        expect(REGEX_DEC_INT_OR_EMPTY.test('123 ')).toBe(false)
        expect(REGEX_DEC_INT_OR_EMPTY.test(' -123 ')).toBe(false)
        expect(REGEX_DEC_INT_OR_EMPTY.test(' ')).toBe(false)
      }
    )

    it(
      'should not match strings with non-numeric characters',
      () => {
        expect(REGEX_DEC_INT_OR_EMPTY.test('abc')).toBe(false)
        expect(REGEX_DEC_INT_OR_EMPTY.test('123abc')).toBe(false)
        expect(REGEX_DEC_INT_OR_EMPTY.test('-123abc')).toBe(false)
      }
    )

    it(
      'should not match strings with plus sign',
      () => {
        expect(REGEX_DEC_INT_OR_EMPTY.test('+123')).toBe(false)
      }
    )

    it(
      'should be a RegExp',
      () => {
        expect(REGEX_DEC_INT_OR_EMPTY).toBeInstanceOf(RegExp)
      }
    )
  }
)
