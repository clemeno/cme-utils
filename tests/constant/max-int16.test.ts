import { describe, expect, it } from 'bun:test'
import { MAX_INT16 } from '../../ts/constant/max-int16.util.js'

describe(
  'MAX_INT16',
  () => {
    it(
      'should be the maximum value for a 16-bit signed integer',
      () => {
        expect(MAX_INT16).toBe(32767)
        expect(MAX_INT16).toBe(2 ** 15 - 1)
      }
    )

    it(
      'should be a number',
      () => {
        expect(typeof MAX_INT16).toBe('number')
        expect(Number.isInteger(MAX_INT16)).toBe(true)
      }
    )
  }
)
