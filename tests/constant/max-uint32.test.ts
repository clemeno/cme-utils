import { describe, expect, it } from 'bun:test'
import { MAX_UINT32 } from '../../ts/constant/max-uint32.util.js'

describe(
  'MAX_UINT32',
  () => {
    it.each<{ name: string, input: unknown, expected: unknown }>([
      { name: 'is 4294967295', input: MAX_UINT32, expected: 4294967295 },
      { name: 'is 2 ** 32 - 1, the maximum value for a 32-bit unsigned integer', input: MAX_UINT32, expected: 2 ** 32 - 1 },
      { name: 'is a number', input: typeof MAX_UINT32, expected: 'number' },
      { name: 'is an integer', input: Number.isInteger(MAX_UINT32), expected: true },
    ])(
      '$name',
      ({ input, expected }) => {
        expect(input).toBe(expected)
      }
    )
  }
)
