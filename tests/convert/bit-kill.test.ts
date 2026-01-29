import { describe, expect, it } from 'bun:test'
import { BIT_KILL } from '../../ts/convert/bit-kill.util.js'

describe(
  'BIT_KILL',
  () => {
    const clearBitTestCases = [
      { name: 'clear bit 0 from 0b1111', on: 0b1111, at: 0, expected: 0b1110 },
      { name: 'clear bit 1 from 0b1111', on: 0b1111, at: 1, expected: 0b1101 },
      { name: 'clear bit 2 from 0b1111', on: 0b1111, at: 2, expected: 0b1011 },
      { name: 'clear bit 3 from 0b1111', on: 0b1111, at: 3, expected: 0b0111 },
    ]

    it.each(clearBitTestCases)(
      'should clear a bit to 0 - $name',
      ({ on, at, expected }) => {
        expect(BIT_KILL({ on, at })).toBe(expected)
      }
    )

    const alreadyZeroTestCases = [
      { name: 'clear bit 0 from 0b0000', on: 0b0000, at: 0, expected: 0b0000 },
      { name: 'clear bit 1 from 0b1010', on: 0b1010, at: 1, expected: 0b1000 },
      { name: 'clear bit 0 from 0b1010', on: 0b1010, at: 0, expected: 0b1010 },
    ]

    it.each(alreadyZeroTestCases)(
      'should handle bits that are already 0 - $name',
      ({ on, at, expected }) => {
        expect(BIT_KILL({ on, at })).toBe(expected)
      }
    )

    const decimalTestCases = [
      { name: 'clear bit 0 from 11', on: 11, at: 0, expected: 10 },
      { name: 'clear bit 1 from 15', on: 15, at: 1, expected: 13 },
    ]

    it.each(decimalTestCases)(
      'should work with decimal numbers - $name',
      ({ on, at, expected }) => {
        expect(BIT_KILL({ on, at })).toBe(expected)
      }
    )

    const higherBitTestCases = [
      { name: 'clear bit 7 from 0b10000000', on: 0b10000000, at: 7, expected: 0b00000000 },
      { name: 'clear bit 7 from 0b11111111', on: 0b11111111, at: 7, expected: 0b01111111 },
    ]

    it.each(higherBitTestCases)(
      'should handle higher bit positions - $name',
      ({ on, at, expected }) => {
        expect(BIT_KILL({ on, at })).toBe(expected)
      }
    )
  }
)
