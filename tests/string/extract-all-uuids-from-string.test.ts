import { describe, expect, it } from 'bun:test'
import { EXTRACT_ALL_UUIDS_FROM_STRING } from '../../ts/string/extract-all-uuids-from-string.util.js'

describe(
  'EXTRACT_ALL_UUIDS_FROM_STRING',
  () => {
    const testCases = [
      { name: 'should return an array with the UUID if string is a UUID', input: '123e4567-e89b-12d3-a456-426614174000', expected: ['123e4567-e89b-12d3-a456-426614174000'] },
      { name: 'should extract all UUIDs from a string', input: 'first 123e4567-e89b-12d3-a456-426614174000 second 456e7890-e89b-12d3-a456-426614174001', expected: ['123e4567-e89b-12d3-a456-426614174000', '456e7890-e89b-12d3-a456-426614174001'] },
      { name: 'should return empty array if no UUID found', input: 'some text without uuid', expected: [] },
      { name: 'should handle single UUID', input: 'text 123e4567-e89b-12d3-a456-426614174000 text', expected: ['123e4567-e89b-12d3-a456-426614174000'] },
    ]

    it.each(testCases)(
      '$name',
      ({ name, input, expected }) => {
        expect(EXTRACT_ALL_UUIDS_FROM_STRING(input)).toEqual(expected)
      }
    )
  }
)
