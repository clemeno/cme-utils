import { describe, expect, it } from 'bun:test'
import { PERIOD_EXPORT } from '../../ts/convert/period-export.util.js'

describe(
  'PERIOD_EXPORT',
  () => {
    it.each<{ name: string, input: Parameters<typeof PERIOD_EXPORT>[0], expected: string }>([
      {
        name: 'serialises min, max and label using toISOString (JS Date)',
        input: { min: { toISOString: () => '2024-01-01T00:00:00.000Z' }, max: { toISOString: () => '2024-12-31T23:59:59.999Z' }, label: 'test' },
        expected: '2024-01-01T00:00:00.000Z_§§_2024-12-31T23:59:59.999Z_§§_test',
      },
      {
        name: 'serialises min, max and label using toISO (Luxon DateTime)',
        input: { min: { toISO: () => '2024-01-01T00:00:00.000+00:00' }, max: { toISO: () => '2024-12-31T23:59:59.999+00:00' }, label: 'luxon' },
        expected: '2024-01-01T00:00:00.000+00:00_§§_2024-12-31T23:59:59.999+00:00_§§_luxon',
      },
      {
        name: 'null min and max produce empty segments',
        input: { min: null, max: null, label: 'empty' },
        expected: '_§§__§§_empty',
      },
      {
        name: 'empty label is preserved',
        input: { min: { toISOString: () => '2025-06-01T00:00:00.000Z' }, max: { toISOString: () => '2025-06-30T23:59:59.999Z' }, label: '' },
        expected: '2025-06-01T00:00:00.000Z_§§_2025-06-30T23:59:59.999Z_§§_',
      },
    ])(
      '$name',
      ({ input, expected }) => {
        expect(PERIOD_EXPORT(input)).toBe(expected)
      }
    )
  }
)
