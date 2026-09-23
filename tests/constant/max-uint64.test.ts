import { describe, expect, it } from 'bun:test'
import { MAX_UINT64 } from '../../ts/constant/max-uint64.util.js'

describe(
  'MAX_UINT64',
  () => {
    it.each<{ name: string, actual: unknown, expected: unknown }>([
      { name: 'should be the maximum value for a 64-bit unsigned integer', actual: MAX_UINT64, expected: 18446744073709551615n },
      { name: 'should be 2^64 - 1', actual: MAX_UINT64, expected: 2n ** 64n - 1n },
      { name: 'should be a bigint', actual: typeof MAX_UINT64, expected: 'bigint' },
    ])(
      '$name',
      ({ actual, expected }) => {
        expect(actual).toBe(expected)
      }
    )
  }
)
