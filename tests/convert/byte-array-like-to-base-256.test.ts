import { describe, expect, it } from 'bun:test'
import { BYTE_ARRAY_LIKE_TO_BASE_256 } from '../../ts/convert/byte-array-like-to-base-256.util.js'

describe(
  'BYTE_ARRAY_LIKE_TO_BASE_256',
  () => {
    const testCases = [
      { label: '[]', input: [], expected: '' },
      { label: '[0]', input: [0], expected: '0' },
      { label: '[10]', input: [10], expected: 'a' },
      { label: '[35]', input: [35], expected: 'z' },
      { label: '[36]', input: [36], expected: 'A' },
      { label: '[0, 10, 35]', input: [0, 10, 35], expected: '0az' },
      { label: 'null', input: null, expected: '' },
    ]

    it.each(testCases)(
      'BYTE_ARRAY_LIKE_TO_BASE_256($label) -> "$expected"',
      ({ input, expected }) => {
        expect(BYTE_ARRAY_LIKE_TO_BASE_256(input)).toBe(expected)
      }
    )

    it(
      'result length equals input length',
      () => {
        const result = BYTE_ARRAY_LIKE_TO_BASE_256([1, 2, 3, 4, 5])
        expect(result.length).toBe(5)
      }
    )
  }
)
