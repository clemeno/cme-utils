import { describe, expect, it } from 'bun:test'
import { MAX_UINT64 } from '../../ts/constant/max-uint64.util.js'

describe(
  'MAX_UINT64',
  () => {
    it(
      'should be the maximum value for a 64-bit unsigned integer',
      () => {
        expect(MAX_UINT64).toBe(18446744073709551615n)
        expect(MAX_UINT64).toBe(2n ** 64n - 1n)
      }
    )

    it(
      'should be a bigint',
      () => {
        expect(typeof MAX_UINT64).toBe('bigint')
      }
    )
  }
)
