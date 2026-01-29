import { describe, expect, it } from 'bun:test'
import { REGEX_NO_WHITESPACE } from '../../ts/regex/regex-no-whitespace.util.js'

describe(
  'REGEX_NO_WHITESPACE',
  () => {
    it(
      'should match strings without whitespace',
      () => {
        const regex = new RegExp(REGEX_NO_WHITESPACE.source)

        expect(regex.test('hello')).toBe(true)
        expect(regex.test('hello123')).toBe(true)
        expect(regex.test('a')).toBe(true)
        expect(regex.test('')).toBe(true)
        expect(regex.test('hello-world')).toBe(true)
      }
    )

    it(
      'should not match strings with whitespace',
      () => {
        const regex = new RegExp(REGEX_NO_WHITESPACE.source)

        expect(regex.test('hello world')).toBe(false)
        expect(regex.test(' hello')).toBe(false)
        expect(regex.test('hello ')).toBe(false)
        expect(regex.test(' ')).toBe(false)
        expect(regex.test('\t')).toBe(false)
        expect(regex.test('\n')).toBe(false)
      }
    )

    it(
      'should be a RegExp with global flag',
      () => {
        expect(REGEX_NO_WHITESPACE).toBeInstanceOf(RegExp)
        expect(REGEX_NO_WHITESPACE.flags).toContain('g')
      }
    )
  }
)
