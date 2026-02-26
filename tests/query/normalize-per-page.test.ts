import { describe, expect, it } from 'bun:test'
import { NORMALIZE_PER_PAGE } from '../../ts/query/normalize-per-page.util.js'

describe(
  'NORMALIZE_PER_PAGE',
  () => {
    const testCases = [
      { name: '10', input: 10, expected: '10' },
      { name: '50', input: '50', expected: '50' },
      { name: '1', input: 1, expected: '1' },
      { name: '0 → clamped to min (1)', input: 0, expected: '1' },
      { name: 'negative → clamped to min (1)', input: -5, expected: '1' },
      { name: 'invalid string → default (1)', input: 'invalid' as any, expected: '1' },
      { name: 'large number preserved', input: 1000000, expected: '1000000' },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(NORMALIZE_PER_PAGE(input)).toBe(expected)
      }
    )
  }
)
