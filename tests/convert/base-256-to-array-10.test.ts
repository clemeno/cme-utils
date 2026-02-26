import { describe, expect, it } from 'bun:test'
import { BASE_256_TO_ARRAY_10 } from '../../ts/convert/base-256-to-array-10.util.js'

describe(
  'BASE_256_TO_ARRAY_10',
  () => {
    it(
      'single char "0" → [0]',
      () => {
        expect(BASE_256_TO_ARRAY_10('0')).toEqual([0])
      }
    )

    it(
      'single char "a" → [10]',
      () => {
        expect(BASE_256_TO_ARRAY_10('a')).toEqual([10])
      }
    )

    it(
      'multi-char "0a" → [0, 10]',
      () => {
        expect(BASE_256_TO_ARRAY_10('0a')).toEqual([0, 10])
      }
    )

    it(
      'empty string → []',
      () => {
        expect(BASE_256_TO_ARRAY_10('')).toEqual([])
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
