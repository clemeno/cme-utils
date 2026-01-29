import { describe, expect, it } from 'bun:test'
import { MAX_UINT32 } from '../../ts/constant/max-uint32.util.js'

describe(
  'MAX_UINT32',
  () => {
    it(
      'should be the maximum value for a 32-bit unsigned integer',
      () => {
        expect(MAX_UINT32).toBe(4294967295)
        expect(MAX_UINT32).toBe(2 ** 32 - 1)
      }
    )

    it(
      'should be a number',
      () => {
        expect(typeof MAX_UINT32).toBe('number')
        expect(Number.isInteger(MAX_UINT32)).toBe(true)
      }
    )
  }
)
