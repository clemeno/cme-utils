import { describe, expect, it } from 'bun:test'
import { REGEX_NO_WHITESPACE_STRING } from '../../ts/regex/regex-no-whitespace-string.util.js'

describe(
  'REGEX_NO_WHITESPACE_STRING',
  () => {
    it(
      'is a string with value "^\\\\S*$"',
      () => {
        expect(typeof REGEX_NO_WHITESPACE_STRING).toBe('string')
        expect(REGEX_NO_WHITESPACE_STRING).toBe('^\\S*$')
      }
    )

    const testCases = [
      { input: 'hello', expected: true },
      { input: 'hello123', expected: true },
      { input: 'a', expected: true },
      { input: '', expected: true },
      { input: 'hello-world', expected: true },
      { input: 'hello world', expected: false },
      { input: ' hello', expected: false },
      { input: 'hello ', expected: false },
      { input: ' ', expected: false },
      { input: '\t', expected: false },
      { input: '\n', expected: false },
    ]

    it.each(testCases)(
      'new RegExp(REGEX_NO_WHITESPACE_STRING).test("$input") → $expected',
      ({ input, expected }) => {
        const regex = new RegExp(REGEX_NO_WHITESPACE_STRING)
        expect(regex.test(input)).toBe(expected)
      }
    )
  }
)
