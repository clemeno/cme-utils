import { describe, expect, it } from 'bun:test'
import { MAX_UINT4 } from '../../ts/constant/max-uint4.util.js'

describe(
  'MAX_UINT4',
  () => {
    it.each<{ name: string, actual: unknown, expected: unknown }>([
      { name: 'is 15', actual: MAX_UINT4, expected: 15 },
      { name: 'is the maximum value for a 4-bit unsigned integer (2 ** 4 - 1)', actual: MAX_UINT4, expected: 2 ** 4 - 1 },
      { name: 'is a number', actual: typeof MAX_UINT4, expected: 'number' },
      { name: 'is an integer', actual: Number.isInteger(MAX_UINT4), expected: true },
    ])(
      '$name',
      ({ actual, expected }) => {
        expect(actual).toBe(expected)
      }
    )
  }
)
