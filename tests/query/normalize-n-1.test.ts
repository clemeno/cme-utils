import { describe, expect, it } from 'bun:test'
import { NORMALIZE_N_1 } from '../../ts/query/normalize-n-1.util.js'

describe(
  'NORMALIZE_N_1',
  () => {
    const testCases = [
      { name: 'within bounds', n: 5, min: 1, max: 10, def: 1, expected: '5' },
      { name: 'above max → clamped to max', n: 15, min: 1, max: 10, def: 1, expected: '10' },
      { name: 'below min → clamped to min', n: -5, min: 0, max: 10, def: 1, expected: '0' },
      { name: 'invalid n → returns default', n: 'invalid' as any, min: 1, max: 10, def: 5, expected: '5' },
      { name: 'n equals min', n: 1, min: 1, max: 10, def: 1, expected: '1' },
      { name: 'n equals max', n: 10, min: 1, max: 10, def: 1, expected: '10' },
    ]

    it.each(testCases)(
      '$name',
      ({ n, min, max, def, expected }) => {
        expect(NORMALIZE_N_1({ n, min, max, def })).toBe(expected)
      }
    )

    it(
      'all defaults produces "1"',
      () => {
        expect(NORMALIZE_N_1({})).toBe('1')
      }
    )

    it(
      'string numeric n is handled',
      () => {
        expect(NORMALIZE_N_1({ n: '7', min: 1, max: 10 })).toBe('7')
      }
    )
  }
)
