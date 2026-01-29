import { describe, expect, it } from 'bun:test'
import { REGEX_UUID_MATCH_A_SUBSTRING } from '../../ts/regex/regex-uuid-match-a-substring.util.js'

describe(
  'REGEX_UUID_MATCH_A_SUBSTRING',
  () => {
    it(
      'should match valid UUID strings',
      () => {
        expect(REGEX_UUID_MATCH_A_SUBSTRING.test('123e4567-e89b-12d3-a456-426614174000')).toBe(true)
        expect(REGEX_UUID_MATCH_A_SUBSTRING.test('550e8400-e29b-41d4-a716-446655440000')).toBe(true)
        expect(REGEX_UUID_MATCH_A_SUBSTRING.test('6ba7b810-9dad-11d1-80b4-00c04fd430c8')).toBe(true)
      }
    )

    it(
      'should match UUID within larger strings',
      () => {
        expect(REGEX_UUID_MATCH_A_SUBSTRING.test('prefix-123e4567-e89b-12d3-a456-426614174000-suffix')).toBe(true)
        expect(REGEX_UUID_MATCH_A_SUBSTRING.test('The UUID is 550e8400-e29b-41d4-a716-446655440000 here')).toBe(true)
      }
    )

    it(
      'should not match invalid UUID formats',
      () => {
        expect(REGEX_UUID_MATCH_A_SUBSTRING.test('')).toBe(false)
        expect(REGEX_UUID_MATCH_A_SUBSTRING.test('123e4567-e89b-12d3-a456')).toBe(false)
        expect(REGEX_UUID_MATCH_A_SUBSTRING.test('123e4567-e89b-12d3-a456-426614174000-extra')).toBe(true) // Contains valid UUID at start
        expect(REGEX_UUID_MATCH_A_SUBSTRING.test('123e4567e89b12d3a456426614174000')).toBe(false)
        expect(REGEX_UUID_MATCH_A_SUBSTRING.test('123e4567-e89b-12d3-a456-42661417400')).toBe(false)
        expect(REGEX_UUID_MATCH_A_SUBSTRING.test('gggggggg-hhhh-iiii-jjjj-kkkkkkkkkkkk')).toBe(false)
      }
    )

    it(
      'should be case insensitive',
      () => {
        expect(REGEX_UUID_MATCH_A_SUBSTRING.test('123E4567-E89B-12D3-A456-426614174000')).toBe(true)
        expect(REGEX_UUID_MATCH_A_SUBSTRING.test('123e4567-E89B-12d3-a456-426614174000')).toBe(true)
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
