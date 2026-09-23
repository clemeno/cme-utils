import { describe, expect, it } from 'bun:test'
import { REGEX_UUID_MATCH_A_SUBSTRING } from '../../ts/regex/regex-uuid-match-a-substring.util.js'

describe(
  'REGEX_UUID_MATCH_A_SUBSTRING',
  () => {
    it.each<{ name: string, input: string, expected: boolean }>([
      { name: 'matches a valid UUID (v1 time-based sample)', input: '123e4567-e89b-12d3-a456-426614174000', expected: true },
      { name: 'matches a valid UUID (v4 sample)', input: '550e8400-e29b-41d4-a716-446655440000', expected: true },
      { name: 'matches a valid UUID (DNS namespace)', input: '6ba7b810-9dad-11d1-80b4-00c04fd430c8', expected: true },
      { name: 'matches a UUID between a prefix and a suffix', input: 'prefix-123e4567-e89b-12d3-a456-426614174000-suffix', expected: true },
      { name: 'matches a UUID inside a sentence', input: 'The UUID is 550e8400-e29b-41d4-a716-446655440000 here', expected: true },
      { name: 'matches a valid UUID at the start followed by extra text', input: '123e4567-e89b-12d3-a456-426614174000-extra', expected: true },
      { name: 'matches an uppercase UUID (case insensitive)', input: '123E4567-E89B-12D3-A456-426614174000', expected: true },
      { name: 'matches a mixed-case UUID (case insensitive)', input: '123e4567-E89B-12d3-a456-426614174000', expected: true },
      { name: 'does not match an empty string', input: '', expected: false },
      { name: 'does not match a truncated UUID (missing last group)', input: '123e4567-e89b-12d3-a456', expected: false },
      { name: 'does not match a UUID without hyphens', input: '123e4567e89b12d3a456426614174000', expected: false },
      { name: 'does not match a last group one digit short', input: '123e4567-e89b-12d3-a456-42661417400', expected: false },
      { name: 'does not match non-hex characters', input: 'gggggggg-hhhh-iiii-jjjj-kkkkkkkkkkkk', expected: false },
    ])(
      '$name',
      ({ input, expected }) => {
        expect(REGEX_UUID_MATCH_A_SUBSTRING.test(input)).toBe(expected)
      }
    )

    it(
      'should be a RegExp',
      () => {
        expect(REGEX_UUID_MATCH_A_SUBSTRING).toBeInstanceOf(RegExp)
      }
    )
  }
)
