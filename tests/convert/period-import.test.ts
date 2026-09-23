import { describe, expect, it } from 'bun:test'
import { PERIOD_IMPORT } from '../../ts/convert/period-import.util.js'

/** Minimal Luxon-compatible DateTime stub */
const makeMockDateTime = (validPrefixes: string[] = []) => ({
  fromISO: (iso: string) => ({
    isValid: validPrefixes.length === 0 ? !iso.startsWith('invalid') : validPrefixes.some(p => iso.startsWith(p)),
    _iso: iso,
  }),
})

describe(
  'PERIOD_IMPORT',
  () => {
    it.each<{ name: string, input: string, expected: ReturnType<typeof PERIOD_IMPORT> }>([
      {
        name: 'parses valid ISO string into { min, max, label }',
        input: '2024-01-01T00:00:00.000Z_§§_2024-12-31T23:59:59.999Z_§§_myLabel',
        expected: { min: { isValid: true, _iso: '2024-01-01T00:00:00.000Z' }, max: { isValid: true, _iso: '2024-12-31T23:59:59.999Z' }, label: 'myLabel' },
      },
      {
        name: 'falls back to raw ISO string when fromISO produces invalid DateTime for min',
        input: 'invalidDate_§§_2024-01-01T00:00:00.000Z_§§_test',
        expected: { min: 'invalidDate', max: { isValid: true, _iso: '2024-01-01T00:00:00.000Z' }, label: 'test' },
      },
      {
        name: 'label is correctly extracted as third segment',
        input: '2025-01-01T00:00:00.000Z_§§_2025-06-30T23:59:59.999Z_§§_June 2025',
        expected: { min: { isValid: true, _iso: '2025-01-01T00:00:00.000Z' }, max: { isValid: true, _iso: '2025-06-30T23:59:59.999Z' }, label: 'June 2025' },
      },
      {
        name: 'falls back to raw ISO string when fromISO produces invalid DateTime for max',
        input: '2024-01-01T00:00:00.000Z_§§_invalidDate_§§_test',
        expected: { min: { isValid: true, _iso: '2024-01-01T00:00:00.000Z' }, max: 'invalidDate', label: 'test' },
      },
      {
        name: 'both min and max fall back to raw strings when both invalid',
        input: 'invalidMin_§§_invalidMax_§§_label',
        expected: { min: 'invalidMin', max: 'invalidMax', label: 'label' },
      },
    ])(
      '$name',
      ({ input, expected }) => {
        expect(PERIOD_IMPORT({ DateTime: makeMockDateTime(), input })).toEqual(expected)
      }
    )
  }
)
