import { describe, expect, it } from 'bun:test'
import { BIG_16_TO_BIG_10 } from '../../ts/convert/big-16-to-big-10.util.js'
import type { numeric } from '../../ts/numeric.js'

describe(
  'BIG_16_TO_BIG_10',
  () => {
    const testCases: Array<{ name: string, input: numeric | null | undefined, expected: string }> = [
      { name: '0 → 0', input: '0', expected: '0' },
      { name: 'a → 10', input: 'a', expected: '10' },
      { name: 'f → 15', input: 'f', expected: '15' },
      { name: 'ff → 255', input: 'ff', expected: '255' },
      { name: '100 → 256', input: '100', expected: '256' },
      { name: 'ffffffff → 4294967295', input: 'ffffffff', expected: '4294967295' },
      { name: 'ffffffffffffffff → 18446744073709551615', input: 'ffffffffffffffff', expected: '18446744073709551615' },
      { name: 'empty string returns empty string', input: '', expected: '' },
      { name: 'null returns empty string', input: null, expected: '' },
      { name: 'undefined returns empty string', input: undefined, expected: '' },
      { name: 'NaN-like "NaN" string returns empty string', input: 'NaN', expected: '' },
      { name: 'numeric NaN returns empty string', input: NaN, expected: '' },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(BIG_16_TO_BIG_10(input as numeric)).toBe(expected)
      }
    )
  }
)
