import { describe, expect, it } from 'bun:test'
import { MAX_UINT16 } from '../../ts/constant/max-uint16.util.js'

describe(
  'MAX_UINT16',
  () => {
    it.each<{ name: string, expected: number }>([
      { name: 'the literal 65535', expected: 65535 },
      { name: '2 ** 16 - 1, the maximum value for a 16-bit unsigned integer', expected: 2 ** 16 - 1 },
    ])(
      'should equal $name',
      ({ expected }) => {
        expect(MAX_UINT16).toBe(expected)
      }
    )
  }
)
