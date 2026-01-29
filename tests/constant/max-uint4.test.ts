import { describe, expect, it } from 'bun:test'
import { MAX_UINT4 } from '../../ts/constant/max-uint4.util.js'

describe(
  'MAX_UINT4',
  () => {
    it(
      'should be the maximum value for a 4-bit unsigned integer',
      () => {
        expect(MAX_UINT4).toBe(15)
        expect(MAX_UINT4).toBe(2 ** 4 - 1)
      }
    )

    it(
      'should be a number',
      () => {
        expect(typeof MAX_UINT4).toBe('number')
        expect(Number.isInteger(MAX_UINT4)).toBe(true)
      }
    )
  }
)
