import { describe, expect, it } from 'bun:test'
import { MAX_UINT8 } from '../../ts/constant/max-uint8.util.js'

describe(
  'MAX_UINT8',
  () => {
    it.each<{ name: string, expected: number }>([
      { name: 'the literal 255', expected: 255 },
      { name: '2 ** 8 - 1, the maximum value for an 8-bit unsigned integer', expected: 2 ** 8 - 1 },
    ])(
      'should equal $name',
      ({ expected }) => {
        expect(MAX_UINT8).toBe(expected)
      }
    )
  }
)
