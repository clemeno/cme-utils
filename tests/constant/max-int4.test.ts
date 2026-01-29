import { describe, expect, it } from 'bun:test'
import { MAX_INT4 } from '../../ts/constant/max-int4.util.js'

describe(
  'MAX_INT4',
  () => {
    it(
      'should be the maximum value for a 4-bit signed integer',
      () => {
        expect(MAX_INT4).toBe(7)
        expect(MAX_INT4).toBe(2 ** 3 - 1)
      }
    )

    it(
      'should be a number',
      () => {
        expect(typeof MAX_INT4).toBe('number')
        expect(Number.isInteger(MAX_INT4)).toBe(true)
      }
    )
  }
)
