import { describe, expect, it } from 'bun:test'
import { REGEX_DEC_INT_AND_NOT_EMPTY } from '../../ts/regex/regex-dec-int-and-not-empty.util.js'

describe(
  'REGEX_DEC_INT_AND_NOT_EMPTY',
  () => {
    it(
      'should match valid decimal integer strings',
      () => {
        expect(REGEX_DEC_INT_AND_NOT_EMPTY.test('123')).toBe(true)
        expect(REGEX_DEC_INT_AND_NOT_EMPTY.test('-456')).toBe(true)
        expect(REGEX_DEC_INT_AND_NOT_EMPTY.test('0')).toBe(true)
        expect(REGEX_DEC_INT_AND_NOT_EMPTY.test('789')).toBe(true)
      }
    )

    it(
      'should not match empty strings',
      () => {
        expect(REGEX_DEC_INT_AND_NOT_EMPTY.test('')).toBe(false)
      }
    )

    it(
      'should not match strings with decimal points',
      () => {
        expect(REGEX_DEC_INT_AND_NOT_EMPTY.test('123.45')).toBe(false)
        expect(REGEX_DEC_INT_AND_NOT_EMPTY.test('-123.45')).toBe(false)
      }
    )

    it(
      'should not match strings with leading or trailing whitespace',
      () => {
        expect(REGEX_DEC_INT_AND_NOT_EMPTY.test(' 123')).toBe(false)
        expect(REGEX_DEC_INT_AND_NOT_EMPTY.test('123 ')).toBe(false)
        expect(REGEX_DEC_INT_AND_NOT_EMPTY.test(' -123 ')).toBe(false)
      }
    )

    it(
      'should not match strings with non-numeric characters',
      () => {
        expect(REGEX_DEC_INT_AND_NOT_EMPTY.test('abc')).toBe(false)
        expect(REGEX_DEC_INT_AND_NOT_EMPTY.test('123abc')).toBe(false)
        expect(REGEX_DEC_INT_AND_NOT_EMPTY.test('-123abc')).toBe(false)
      }
    )

    it(
      'should not match strings with plus sign',
      () => {
        expect(REGEX_DEC_INT_AND_NOT_EMPTY.test('+123')).toBe(false)
      }
    )

    it(
      'should be a RegExp',
      () => {
        expect(REGEX_DEC_INT_AND_NOT_EMPTY).toBeInstanceOf(RegExp)
      }
    )
  }
)
