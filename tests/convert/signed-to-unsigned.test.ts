import { describe, expect, it } from 'bun:test'
import { SIGNED_TO_UNSIGNED } from '../../ts/convert/signed-to-unsigned.util.js'

describe(
  'SIGNED_TO_UNSIGNED',
  () => {
    const positiveTestCases = [
      { name: 'zero', value: 0, bits: 8, expected: 0 },
      { name: 'small positive', value: 5, bits: 8, expected: 5 },
      { name: 'max positive 8-bit', value: 127, bits: 8, expected: 127 },
      { name: 'max unsigned 8-bit', value: 255, bits: 8, expected: 255 },
    ]

    it.each(positiveTestCases)(
      'should convert positive numbers unchanged - $name',
      ({ value, bits, expected }) => {
        expect(SIGNED_TO_UNSIGNED({ value, bits })).toBe(expected)
      }
    )

    const negativeTestCases = [
      { name: '-1 to 255', value: -1, bits: 8, expected: 255 },
      { name: '-2 to 254', value: -2, bits: 8, expected: 254 },
      { name: '-128 to 128', value: -128, bits: 8, expected: 128 },
    ]

    it.each(negativeTestCases)(
      'should convert negative numbers to unsigned equivalent - $name',
      ({ value, bits, expected }) => {
        expect(SIGNED_TO_UNSIGNED({ value, bits })).toBe(expected)
      }
    )

    const differentBitsTestCases = [
      { name: '-1 with 16 bits', value: -1, bits: 16, expected: 65535 },
      { name: '-1 with 32 bits', value: -1, bits: 32, expected: 4294967295 },
      { name: '10 with 4 bits', value: 10, bits: 4, expected: 10 },
      { name: '-1 with 4 bits', value: -1, bits: 4, expected: 15 },
    ]

    it.each(differentBitsTestCases)(
      'should work with different bit sizes - $name',
      ({ value, bits, expected }) => {
        expect(SIGNED_TO_UNSIGNED({ value, bits })).toBe(expected)
      }
    )

    it(
      'should handle edge cases',
      () => {
        expect(SIGNED_TO_UNSIGNED({ value: Number.MIN_SAFE_INTEGER, bits: 53 })).toBe(1)
        // For very large negative numbers, it might overflow, but let's test reasonable cases
      }
    )
  }
)
