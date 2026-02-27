import { describe, expect, it } from 'bun:test'
import { BASE_256_TO_ARRAY_10 } from '../../ts/convert/base-256-to-array-10.util.js'

describe(
  'BASE_256_TO_ARRAY_10',
  () => {
    const testCases = [
      { label: '"0"', input: '0', expected: [0] },
      { label: '"a"', input: 'a', expected: [10] },
      { label: '"0a"', input: '0a', expected: [0, 10] },
      { label: '""', input: '', expected: [] },
    ]

    it.each(testCases)(
      'BASE_256_TO_ARRAY_10($label)',
      ({ input, expected }) => {
        expect(BASE_256_TO_ARRAY_10(input)).toEqual(expected)
      }
    )

    it(
      'round-trips with BYTE_ARRAY_LIKE_TO_BASE_256',
      async () => {
        // import lazily to avoid circular dependency issues
        const { BYTE_ARRAY_LIKE_TO_BASE_256 } = await import('../../ts/convert/byte-array-like-to-base-256.util.js')
        const values = [0, 10, 35, 61]
        const encoded = BYTE_ARRAY_LIKE_TO_BASE_256(values)
        expect(BASE_256_TO_ARRAY_10(encoded)).toEqual(values)
      }
    )
  }
)
