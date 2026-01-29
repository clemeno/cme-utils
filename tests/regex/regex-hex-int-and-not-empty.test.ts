import { describe, expect, it } from 'bun:test'
import { REGEX_HEX_INT_AND_NOT_EMPTY } from '../../ts/regex/regex-hex-int-and-not-empty.util.js'

describe(
  'REGEX_HEX_INT_AND_NOT_EMPTY',
  () => {
    it(
      'should match valid hexadecimal strings',
      () => {
        expect(REGEX_HEX_INT_AND_NOT_EMPTY.test('123')).toBe(true)
        expect(REGEX_HEX_INT_AND_NOT_EMPTY.test('ABC')).toBe(true)
        expect(REGEX_HEX_INT_AND_NOT_EMPTY.test('abc')).toBe(true)
        expect(REGEX_HEX_INT_AND_NOT_EMPTY.test('123ABC')).toBe(true)
        expect(REGEX_HEX_INT_AND_NOT_EMPTY.test('-123ABC')).toBe(true)
        expect(REGEX_HEX_INT_AND_NOT_EMPTY.test('0')).toBe(true)
        expect(REGEX_HEX_INT_AND_NOT_EMPTY.test('FF')).toBe(true)
      }
    )

    it(
      'should not match empty strings',
      () => {
        expect(REGEX_HEX_INT_AND_NOT_EMPTY.test('')).toBe(false)
      }
    )

    it(
      'should not match strings with invalid hex characters',
      () => {
        expect(REGEX_HEX_INT_AND_NOT_EMPTY.test('123G')).toBe(false)
        expect(REGEX_HEX_INT_AND_NOT_EMPTY.test('XYZ')).toBe(false)
        expect(REGEX_HEX_INT_AND_NOT_EMPTY.test('123.45')).toBe(false)
      }
    )

    it(
      'should not match strings with leading or trailing whitespace',
      () => {
        expect(REGEX_HEX_INT_AND_NOT_EMPTY.test(' 123')).toBe(false)
        expect(REGEX_HEX_INT_AND_NOT_EMPTY.test('ABC ')).toBe(false)
        expect(REGEX_HEX_INT_AND_NOT_EMPTY.test(' -123ABC ')).toBe(false)
      }
    )

    it(
      'should not match strings with plus sign',
      () => {
        expect(REGEX_HEX_INT_AND_NOT_EMPTY.test('+123')).toBe(false)
      }
    )

    it(
      'should be a RegExp',
      () => {
        expect(REGEX_HEX_INT_AND_NOT_EMPTY).toBeInstanceOf(RegExp)
      }
    )
  }
)
