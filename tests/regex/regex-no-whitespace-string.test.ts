import { describe, expect, it } from 'bun:test'
import { REGEX_NO_WHITESPACE_STRING } from '../../ts/regex/regex-no-whitespace-string.util.js'

describe(
  'REGEX_NO_WHITESPACE_STRING',
  () => {
    it(
      'should be a valid regex string for no whitespace',
      () => {
        expect(typeof REGEX_NO_WHITESPACE_STRING).toBe('string')
        expect(REGEX_NO_WHITESPACE_STRING).toBe('^\\S*$')
      }
    )

    it(
      'should match strings without whitespace when used as regex',
      () => {
        const regex = new RegExp(REGEX_NO_WHITESPACE_STRING)

        expect(regex.test('hello')).toBe(true)
        expect(regex.test('hello123')).toBe(true)
        expect(regex.test('a')).toBe(true)
        expect(regex.test('')).toBe(true)
        expect(regex.test('hello-world')).toBe(true)
      }
    )

    it(
      'should not match strings with whitespace when used as regex',
      () => {
        const regex = new RegExp(REGEX_NO_WHITESPACE_STRING)

        expect(regex.test('hello world')).toBe(false)
        expect(regex.test(' hello')).toBe(false)
        expect(regex.test('hello ')).toBe(false)
        expect(regex.test(' ')).toBe(false)
        expect(regex.test('\t')).toBe(false)
        expect(regex.test('\n')).toBe(false)
      }
    )
  }
)
