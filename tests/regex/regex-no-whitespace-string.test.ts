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

    const testCases: Array<{ name: string, input: string, expected: boolean }> = [
      { name: 'a word', input: 'hello', expected: true },
      { name: 'letters and digits', input: 'hello123', expected: true },
      { name: 'one letter', input: 'a', expected: true },
      { name: 'an empty string', input: '', expected: true },
      { name: 'a dash between words', input: 'hello-world', expected: true },
      { name: 'a space between words', input: 'hello world', expected: false },
      { name: 'a leading space', input: ' hello', expected: false },
      { name: 'a trailing space', input: 'hello ', expected: false },
      { name: 'a blank string', input: ' ', expected: false },
      { name: 'a tab', input: '\t', expected: false },
      { name: 'a newline', input: '\n', expected: false },
    ]

    it.each(testCases)(
      '$name: new RegExp(REGEX_NO_WHITESPACE_STRING).test("$input") → $expected',
      ({ input, expected }) => {
        const regex = new RegExp(REGEX_NO_WHITESPACE_STRING)
        expect(regex.test(input)).toBe(expected)
      }
    )
  }
)
