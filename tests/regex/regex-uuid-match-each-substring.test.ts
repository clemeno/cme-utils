import { describe, expect, it } from 'bun:test'
import { REGEX_UUID_MATCH_EACH_SUBSTRING } from '../../ts/regex/regex-uuid-match-each-substring.util.js'

describe(
  'REGEX_UUID_MATCH_EACH_SUBSTRING',
  () => {
    const testCases = [
      {
        name: 'all UUIDs in a string',
        input: 'prefix-123e4567-e89b-12d3-a456-426614174000-middle-550e8400-e29b-41d4-a716-446655440000-suffix',
        expected: ['123e4567-e89b-12d3-a456-426614174000', '550e8400-e29b-41d4-a716-446655440000'] as RegExpMatchArray,
      },
      {
        name: 'single UUID',
        input: '123e4567-e89b-12d3-a456-426614174000',
        expected: ['123e4567-e89b-12d3-a456-426614174000'] as RegExpMatchArray,
      },
      {
        name: 'strings without UUIDs',
        input: 'no uuid here',
        expected: null,
      },
      {
        name: 'invalid UUID formats',
        input: '123e4567-e89b-12d3-a456',
        expected: null,
      },
      {
        name: 'case insensitive',
        input: '123E4567-E89B-12D3-A456-426614174000',
        expected: ['123E4567-E89B-12D3-A456-426614174000'] as RegExpMatchArray,
      },
    ]

    it.each(testCases)(
      '$name',
      ({ name, input, expected }) => {
        const matches = input.match(REGEX_UUID_MATCH_EACH_SUBSTRING)
        expect(matches).toEqual(expected)
      }
    )

    const regexTestCases = [
      { name: 'instance check', check: () => REGEX_UUID_MATCH_EACH_SUBSTRING instanceof RegExp, expected: true },
      { name: 'global flag check', check: () => REGEX_UUID_MATCH_EACH_SUBSTRING.flags.includes('g'), expected: true },
    ]

    it.each(regexTestCases)(
      'should be a RegExp with global flag ($name)',
      ({ check, expected }) => {
        expect(check()).toBe(expected)
      }
    )
  }
)
