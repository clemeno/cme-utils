import { describe, expect, it } from 'bun:test'
import { UNSIGNED_TO_SIGNED } from '../../ts/convert/unsigned-to-signed.util.js'

describe(
  'UNSIGNED_TO_SIGNED',
  () => {
    const lowerHalfTestCases = [
      { name: 'zero', value: 0, bits: 8, expected: 0 },
      { name: 'small positive', value: 5, bits: 8, expected: 5 },
      { name: 'max positive for 8-bit', value: 127, bits: 8, expected: 127 },
    ]

    it.each(lowerHalfTestCases)(
      'should convert $name in lower half unchanged',
      ({ value, bits, expected }) => {
        expect(UNSIGNED_TO_SIGNED({ value, bits })).toBe(expected)
      }
    )

    const upperHalfTestCases = [
      { name: '128 to -128', value: 128, bits: 8, expected: -128 },
      { name: '255 to -1', value: 255, bits: 8, expected: -1 },
      { name: '200 to -56', value: 200, bits: 8, expected: -56 },
    ]

    it.each(upperHalfTestCases)(
      'should convert $name in upper half to negative',
      ({ value, bits, expected }) => {
        expect(UNSIGNED_TO_SIGNED({ value, bits })).toBe(expected)
      }
    )

    const differentBitsTestCases = [
      { name: '16-bit max positive', value: 32767, bits: 16, expected: 32767 },
      { name: '16-bit min negative', value: 32768, bits: 16, expected: -32768 },
      { name: '16-bit max unsigned to -1', value: 65535, bits: 16, expected: -1 },
      { name: '4-bit max positive', value: 7, bits: 4, expected: 7 },
      { name: '4-bit 8 to -8', value: 8, bits: 4, expected: -8 },
      { name: '4-bit 15 to -1', value: 15, bits: 4, expected: -1 },
    ]

    it.each(differentBitsTestCases)(
      'should work with different bit sizes - $name',
      ({ value, bits, expected }) => {
        expect(UNSIGNED_TO_SIGNED({ value, bits })).toBe(expected)
      }
    )

    const edgeCaseTestCases = [
      { name: '1-bit zero', value: 0, bits: 1, expected: 0 },
      { name: '1-bit one to -1', value: 1, bits: 1, expected: -1 },
    ]

    it.each(edgeCaseTestCases)(
      'should handle edge cases - $name',
      ({ value, bits, expected }) => {
        expect(UNSIGNED_TO_SIGNED({ value, bits })).toBe(expected)
      }
    )
  }
)
