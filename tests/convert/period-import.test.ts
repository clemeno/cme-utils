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
    it(
      'parses valid ISO string into { min, max, label }',
      () => {
        const DateTime = makeMockDateTime()
        const result = PERIOD_IMPORT({
          DateTime,
          input: '2024-01-01T00:00:00.000Z_§§_2024-12-31T23:59:59.999Z_§§_myLabel',
        })
        expect(result.label).toBe('myLabel')
        expect((result.min as any).isValid).toBe(true)
        expect((result.max as any).isValid).toBe(true)
      }
    )

    it(
      'falls back to raw ISO string when fromISO produces invalid DateTime for min',
      () => {
        const DateTime = makeMockDateTime()
        const result = PERIOD_IMPORT({
          DateTime,
          input: 'invalidDate_§§_2024-01-01T00:00:00.000Z_§§_test',
        })
        expect(result.min).toBe('invalidDate')
        expect((result.max as any).isValid).toBe(true)
        expect(result.label).toBe('test')
      }
    )

    it(
      'label is correctly extracted as third segment',
      () => {
        const DateTime = makeMockDateTime()
        const result = PERIOD_IMPORT({
          DateTime,
          input: '2025-01-01T00:00:00.000Z_§§_2025-06-30T23:59:59.999Z_§§_June 2025',
        })
        expect(result.label).toBe('June 2025')
      }
    )

    it(
      'falls back to raw ISO string when fromISO produces invalid DateTime for max',
      () => {
        const DateTime = makeMockDateTime()
        const result = PERIOD_IMPORT({
          DateTime,
          input: '2024-01-01T00:00:00.000Z_§§_invalidDate_§§_test',
        })
        expect((result.min as any).isValid).toBe(true)
        expect(result.max).toBe('invalidDate')
        expect(result.label).toBe('test')
      }
    )

    it(
      'both min and max fall back to raw strings when both invalid',
      () => {
        const DateTime = makeMockDateTime()
        const result = PERIOD_IMPORT({
          DateTime,
          input: 'invalidMin_§§_invalidMax_§§_label',
        })
        expect(result.min).toBe('invalidMin')
        expect(result.max).toBe('invalidMax')
        expect(result.label).toBe('label')
      }
    )
  }
)
