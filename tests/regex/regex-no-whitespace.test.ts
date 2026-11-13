import { describe, expect, it } from 'bun:test'
import { REGEX_NO_WHITESPACE } from '../../ts/regex/regex-no-whitespace.util.js'

describe(
  'REGEX_NO_WHITESPACE',
  () => {
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
      '$name: REGEX_NO_WHITESPACE.test("$input") → $expected',
      ({ input, expected }) => {
        // create a fresh copy per test to avoid stateful lastIndex from the global flag
        const regex = new RegExp(REGEX_NO_WHITESPACE.source)
        expect(regex.test(input)).toBe(expected)
      }
    )

    it(
      'is a RegExp with global flag',
      () => {
        expect(REGEX_NO_WHITESPACE).toBeInstanceOf(RegExp)
        expect(REGEX_NO_WHITESPACE.flags).toContain('g')
      }
    )
  }
)
