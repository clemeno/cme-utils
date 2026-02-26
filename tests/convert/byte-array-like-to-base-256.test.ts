import { describe, expect, it } from 'bun:test'
import { BYTE_ARRAY_LIKE_TO_BASE_256 } from '../../ts/convert/byte-array-like-to-base-256.util.js'

describe(
  'BYTE_ARRAY_LIKE_TO_BASE_256',
  () => {
    it(
      'empty array → empty string',
      () => {
        expect(BYTE_ARRAY_LIKE_TO_BASE_256([])).toBe('')
      }
    )

    it(
      '[0] → first SYMBOLS character ("0")',
      () => {
        expect(BYTE_ARRAY_LIKE_TO_BASE_256([0])).toBe('0')
      }
    )

    it(
      '[10] → SYMBOLS[10] ("a")',
      () => {
        expect(BYTE_ARRAY_LIKE_TO_BASE_256([10])).toBe('a')
      }
    )

    it(
      '[35] → SYMBOLS[35] ("z")',
      () => {
        expect(BYTE_ARRAY_LIKE_TO_BASE_256([35])).toBe('z')
      }
    )

    it(
      '[36] → SYMBOLS[36] ("A")',
      () => {
        expect(BYTE_ARRAY_LIKE_TO_BASE_256([36])).toBe('A')
      }
    )

    it(
      '[0, 10, 35] → "0az"',
      () => {
        expect(BYTE_ARRAY_LIKE_TO_BASE_256([0, 10, 35])).toBe('0az')
      }
    )

    it(
      'result length equals input length',
      () => {
        const result = BYTE_ARRAY_LIKE_TO_BASE_256([1, 2, 3, 4, 5])
        expect(result.length).toBe(5)
      }
    )

    it(
      'null input returns empty string',
      () => {
        expect(BYTE_ARRAY_LIKE_TO_BASE_256(null)).toBe('')
      }
    )
  }
)
