import { describe, expect, it } from 'bun:test'
import { EXTRACT_UUID_FROM_STRING } from '../../ts/string/extract-uuid-from-string.util.js'

describe(
  'EXTRACT_UUID_FROM_STRING',
  () => {
    const testCases = [
      { name: 'should return the string if it is a UUID', input: '123e4567-e89b-12d3-a456-426614174000', expected: '123e4567-e89b-12d3-a456-426614174000' },
      { name: 'should extract the first UUID from a string', input: 'some text 123e4567-e89b-12d3-a456-426614174000 more text', expected: '123e4567-e89b-12d3-a456-426614174000' },
      { name: 'should return empty string if no UUID found', input: 'some text without uuid', expected: '' },
      { name: 'should handle multiple UUIDs and return the first', input: 'first 123e4567-e89b-12d3-a456-426614174000 second 456e7890-e89b-12d3-a456-426614174001', expected: '123e4567-e89b-12d3-a456-426614174000' },
    ]

    it.each(testCases)(
      '$name',
      ({ name, input, expected }) => {
        expect(EXTRACT_UUID_FROM_STRING(input)).toBe(expected)
      }
    )
  }
)
