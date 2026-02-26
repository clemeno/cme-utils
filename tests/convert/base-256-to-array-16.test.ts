import { describe, expect, it } from 'bun:test'
import { BASE_256_TO_ARRAY_16 } from '../../ts/convert/base-256-to-array-16.util.js'

describe(
  'BASE_256_TO_ARRAY_16',
  () => {
    it(
      'empty string → []',
      () => {
        expect(BASE_256_TO_ARRAY_16('')).toEqual([])
      }
    )

    it(
      'single char "0" → ["0"]',
      () => {
        expect(BASE_256_TO_ARRAY_16('0')).toEqual(['0'])
      }
    )

    it(
      'single char "a" → ["a"]',
      () => {
        expect(BASE_256_TO_ARRAY_16('a')).toEqual(['a'])
      }
    )

    it(
      'multi-char "0a" → ["0", "a"]',
      () => {
        expect(BASE_256_TO_ARRAY_16('0a')).toEqual(['0', 'a'])
      }
    )

    it(
      'round-trips with BYTE_ARRAY_LIKE_TO_BASE_256 — indices converted to hex',
      async () => {
        // [0, 10, 35] → encoded → BASE_256_TO_ARRAY_16 → FROM_BASE_10_TO_16 of each index
        // 0 → '0', 10 → 'a', 35 → '23'
        const { BYTE_ARRAY_LIKE_TO_BASE_256 } = await import('../../ts/convert/byte-array-like-to-base-256.util.js')
        const values = [0, 10, 35]
        const encoded = BYTE_ARRAY_LIKE_TO_BASE_256(values)
        const decoded = BASE_256_TO_ARRAY_16(encoded)
        expect(decoded).toEqual(['0', 'a', '23'])
      }
    )
  }
)
