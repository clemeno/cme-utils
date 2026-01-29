import { describe, expect, it } from 'bun:test'
import { IS_UUID } from '../../ts/string/is-uuid.util.js'

describe(
  'IS_UUID',
  () => {
    const testCases = [
      { name: 'valid UUID', input: '123e4567-e89b-12d3-a456-426614174000', expected: true },
      { name: 'invalid UUID', input: 'not-a-uuid', expected: false },
      { name: 'empty string', input: '', expected: false },
      { name: 'partial UUID', input: '123e4567-e89b-12d3', expected: false },
    ]

    it.each(testCases)(
      '$name',
      tc => {
        const result = IS_UUID(tc.input)
        expect(result).toBe(tc.expected)
      }
    )
  }
)
