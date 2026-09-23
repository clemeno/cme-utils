import { describe, expect, it } from 'bun:test'
import { MAX_INT64 } from '../../ts/constant/max-int64.util.js'

describe(
  'MAX_INT64',
  () => {
    it.each<{ name: string, actual: unknown, expected: unknown }>([
      { name: 'is 9223372036854775807n', actual: MAX_INT64, expected: 9223372036854775807n },
      { name: 'is the maximum value for a 64-bit signed integer (2n ** 63n - 1n)', actual: MAX_INT64, expected: 2n ** 63n - 1n },
      { name: 'is a bigint', actual: typeof MAX_INT64, expected: 'bigint' },
    ])(
      '$name',
      ({ actual, expected }) => {
        expect(actual).toBe(expected)
      }
    )
  }
)
