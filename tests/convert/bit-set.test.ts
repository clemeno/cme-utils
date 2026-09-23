import { describe, expect, it } from 'bun:test'
import { BIT_SET } from '../../ts/convert/bit-set.util.js'

describe(
  'BIT_SET',
  () => {
    const testCases: Array<{ name: string, on: number, at: number, to: 0 | 1, expected: number }> = [
      { name: 'set bit 0 to 1 on 0b0000', on: 0b0000, at: 0, to: 1, expected: 0b0001 },
      { name: 'set bit 1 to 1 on 0b0000', on: 0b0000, at: 1, to: 1, expected: 0b0010 },
      { name: 'set bit 2 to 1 on 0b0000', on: 0b0000, at: 2, to: 1, expected: 0b0100 },
      { name: 'set bit 3 to 1 on 0b0000', on: 0b0000, at: 3, to: 1, expected: 0b1000 },
      { name: 'set bit 0 to 0 on 0b1111', on: 0b1111, at: 0, to: 0, expected: 0b1110 },
      { name: 'set bit 1 to 0 on 0b1111', on: 0b1111, at: 1, to: 0, expected: 0b1101 },
      { name: 'set bit 2 to 0 on 0b1111', on: 0b1111, at: 2, to: 0, expected: 0b1011 },
      { name: 'set bit 3 to 0 on 0b1111', on: 0b1111, at: 3, to: 0, expected: 0b0111 },
      { name: 'set bit 1 to 1 on 0b1010 (already 1)', on: 0b1010, at: 1, to: 1, expected: 0b1010 },
      { name: 'set bit 1 to 0 on 0b1010 (was 1)', on: 0b1010, at: 1, to: 0, expected: 0b1000 },
      { name: 'set bit 0 to 1 on 0b1010 (was 0)', on: 0b1010, at: 0, to: 1, expected: 0b1011 },
      { name: 'set bit 0 to 0 on 0b1010 (already 0)', on: 0b1010, at: 0, to: 0, expected: 0b1010 },
      { name: 'decimal: set bit 0 to 1 on 10', on: 10, at: 0, to: 1, expected: 11 },
      { name: 'decimal: set bit 1 to 0 on 10', on: 10, at: 1, to: 0, expected: 8 },
    ]

    it.each(testCases)(
      '$name',
      ({ on, at, to, expected }) => {
        expect(BIT_SET({ on, at, to })).toBe(expected)
      }
    )
  }
)
