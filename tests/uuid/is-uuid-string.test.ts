import { describe, expect, it } from 'bun:test'
import { IS_UUID_STRING } from '../../ts/uuid/is-uuid-string.util.js'

describe(
  'IS_UUID_STRING',
  () => {
    const testCases = [
      { name: 'valid lowercase UUID', input: '123e4567-e89b-12d3-a456-426614174000', expected: true },
      { name: 'invalid string', input: 'not-a-uuid', expected: false },
      { name: 'uppercase UUID', input: '123E4567-E89B-12D3-A456-426614174000', expected: false },
    ]

    it.each(testCases)(
      'should validate $name correctly',
      ({ input, expected }) => {
        expect(IS_UUID_STRING(input)).toBe(expected)
      }
    )
  }
)
