import { describe, expect, it } from 'bun:test'
import { IS_A_URL } from '../../ts/string/is-a-url.util.js'

describe(
  'IS_A_URL',
  () => {
    const testCases = [
      { name: 'should return true for http URL "http://example.com"', input: 'http://example.com', expected: true },
      { name: 'should return true for https URL "https://example.com"', input: 'https://example.com', expected: true },
      { name: 'should return true for protocol-relative URL "//example.com"', input: '//example.com', expected: true },
      { name: 'should return false for domain without protocol "example.com"', input: 'example.com', expected: false },
      { name: 'should return false for ftp URL "ftp://example.com"', input: 'ftp://example.com', expected: false },
      { name: 'should return false for random string "hello"', input: 'hello', expected: false },
      { name: 'should return false for empty string', input: '', expected: false },
    ]

    it.each(testCases)(
      '$name',
      ({ name, input, expected }) => {
        expect(IS_A_URL(input)).toBe(expected)
      }
    )
  }
)
