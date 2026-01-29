import { describe, expect, it } from 'bun:test'
import { MAX_INT64 } from '../../ts/constant/max-int64.util.js'

describe(
  'MAX_INT64',
  () => {
    it(
      'should be the maximum value for a 64-bit signed integer',
      () => {
        expect(MAX_INT64).toBe(9223372036854775807n)
        expect(MAX_INT64).toBe(2n ** 63n - 1n)
      }
    )

    it(
      'should be a bigint',
      () => {
        expect(typeof MAX_INT64).toBe('bigint')
      }
    )
  }
)
