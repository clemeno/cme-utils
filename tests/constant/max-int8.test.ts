import { describe, expect, it } from 'bun:test'
import { MAX_INT8 } from '../../ts/constant/max-int8.util.js'

describe(
  'MAX_INT8',
  () => {
    it(
      'should be the maximum value for an 8-bit signed integer',
      () => {
        expect(MAX_INT8).toBe(127)
        expect(MAX_INT8).toBe(2 ** 7 - 1)
      }
    )

    it(
      'should be a number',
      () => {
        expect(typeof MAX_INT8).toBe('number')
        expect(Number.isInteger(MAX_INT8)).toBe(true)
      }
    )
  }
)
