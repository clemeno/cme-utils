import { describe, expect, it } from 'bun:test'
import { FROM_BASE_10_TO_16 } from '../../ts/convert/from-base-10-to-16.util.js'

describe(
  'FROM_BASE_10_TO_16',
  () => {
    const testCases = [
      { name: '0 → 0', input: '0', expected: '0' },
      { name: '10 → a', input: '10', expected: 'a' },
      { name: '15 → f', input: '15', expected: 'f' },
      { name: '16 → 10', input: '16', expected: '10' },
      { name: '255 → ff', input: '255', expected: 'ff' },
      { name: '256 → 100', input: '256', expected: '100' },
      { name: 'numeric 255', input: 255, expected: 'ff' },
      { name: '4294967295 → ffffffff', input: '4294967295', expected: 'ffffffff' },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(FROM_BASE_10_TO_16(input)).toBe(expected)
      }
    )
  }
)
