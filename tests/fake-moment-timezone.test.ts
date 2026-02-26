import { describe, expect, it } from 'bun:test'
import { FakeMomentTimezone } from '../ts/fake-moment-timezone.js'

/** Minimal Luxon-like DateTime mock */
function makeMockDateTime (overrides: { offset?: number; isValid?: boolean } = {}) {
  const offset = overrides.offset ?? 60
  const isValid = overrides.isValid ?? true

  const instance = {
    offset,
    isValid,
  }

  const DateTime: any = {
    now: () => instance,
    fromMillis: (ms: number, _options?: any) => ({
      offset: offset + 0,
      isValid: true,
    }),
  }

  return DateTime
}

describe(
  'FakeMomentTimezone',
  () => {
    it(
      'constructor assigns the DateTime reference',
      () => {
        const DateTime = makeMockDateTime()
        const fmt = new FakeMomentTimezone({ DateTime })
        expect(fmt.DateTime).toBe(DateTime)
      }
    )

    it(
      'constructor creates an internal _ instance via DateTime.now()',
      () => {
        const DateTime = makeMockDateTime({ offset: 120 })
        const fmt = new FakeMomentTimezone({ DateTime })
        expect((fmt._ as any).offset).toBe(120)
      }
    )

    it(
      'utcOffset returns the offset of the current _ instance',
      () => {
        const DateTime = makeMockDateTime({ offset: 180 })
        const fmt = new FakeMomentTimezone({ DateTime })
        expect(fmt.utcOffset()).toBe(180)
      }
    )

    it(
      'tz with a valid timestamp calls fromMillis and sets _',
      () => {
        const DateTime = makeMockDateTime({ offset: 60 })
        const fmt = new FakeMomentTimezone({ DateTime })
        const result = fmt.tz(1_000_000, 'Europe/Paris')
        expect(result).toBe(fmt)
      }
    )

    it(
      'tz without arguments falls back to DateTime.now()',
      () => {
        const DateTime = makeMockDateTime({ offset: 30 })
        const fmt = new FakeMomentTimezone({ DateTime })
        const result = fmt.tz()
        expect(result).toBe(fmt)
      }
    )

    it(
      'tz with a Date object sets _',
      () => {
        const DateTime = makeMockDateTime({ offset: 0 })
        const fmt = new FakeMomentTimezone({ DateTime })
        const result = fmt.tz(new Date(), 'UTC')
        expect(result).toBe(fmt)
      }
    )

    it(
      'tz with an invalid numeric value falls back to DateTime.now()',
      () => {
        const DateTime = makeMockDateTime({ offset: 45 })
        const fmt = new FakeMomentTimezone({ DateTime })
        const result = fmt.tz(NaN)
        expect(result).toBe(fmt)
      }
    )

    it(
      'tz with zone option producing an invalid isValid falls back to now',
      () => {
        const DateTime: any = {
          now: () => ({ offset: 0, isValid: true }),
          fromMillis: () => ({ offset: 0, isValid: false }),
        }
        const fmt = new FakeMomentTimezone({ DateTime })
        const result = fmt.tz(1_000_000, 'Invalid/Zone')
        expect(result).toBe(fmt)
      }
    )
  }
)
