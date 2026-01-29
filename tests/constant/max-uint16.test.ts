import { describe, expect, it } from 'bun:test'
import { MAX_UINT16 } from '../../ts/constant/max-uint16.util.js'

describe(
  'MAX_UINT16',
  () => {
    it(
      'should be the maximum value for a 16-bit unsigned integer',
      () => {
        expect(MAX_UINT16).toBe(65535)
        expect(MAX_UINT16).toBe(2 ** 16 - 1)
      }
    )

    it(
      'should be a number',
      () => {
        expect(typeof MAX_UINT16).toBe('number')
        expect(Number.isInteger(MAX_UINT16)).toBe(true)
      }
    )
  }
)
