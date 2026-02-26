import { describe, expect, it } from 'bun:test'
import { BIG_10_TO_BIG_16 } from '../../ts/convert/big-10-to-big-16.util.js'

describe(
  'BIG_10_TO_BIG_16',
  () => {
    const testCases = [
      { name: '0 → 0', input: '0', expected: '0' },
      { name: '10 → a', input: '10', expected: 'a' },
      { name: '15 → f', input: '15', expected: 'f' },
      { name: '16 → 10', input: '16', expected: '10' },
      { name: '255 → ff', input: '255', expected: 'ff' },
      { name: '256 → 100', input: '256', expected: '100' },
      { name: '4294967295 → ffffffff', input: '4294967295', expected: 'ffffffff' },
      { name: 'numeric 255', input: 255, expected: 'ff' },
      { name: 'large number', input: '18446744073709551615', expected: 'ffffffffffffffff' },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(BIG_10_TO_BIG_16(input)).toBe(expected)
      }
    )

    it(
      'empty / null / NaN-like input returns empty string',
      () => {
        expect(BIG_10_TO_BIG_16('')).toBe('')
        expect(BIG_10_TO_BIG_16(null as any)).toBe('')
        expect(BIG_10_TO_BIG_16('NaN')).toBe('')
      }
    )
  }
)
