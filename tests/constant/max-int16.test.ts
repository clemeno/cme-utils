import { describe, expect, it } from 'bun:test'
import { MAX_INT16 } from '../../ts/constant/max-int16.util.js'

describe(
  'MAX_INT16',
  () => {
    it.each<{ name: string, expected: number }>([
      { name: 'the literal 32767', expected: 32767 },
      { name: '2 ** 15 - 1, the maximum value for a 16-bit signed integer', expected: 2 ** 15 - 1 },
    ])(
      'should equal $name',
      ({ expected }) => {
        expect(MAX_INT16).toBe(expected)
      }
    )
  }
)
