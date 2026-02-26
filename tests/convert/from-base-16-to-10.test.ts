import { describe, expect, it } from 'bun:test'
import { FROM_BASE_16_TO_10 } from '../../ts/convert/from-base-16-to-10.util.js'

describe(
  'FROM_BASE_16_TO_10',
  () => {
    const testCases = [
      { name: '0 → 0', input: '0', expected: '0' },
      { name: 'a → 10', input: 'a', expected: '10' },
      { name: 'f → 15', input: 'f', expected: '15' },
      { name: 'ff → 255', input: 'ff', expected: '255' },
      { name: '100 → 256', input: '100', expected: '256' },
      { name: 'ffffffff → 4294967295', input: 'ffffffff', expected: '4294967295' },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(FROM_BASE_16_TO_10(input)).toBe(expected)
      }
    )

    it(
      'empty string returns empty string',
      () => {
        expect(FROM_BASE_16_TO_10('')).toBe('')
      }
    )
  }
)
