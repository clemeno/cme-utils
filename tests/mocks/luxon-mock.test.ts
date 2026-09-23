import { afterEach, beforeEach, describe, expect, it, setSystemTime } from 'bun:test'
import { mockDateTime, MockDateTime, MockDateTimeClass, createMockSettings, type DurationObjectUnits } from './luxon-mock.js'

// Fixed UTC timestamp: 2022-01-01T00:00:00.000Z
const BASE_MS = 1640995200000

describe(
  'Luxon DateTime Mock',
  () => {
    describe(
      'mockDateTime',
      () => {
        const testCases = [
          { name: 'creates instance from positive millis', millis: 1000 },
          { name: 'creates instance from zero millis', millis: 0 },
          { name: 'creates instance from large millis', millis: BASE_MS },
          { name: 'creates instance from negative millis (pre-1970)', millis: -86400000 },
        ]

        it.each(testCases)(
          '$name',
          ({ millis }) => {
            const mock = mockDateTime(millis)
            expect(mock.toMillis()).toBe(millis)
            expect(mock.valueOf()).toBe(millis)
          }
        )
      }
    )

    describe(
      'plus method',
      () => {
        const testCases: Array<{ name: string, startMs: number, duration: DurationObjectUnits, expected: number }> = [
          { name: 'adds milliseconds', startMs: 1000, duration: { milliseconds: 500 }, expected: 1500 },
          { name: 'adds seconds', startMs: 1000, duration: { seconds: 2 }, expected: 3000 },
          { name: 'adds minutes', startMs: 1000, duration: { minutes: 1 }, expected: 61000 },
          { name: 'adds hours', startMs: 1000, duration: { hours: 1 }, expected: 3601000 },
          { name: 'adds days', startMs: 1000, duration: { days: 1 }, expected: 86401000 },
          { name: 'adds weeks', startMs: 1000, duration: { weeks: 1 }, expected: 604801000 },
          { name: 'adds months', startMs: 1000, duration: { months: 1 }, expected: 1000 + 2592000000 },
          { name: 'adds quarters', startMs: 1000, duration: { quarters: 1 }, expected: 1000 + 7776000000 },
          { name: 'adds years', startMs: 1000, duration: { years: 1 }, expected: 1000 + 31536000000 },
          { name: 'handles empty duration object', startMs: 1000, duration: {}, expected: 1000 },
          { name: 'handles undefined duration values', startMs: 1000, duration: { hours: undefined, minutes: 5, seconds: undefined }, expected: 1000 + 300000 },
          {
            name: 'handles multiple duration units simultaneously',
            startMs: 1000,
            duration: { hours: 1, minutes: 30, seconds: 45, milliseconds: 500 },
            expected: 1000 + 5445500,
          },
        ]

        it.each(testCases)(
          '$name',
          ({ startMs, duration, expected }) => {
            expect(mockDateTime(startMs).plus(duration).toMillis()).toBe(expected)
          }
        )
      }
    )

    describe(
      'minus method',
      () => {
        const testCases: Array<{ name: string, startMs: number, duration: DurationObjectUnits, expected: number }> = [
          { name: 'subtracts milliseconds', startMs: 2000, duration: { milliseconds: 500 }, expected: 1500 },
          { name: 'subtracts seconds', startMs: 5000, duration: { seconds: 2 }, expected: 3000 },
          { name: 'subtracts minutes', startMs: 120000, duration: { minutes: 1 }, expected: 60000 },
          { name: 'subtracts hours', startMs: 7200000, duration: { hours: 1 }, expected: 3600000 },
          { name: 'subtracts days', startMs: 172800000, duration: { days: 1 }, expected: 86400000 },
          { name: 'subtracts weeks', startMs: 1209600000, duration: { weeks: 1 }, expected: 604800000 },
          { name: 'subtracts months', startMs: 2592001000, duration: { months: 1 }, expected: 1000 },
          { name: 'subtracts quarters', startMs: 7776001000, duration: { quarters: 1 }, expected: 1000 },
          { name: 'subtracts years', startMs: 31536001000, duration: { years: 1 }, expected: 1000 },
          { name: 'handles empty duration object', startMs: 1000, duration: {}, expected: 1000 },
          { name: 'handles undefined values', startMs: 1000 + 300000, duration: { hours: undefined, minutes: 5, seconds: undefined }, expected: 1000 },
          {
            name: 'handles multiple units simultaneously',
            startMs: 1000 + 5445500,
            duration: { hours: 1, minutes: 30, seconds: 45, milliseconds: 500 },
            expected: 1000,
          },
        ]

        it.each(testCases)(
          '$name',
          ({ startMs, duration, expected }) => {
            expect(mockDateTime(startMs).minus(duration).toMillis()).toBe(expected)
          }
        )
      }
    )

    // startOf / endOf work in local time: bun test runs with TZ=UTC, so local midnight is BASE_MS
    describe(
      'startOf method',
      () => {
        it.each<{ name: string, millis: number, unit: string, expected: number }>([
          // 2022-01-01T00:01:01.500Z → 2022-01-01T00:00:00.000Z
          { name: 'sets startOf day to midnight', millis: BASE_MS + 61500, unit: 'day', expected: BASE_MS },
          { name: 'leaves time unchanged for unsupported unit', millis: BASE_MS + 61500, unit: 'month', expected: BASE_MS + 61500 },
        ])(
          '$name',
          ({ millis, unit, expected }) => {
            expect(mockDateTime(millis).startOf(unit).toMillis()).toBe(expected)
          }
        )
      }
    )

    describe(
      'endOf method',
      () => {
        it.each<{ name: string, millis: number, unit: string, expected: number }>([
          // 2022-01-01T00:00:00.000Z → 2022-01-01T23:59:59.999Z
          { name: 'sets endOf day to 23:59:59.999', millis: BASE_MS, unit: 'day', expected: BASE_MS + 86399999 },
          { name: 'leaves time unchanged for unsupported unit', millis: BASE_MS + 61500, unit: 'month', expected: BASE_MS + 61500 },
        ])(
          '$name',
          ({ millis, unit, expected }) => {
            expect(mockDateTime(millis).endOf(unit).toMillis()).toBe(expected)
          }
        )
      }
    )

    describe(
      'toISO method',
      () => {
        it.each<{ name: string, millis: number, expected: string }>([
          { name: 'returns ISO string', millis: 0, expected: '1970-01-01T00:00:00.000Z' },
          { name: 'returns ISO string of a non-epoch instant with milliseconds', millis: BASE_MS + 61500, expected: '2022-01-01T00:01:01.500Z' },
        ])(
          '$name',
          ({ millis, expected }) => {
            expect(mockDateTime(millis).toISO()).toBe(expected)
          }
        )
      }
    )

    describe(
      'toSQL method',
      () => {
        it.each<{ name: string, options: { includeOffset?: boolean } | undefined, expected: string }>([
          { name: 'returns SQL-formatted string without options', options: undefined, expected: '1970-01-01 00:00:00.000' },
          { name: 'returns same result when includeOffset is true', options: { includeOffset: true }, expected: '1970-01-01 00:00:00.000' },
          { name: 'returns same result when includeOffset is false', options: { includeOffset: false }, expected: '1970-01-01 00:00:00.000' },
        ])(
          '$name',
          ({ options, expected }) => {
            expect(mockDateTime(0).toSQL(options)).toBe(expected)
          }
        )
      }
    )

    describe(
      'toFormat method',
      () => {
        // 2022-02-03T00:00:00.000Z
        const FEB_03_MS = 1643846400000

        const testCases = [
          { name: 'formats yyyy-MM-dd (fallback path)', millis: BASE_MS, format: 'yyyy-MM-dd', expected: '2022-01-01' },
          { name: 'formats MM/dd/yyyy', millis: FEB_03_MS, format: 'MM/dd/yyyy', expected: '02/03/2022' },
          { name: 'formats dd/MM/yyyy', millis: FEB_03_MS, format: 'dd/MM/yyyy', expected: '03/02/2022' },
          { name: 'falls back to yyyy-MM-dd for unsupported format', millis: BASE_MS, format: 'unsupported', expected: '2022-01-01' },
          { name: 'falls back to yyyy-MM-dd for empty format string', millis: BASE_MS, format: '', expected: '2022-01-01' },
        ]

        it.each(testCases)(
          '$name',
          ({ millis, format, expected }) => {
            expect(mockDateTime(millis).setZone('UTC').toFormat(format)).toBe(expected)
          }
        )
      }
    )

    describe(
      'setZone method',
      () => {
        it.each<{ name: string, zone: string }>([
          { name: 'America/New_York', zone: 'America/New_York' },
          { name: 'Asia/Tokyo', zone: 'Asia/Tokyo' },
        ])(
          'returns same instance for the timezone string $name',
          ({ zone }) => {
            const mock = mockDateTime(BASE_MS)
            expect(mock.setZone(zone)).toBe(mock)
            expect(mock.setZone(zone).toMillis()).toBe(BASE_MS)
          }
        )
      }
    )

    describe(
      'toUnixInteger method',
      () => {
        const testCases = [
          { name: 'floors partial seconds', millis: 1500, expected: 1 },
          { name: 'handles exact seconds', millis: 1000, expected: 1 },
          { name: 'handles zero', millis: 0, expected: 0 },
          { name: 'handles negative millis (pre-1970)', millis: -1500, expected: -2 },
        ]

        it.each(testCases)(
          '$name',
          ({ millis, expected }) => {
            expect(mockDateTime(millis).toUnixInteger()).toBe(expected)
          }
        )
      }
    )

    describe(
      'instance getters',
      () => {
        // 2022-01-01T00:01:01.500Z
        const NON_ZERO_TIME_MS = BASE_MS + 61500

        const testCases = [
          { name: 'returns correct year', millis: BASE_MS, getter: 'year' as const, expected: 2022 },
          { name: 'returns correct month', millis: BASE_MS, getter: 'month' as const, expected: 1 },
          { name: 'returns correct day', millis: BASE_MS, getter: 'day' as const, expected: 1 },
          { name: 'returns correct hour (zero)', millis: BASE_MS, getter: 'hour' as const, expected: 0 },
          { name: 'returns correct minute (zero)', millis: BASE_MS, getter: 'minute' as const, expected: 0 },
          { name: 'returns correct second (zero)', millis: BASE_MS, getter: 'second' as const, expected: 0 },
          { name: 'returns correct minute (non-zero)', millis: NON_ZERO_TIME_MS, getter: 'minute' as const, expected: 1 },
          { name: 'returns correct second (non-zero)', millis: NON_ZERO_TIME_MS, getter: 'second' as const, expected: 1 },
          // BASE_MS + 3h = 2022-01-01T03:00:00.000Z
          { name: 'returns correct hour (non-zero)', millis: BASE_MS + 3 * 3600000, getter: 'hour' as const, expected: 3 },
        ]

        it.each(testCases)(
          '$name',
          ({ millis, getter, expected }) => {
            expect(mockDateTime(millis)[getter]).toBe(expected)
          }
        )
      }
    )

    describe(
      'integration',
      () => {
        it.each<{ name: string, act: () => unknown, expected: unknown }>([
          { name: 'chains plus operations correctly', act: () => mockDateTime(1000).plus({ hours: 1 }).plus({ minutes: 30 }).toMillis(), expected: 1000 + 3600000 + 1800000 },
          { name: 'chains plus and format correctly', act: () => mockDateTime(BASE_MS).plus({ days: 5 }).plus({ hours: 12 }).setZone('UTC').toFormat('yyyy-MM-dd'), expected: '2022-01-06' },
          { name: 'plus then minus round-trip returns to original', act: () => mockDateTime(BASE_MS).plus({ days: 7 }).minus({ days: 7 }).toMillis(), expected: BASE_MS },
          { name: 'chains minus operations correctly', act: () => mockDateTime(BASE_MS).minus({ hours: 1 }).minus({ minutes: 30 }).toMillis(), expected: BASE_MS - 3600000 - 1800000 },
        ])(
          '$name',
          ({ act, expected }) => {
            expect(act()).toBe(expected)
          }
        )

        it.each<{ name: string, startMs: number, method: 'plus' | 'minus', duration: DurationObjectUnits, expected: number }>([
          { name: 'plus operations are immutable', startMs: 1000, method: 'plus', duration: { seconds: 30 }, expected: 31000 },
          { name: 'minus operations are immutable', startMs: BASE_MS, method: 'minus', duration: { seconds: 30 }, expected: BASE_MS - 30000 },
        ])(
          '$name',
          ({ startMs, method, duration, expected }) => {
            const original = mockDateTime(startMs)
            const modified = original[method](duration)

            expect(original.toMillis()).toBe(startMs)
            expect(modified.toMillis()).toBe(expected)
          }
        )
      }
    )

    describe(
      'MockDateTime static methods',
      () => {
        // freeze the clock so local() and utc() return an exact value
        beforeEach(() => {
          setSystemTime(new Date(BASE_MS))
        })

        afterEach(() => {
          setSystemTime()
        })

        it.each<{ name: string, act: () => ReturnType<typeof mockDateTime>, expected: { isValid: boolean, sql: string | null } }>([
          { name: 'invalid returns an instance with isValid false and no SQL, like Luxon', act: () => MockDateTime.invalid('reason'), expected: { isValid: false, sql: null } },
          { name: 'fromISO of an unparseable string is invalid', act: () => MockDateTime.fromISO('not a date'), expected: { isValid: false, sql: null } },
          { name: 'a parsed date is valid', act: () => MockDateTime.fromMillis(0), expected: { isValid: true, sql: '1970-01-01 00:00:00.000' } },
        ])(
          '$name',
          ({ act, expected }) => {
            const vDateTime = act()
            expect({ isValid: vDateTime.isValid, sql: vDateTime.toSQL() }).toEqual(expected)
          }
        )

        it.each<{ name: string, act: () => ReturnType<typeof mockDateTime>, expected: number }>([
          { name: 'fromMillis returns correct datetime', act: () => MockDateTime.fromMillis(1000), expected: 1000 },
          { name: 'fromISO parses ISO string at epoch', act: () => MockDateTime.fromISO('1970-01-01T00:00:00.000Z'), expected: 0 },
          { name: 'fromISO parses non-epoch ISO string', act: () => MockDateTime.fromISO('2022-01-01T00:00:00.000Z'), expected: BASE_MS },
          // a SQL string without offset is parsed in local time, and bun test runs with TZ=UTC
          { name: 'fromSQL parses SQL string without zone option', act: () => MockDateTime.fromSQL('1970-01-01 00:00:00'), expected: 0 },
          { name: 'fromSQL parses SQL string with zone option', act: () => MockDateTime.fromSQL('1970-01-01 00:00:00', { zone: 'UTC' }), expected: 0 },
          { name: 'fromSeconds converts to milliseconds', act: () => MockDateTime.fromSeconds(1), expected: 1000 },
          { name: 'local returns a datetime at the current time', act: () => MockDateTime.local(), expected: BASE_MS },
          { name: 'utc returns a datetime at the current time', act: () => MockDateTime.utc(), expected: BASE_MS },
        ])(
          '$name',
          ({ act, expected }) => {
            expect(act().toMillis()).toBe(expected)
          }
        )
      }
    )

    describe(
      'createMockSettings',
      () => {
        it.each<{ name: string, input: Parameters<typeof createMockSettings>[0], expected: ReturnType<typeof createMockSettings> }>([
          { name: 'returns default UTC zone and en locale', input: undefined, expected: { defaultZone: { name: 'UTC' }, defaultLocale: 'en' } },
          { name: 'accepts custom zone and locale', input: { initialZone: 'Europe/London', initialLocale: 'fr' }, expected: { defaultZone: { name: 'Europe/London' }, defaultLocale: 'fr' } },
          { name: 'accepts empty string locale', input: { initialLocale: '' }, expected: { defaultZone: { name: 'UTC' }, defaultLocale: '' } },
          { name: 'accepts custom zone with default locale', input: { initialZone: 'Asia/Tokyo' }, expected: { defaultZone: { name: 'Asia/Tokyo' }, defaultLocale: 'en' } },
        ])(
          '$name',
          ({ input, expected }) => {
            expect(createMockSettings(input)).toEqual(expected)
          }
        )
      }
    )

    describe(
      'MockDateTimeClass constructor',
      () => {
        it(
          'can be instantiated directly',
          () => {
            const instance = new MockDateTimeClass()
            expect(instance).toBeInstanceOf(MockDateTimeClass)
          }
        )
      }
    )
  }
)
