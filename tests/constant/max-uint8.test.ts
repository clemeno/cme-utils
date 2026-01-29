import { describe, expect, it } from 'bun:test'
import { MAX_UINT8 } from '../../ts/constant/max-uint8.util.js'

describe(
  'MAX_UINT8',
  () => {
    it(
      'should be the maximum value for an 8-bit unsigned integer',
      () => {
        expect(MAX_UINT8).toBe(255)
        expect(MAX_UINT8).toBe(2 ** 8 - 1)
      }
    )

    it(
      'should be a number',
      () => {
        expect(typeof MAX_UINT8).toBe('number')
        expect(Number.isInteger(MAX_UINT8)).toBe(true)
      }
    )
  }
)
