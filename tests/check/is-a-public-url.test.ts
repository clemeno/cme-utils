import { describe, expect, it } from 'bun:test'
import { IS_A_PUBLIC_URL } from '../../ts/check/is-a-public-url.util.js'

describe(
  'IS_A_PUBLIC_URL',
  () => {
    const testCases = [
      { name: 'should return true for empty string', input: '', expected: true },
      { name: 'should return true for "/"', input: '/', expected: true },
      { name: 'should return true for "/public_"', input: '/public_', expected: true },
      { name: 'should return true for "/public/"', input: '/public/', expected: true },
      { name: 'should return true for "/public_/path"', input: '/public_/path', expected: true },
      { name: 'should return true for "/public/path"', input: '/public/path', expected: true },
      { name: 'should return true for "/public_path"', input: '/public_path', expected: true },
      { name: 'should return false for "/private"', input: '/private', expected: false },
      { name: 'should return false for "/admin"', input: '/admin', expected: false },
      { name: 'should return false for "/api"', input: '/api', expected: false },
      { name: 'should return false for "/user"', input: '/user', expected: false },
      { name: 'should return false for "http://example.com"', input: 'http://example.com', expected: false },
      { name: 'should return false for "https://example.com"', input: 'https://example.com', expected: false },
      { name: 'should handle undefined', input: undefined, expected: true },
      { name: 'should handle URLs with query parameters', input: '/public/path?query=value', expected: true },
      { name: 'should handle URLs with fragments', input: '/public/path#fragment', expected: true },
      { name: 'should return false for private with query', input: '/private/path?query=value', expected: false },
    ]

    it.each(testCases)('%s', ({ input, expected }) => {
      expect(IS_A_PUBLIC_URL(input)).toBe(expected)
    })
  }
)
