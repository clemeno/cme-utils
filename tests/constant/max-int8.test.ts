import { describe, expect, it } from 'bun:test'
import { MAX_INT8 } from '../../ts/constant/max-int8.util.js'

describe(
  'MAX_INT8',
  () => {
    it.each<{ name: string, actual: unknown, expected: unknown }>([
      { name: 'should be the maximum value for an 8-bit signed integer', actual: MAX_INT8, expected: 127 },
      { name: 'should be 2^7 - 1', actual: MAX_INT8, expected: 2 ** 7 - 1 },
      { name: 'should be a number', actual: typeof MAX_INT8, expected: 'number' },
      { name: 'should be an integer', actual: Number.isInteger(MAX_INT8), expected: true },
    ])(
      '$name',
      ({ actual, expected }) => {
        expect(actual).toBe(expected)
      }
    )
  }
)
