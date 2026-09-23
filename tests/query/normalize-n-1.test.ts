import { describe, expect, it } from 'bun:test'
import { NORMALIZE_N_1 } from '../../ts/query/normalize-n-1.util.js'

describe(
  'NORMALIZE_N_1',
  () => {
    const testCases: Array<{ name: string, params: Parameters<typeof NORMALIZE_N_1>[0], expected: string }> = [
      { name: 'within bounds', params: { n: 5, min: 1, max: 10, def: 1 }, expected: '5' },
      { name: 'above max → clamped to max', params: { n: 15, min: 1, max: 10, def: 1 }, expected: '10' },
      { name: 'below min → clamped to min', params: { n: -5, min: 0, max: 10, def: 1 }, expected: '0' },
      { name: 'invalid n → returns default', params: { n: 'invalid', min: 1, max: 10, def: 5 }, expected: '5' },
      { name: 'n equals min', params: { n: 1, min: 1, max: 10, def: 1 }, expected: '1' },
      { name: 'n equals max', params: { n: 10, min: 1, max: 10, def: 1 }, expected: '10' },
      { name: 'string numeric n and bounds are handled', params: { n: '7', min: '1', max: '10' }, expected: '7' },
      { name: 'all defaults → "1"', params: {}, expected: '1' },
      { name: 'only n given → clamped to default max 1', params: { n: 5 }, expected: '1' },
      { name: 'invalid n without def → default "1"', params: { n: 'abc', min: 1, max: 10 }, expected: '1' },
    ]

    it.each(testCases)(
      '$name',
      ({ params, expected }) => {
        expect(NORMALIZE_N_1(params)).toBe(expected)
      }
    )
  }
)
