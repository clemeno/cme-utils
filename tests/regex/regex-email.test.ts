import { describe, expect, it } from 'bun:test'
import { REGEX_EMAIL } from '../../ts/regex/regex-email.util.js'

describe(
  'REGEX_EMAIL',
  () => {
    const validEmailTestCases = [
      { name: 'test@example.com', email: 'test@example.com', expected: true },
      { name: 'user.name+tag@example.co.uk', email: 'user.name+tag@example.co.uk', expected: true },
      { name: 'test.email@subdomain.example.com', email: 'test.email@subdomain.example.com', expected: true },
      { name: '123@example.com', email: '123@example.com', expected: true },
    ]

    it.each(validEmailTestCases)(
      'should match valid email address: $name',
      ({ email, expected }) => {
        const regex = new RegExp(REGEX_EMAIL.source)
        expect(regex.test(email)).toBe(expected)
      }
    )

    const invalidEmailTestCases = [
      { name: 'empty string', email: '', expected: false },
      { name: '@example.com', email: '@example.com', expected: false },
      { name: 'test@', email: 'test@', expected: false },
      { name: 'test', email: 'test', expected: false },
      { name: 'test@.com', email: 'test@.com', expected: false },
      { name: 'test..email@example.com', email: 'test..email@example.com', expected: false },
    ]

    it.each(invalidEmailTestCases)(
      'should not match invalid email address: $name',
      ({ email, expected }) => {
        const regex = new RegExp(REGEX_EMAIL.source)
        expect(regex.test(email)).toBe(expected)
      }
    )

    const caseSensitiveTestCases = [
      { name: 'TEST@EXAMPLE.COM', email: 'TEST@EXAMPLE.COM', expected: false },
      { name: 'Test.Email@Example.Com', email: 'Test.Email@Example.Com', expected: false },
    ]

    it.each(caseSensitiveTestCases)(
      'should be case sensitive: $name',
      ({ email, expected }) => {
        const regex = new RegExp(REGEX_EMAIL.source)
        expect(regex.test(email)).toBe(expected)
      }
    )

    const regexpTestCases = [
      { name: 'be a RegExp', check: (regex: RegExp) => expect(regex).toBeInstanceOf(RegExp) },
      { name: 'have global flag', check: (regex: RegExp) => expect(regex.flags).toContain('g') },
    ]

    it.each(regexpTestCases)(
      'should $name with global flag',
      ({ check }) => {
        check(REGEX_EMAIL)
      }
    )
  }
)
