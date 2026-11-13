import { describe, expect, it } from 'bun:test'
import { BYTE_ARRAY_LIKE_TO_BASE_256 } from '../../ts/convert/byte-array-like-to-base-256.util.js'

describe(
  'BYTE_ARRAY_LIKE_TO_BASE_256',
  () => {
    const testCases: Array<{ name: string, input: number[] | null, expected: string }> = [
      { name: '[]', input: [], expected: '' },
      { name: '[0]', input: [0], expected: '0' },
      { name: '[10]', input: [10], expected: 'a' },
      { name: '[35]', input: [35], expected: 'z' },
      { name: '[36]', input: [36], expected: 'A' },
      { name: '[0, 10, 35]', input: [0, 10, 35], expected: '0az' },
      { name: 'null', input: null, expected: '' },
    ]

    it.each(testCases)(
      'BYTE_ARRAY_LIKE_TO_BASE_256($name) -> "$expected"',
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
