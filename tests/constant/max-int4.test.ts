import { describe, expect, it } from 'bun:test'
import { MAX_INT4 } from '../../ts/constant/max-int4.util.js'

describe(
  'MAX_INT4',
  () => {
    it.each<{ name: string, input: unknown, expected: unknown }>([
      { name: 'is 7', input: MAX_INT4, expected: 7 },
      { name: 'is 2 ** 3 - 1, the maximum value for a 4-bit signed integer', input: MAX_INT4, expected: 2 ** 3 - 1 },
      { name: 'is a number', input: typeof MAX_INT4, expected: 'number' },
      { name: 'is an integer', input: Number.isInteger(MAX_INT4), expected: true },
    ])(
      '$name',
      ({ input, expected }) => {
        expect(input).toBe(expected)
      }
    )
  }
)
