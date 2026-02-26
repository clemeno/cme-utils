import { describe, expect, it } from 'bun:test'
import { PERIOD_EXPORT } from '../../ts/convert/period-export.util.js'

describe(
  'PERIOD_EXPORT',
  () => {
    it(
      'serialises min, max and label into _§§_ delimited string',
      () => {
        const min = { toISOString: () => '2024-01-01T00:00:00.000Z' }
        const max = { toISOString: () => '2024-12-31T23:59:59.999Z' }
        expect(PERIOD_EXPORT({ min, max, label: 'test' })).toBe(
          '2024-01-01T00:00:00.000Z_§§_2024-12-31T23:59:59.999Z_§§_test'
        )
      }
    )

    it(
      'null min and max produce empty segments',
      () => {
        expect(PERIOD_EXPORT({ min: null, max: null, label: 'empty' })).toBe('_§§__§§_empty')
      }
    )

    it(
      'empty label is preserved',
      () => {
        const min = { toISOString: () => '2025-06-01T00:00:00.000Z' }
        const max = { toISOString: () => '2025-06-30T23:59:59.999Z' }
        expect(PERIOD_EXPORT({ min, max, label: '' })).toBe(
          '2025-06-01T00:00:00.000Z_§§_2025-06-30T23:59:59.999Z_§§_'
        )
      }
    )
  }
)
