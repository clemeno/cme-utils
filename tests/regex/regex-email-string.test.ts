import { describe, expect, it } from 'bun:test'
import { REGEX_EMAIL_STRING } from '../../ts/regex/regex-email-string.util.js'

describe(
  'REGEX_EMAIL_STRING',
  () => {
    const validStringTestCases: Array<{ name: string, check: (value: string) => void }> = [
      { name: 'be a string', check: (value: string) => expect(typeof value).toBe('string') },
      { name: 'have length greater than 0', check: (value: string) => expect(value.length).toBeGreaterThan(0) },
    ]

    it.each(validStringTestCases)(
      'should $name',
      ({ check }) => {
        check(REGEX_EMAIL_STRING)
      }
    )

    const validEmailTestCases: Array<{ name: string, email: string, expected: boolean }> = [
      { name: 'test@example.com', email: 'test@example.com', expected: true },
      { name: 'user.name+tag@example.co.uk', email: 'user.name+tag@example.co.uk', expected: true },
      { name: 'test.email@subdomain.example.com', email: 'test.email@subdomain.example.com', expected: true },
      { name: '123@example.com', email: '123@example.com', expected: true },
    ]

    it.each(validEmailTestCases)(
      'should match valid email address when used as regex: $name',
      ({ email, expected }) => {
        const regex = new RegExp(REGEX_EMAIL_STRING, 'i')
        expect(regex.test(email)).toBe(expected)
      }
    )

    const invalidEmailTestCases: Array<{ name: string, email: string, expected: boolean }> = [
      { name: 'empty string', email: '', expected: false },
      { name: '@example.com', email: '@example.com', expected: false },
      { name: 'test@', email: 'test@', expected: false },
      { name: 'test', email: 'test', expected: false },
      { name: 'test@.com', email: 'test@.com', expected: false },
      { name: 'test..email@example.com', email: 'test..email@example.com', expected: false },
    ]

    it.each(invalidEmailTestCases)(
      'should not match invalid email address when used as regex: $name',
      ({ email, expected }) => {
        const regex = new RegExp(REGEX_EMAIL_STRING, 'i')
        expect(regex.test(email)).toBe(expected)
      }
    )

    const caseInsensitiveTestCases: Array<{ name: string, email: string, expected: boolean }> = [
      { name: 'TEST@EXAMPLE.COM', email: 'TEST@EXAMPLE.COM', expected: true },
      { name: 'Test.Email@Example.Com', email: 'Test.Email@Example.Com', expected: true },
    ]

    it.each(caseInsensitiveTestCases)(
      'should be case insensitive when used as regex: $name',
      ({ email, expected }) => {
        const regex = new RegExp(REGEX_EMAIL_STRING, 'i')
        expect(regex.test(email)).toBe(expected)
      }
    )
  }
)
