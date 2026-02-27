import { describe, expect, it } from 'bun:test'
import { REGEX_NO_WHITESPACE } from '../../ts/regex/regex-no-whitespace.util.js'

describe(
  'REGEX_NO_WHITESPACE',
  () => {
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
      'REGEX_NO_WHITESPACE.test("$input") → $expected',
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
