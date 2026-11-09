import { describe, expect, it } from 'bun:test'
import { FakeMomentTimezone } from '../ts/fake-moment-timezone.js'

/** Minimal Luxon-like DateTime mock; `fromMillis` echoes its arguments so its result can't be mistaken for `now()` */
function makeMockDateTime (overrides: { offset?: number; isValid?: boolean } = {}): any {
  const offset = overrides.offset ?? 60
  const isValid = overrides.isValid ?? true

  const instance = {
    offset,
    isValid,
  }

  const DateTime: any = {
    now: () => instance,
    // eslint-disable-next-line max-params -- mirrors Luxon DateTime.fromMillis(ms, options)
    fromMillis: (ms: number, _options?: any) => ({
      offset: offset + 0,
      isValid: true,
      ms,
      options: _options,
    }),
  }

  return DateTime
}

describe(
  'FakeMomentTimezone',
  () => {
    it.each<{ name: string, offset?: number, expected: number }>([
      { name: 'default mock offset', expected: 60 },
      { name: 'offset 120', offset: 120, expected: 120 },
      { name: 'offset 180', offset: 180, expected: 180 },
    ])(
      'constructor assigns the DateTime reference, creates _ via DateTime.now(), utcOffset returns its offset: $name',
      ({ offset, expected }) => {
        const DateTime = makeMockDateTime({ offset })
        const fmt = new FakeMomentTimezone({ DateTime })

        expect(fmt.DateTime).toBe(DateTime)
        expect(fmt._).toBe(DateTime.now())
        expect(fmt._).toStrictEqual({ offset: expected, isValid: true })
        expect(fmt.utcOffset()).toBe(expected)
      }
    )

    it.each<{ name: string, build: () => unknown, args: Parameters<FakeMomentTimezone['tz']>, expected: unknown }>([
      {
        name: 'with a valid timestamp calls fromMillis and sets _',
        build: () => makeMockDateTime({ offset: 60 }),
        args: [1_000_000, 'Europe/Paris'],
        expected: { offset: 60, isValid: true, ms: 1_000_000, options: { zone: 'Europe/Paris' } },
      },
      {
        name: 'without arguments falls back to DateTime.now()',
        build: () => makeMockDateTime({ offset: 30 }),
        args: [],
        expected: { offset: 30, isValid: true },
      },
      {
        name: 'with a Date object sets _',
        build: () => makeMockDateTime({ offset: 0 }),
        args: [new Date('2024-01-01T00:00:00.000Z'), 'UTC'],
        expected: { offset: 0, isValid: true, ms: 1704067200000, options: { zone: 'UTC' } },
      },
      {
        name: 'with an invalid numeric value falls back to DateTime.now()',
        build: () => makeMockDateTime({ offset: 45 }),
        args: [NaN],
        expected: { offset: 45, isValid: true },
      },
      {
        name: 'with zone option producing an invalid isValid falls back to now',
        build: () => ({
          now: () => ({ offset: 0, isValid: true }),
          fromMillis: () => ({ offset: 0, isValid: false }),
        }),
        args: [1_000_000, 'Invalid/Zone'],
        expected: { offset: 0, isValid: true },
      },
    ])(
      'tz $name',
      ({ build, args, expected }) => {
        const fmt = new FakeMomentTimezone({ DateTime: build() })
        const result = fmt.tz(...args)

        expect(result).toBe(fmt)
        expect(fmt._).toStrictEqual(expected)
      }
    )
  }
)
