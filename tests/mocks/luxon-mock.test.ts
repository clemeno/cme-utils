import { describe, expect, it } from 'bun:test'
import { mockDateTime, MockDateTime, createMockSettings, type DurationObjectUnits } from './luxon-mock.js'

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
          '%s',
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
          '%s',
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
          '%s',
          ({ startMs, duration, expected }) => {
            expect(mockDateTime(startMs).minus(duration).toMillis()).toBe(expected)
          }
        )
      }
    )

    describe(
      'startOf method',
      () => {
        it(
          'sets startOf day to midnight',
          () => {
            const result = mockDateTime(BASE_MS + 61500).startOf('day')
            expect(result.getHours()).toBe(0)
            expect(result.getMinutes()).toBe(0)
            expect(result.getSeconds()).toBe(0)
            expect(result.getMilliseconds()).toBe(0)
          }
        )

        it(
          'leaves time unchanged for unsupported unit',
          () => {
            const ms = BASE_MS + 61500
            expect(mockDateTime(ms).startOf('month').toMillis()).toBe(ms)
          }
        )
      }
    )

    describe(
      'endOf method',
      () => {
        it(
          'sets endOf day to 23:59:59.999',
          () => {
            const result = mockDateTime(BASE_MS).endOf('day')
            expect(result.getHours()).toBe(23)
            expect(result.getMinutes()).toBe(59)
            expect(result.getSeconds()).toBe(59)
            expect(result.getMilliseconds()).toBe(999)
          }
        )

        it(
          'leaves time unchanged for unsupported unit',
          () => {
            const ms = BASE_MS + 61500
            expect(mockDateTime(ms).endOf('month').toMillis()).toBe(ms)
          }
        )
      }
    )

    describe(
      'toISO method',
      () => {
        it(
          'returns ISO string',
          () => {
            expect(mockDateTime(0).toISO()).toBe('1970-01-01T00:00:00.000Z')
          }
        )
      }
    )

    describe(
      'toSQL method',
      () => {
        it(
          'returns SQL-formatted string without options',
          () => {
            expect(mockDateTime(0).toSQL()).toBe('1970-01-01 00:00:00.000')
          }
        )

        it(
          'returns same result when includeOffset is true',
          () => {
            expect(mockDateTime(0).toSQL({ includeOffset: true })).toBe('1970-01-01 00:00:00.000')
          }
        )

        it(
          'returns same result when includeOffset is false',
          () => {
            expect(mockDateTime(0).toSQL({ includeOffset: false })).toBe('1970-01-01 00:00:00.000')
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
          '%s',
          ({ millis, format, expected }) => {
            expect(mockDateTime(millis).setZone('UTC').toFormat(format)).toBe(expected)
          }
        )
      }
    )

    describe(
      'setZone method',
      () => {
        it(
          'returns same instance for any timezone string',
          () => {
            const mock = mockDateTime(BASE_MS)
            expect(mock.setZone('America/New_York').toMillis()).toBe(BASE_MS)
            expect(mock.setZone('Asia/Tokyo').toMillis()).toBe(BASE_MS)
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
          '%s',
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
          '%s',
          ({ millis, getter, expected }) => {
            expect(mockDateTime(millis)[getter]).toBe(expected)
          }
        )
      }
    )

    describe(
      'integration',
      () => {
        it(
          'chains plus operations correctly',
          () => {
            const result = mockDateTime(1000)
              .plus({ hours: 1 })
              .plus({ minutes: 30 })

            expect(result.toMillis()).toBe(1000 + 3600000 + 1800000)
          }
        )

        it(
          'plus operations are immutable',
          () => {
            const original = mockDateTime(1000)
            const modified = original.plus({ seconds: 30 })

            expect(original.toMillis()).toBe(1000)
            expect(modified.toMillis()).toBe(31000)
          }
        )

        it(
          'chains plus and format correctly',
          () => {
            const result = mockDateTime(BASE_MS)
              .plus({ days: 5 })
              .plus({ hours: 12 })
              .setZone('UTC')
              .toFormat('yyyy-MM-dd')

            expect(result).toBe('2022-01-06')
          }
        )

        it(
          'plus then minus round-trip returns to original',
          () => {
            expect(mockDateTime(BASE_MS).plus({ days: 7 }).minus({ days: 7 }).toMillis()).toBe(BASE_MS)
          }
        )

        it(
          'chains minus operations correctly',
          () => {
            const result = mockDateTime(BASE_MS)
              .minus({ hours: 1 })
              .minus({ minutes: 30 })

            expect(result.toMillis()).toBe(BASE_MS - 3600000 - 1800000)
          }
        )

        it(
          'minus operations are immutable',
          () => {
            const original = mockDateTime(BASE_MS)
            const modified = original.minus({ seconds: 30 })

            expect(original.toMillis()).toBe(BASE_MS)
            expect(modified.toMillis()).toBe(BASE_MS - 30000)
          }
        )
      }
    )

    describe(
      'MockDateTime static methods',
      () => {
        it(
          'invalid returns null',
          () => {
            expect(MockDateTime.invalid('reason')).toBeNull()
          }
        )

        it(
          'fromMillis returns correct datetime',
          () => {
            expect(MockDateTime.fromMillis(1000).toMillis()).toBe(1000)
          }
        )

        it(
          'fromISO parses ISO string at epoch',
          () => {
            expect(MockDateTime.fromISO('1970-01-01T00:00:00.000Z').toMillis()).toBe(0)
          }
        )

        it(
          'fromISO parses non-epoch ISO string',
          () => {
            expect(MockDateTime.fromISO('2022-01-01T00:00:00.000Z').toMillis()).toBe(BASE_MS)
          }
        )

        it(
          'fromSQL parses SQL string without zone option',
          () => {
            expect(MockDateTime.fromSQL('1970-01-01 00:00:00').toMillis()).toBeGreaterThanOrEqual(0)
          }
        )

        it(
          'fromSQL parses SQL string with zone option',
          () => {
            expect(MockDateTime.fromSQL('1970-01-01 00:00:00', { zone: 'UTC' }).toMillis()).toBeGreaterThanOrEqual(0)
          }
        )

        it(
          'fromSeconds converts to milliseconds',
          () => {
            expect(MockDateTime.fromSeconds(1).toMillis()).toBe(1000)
          }
        )

        it(
          'local returns a datetime with positive millis',
          () => {
            expect(MockDateTime.local().toMillis()).toBeGreaterThan(0)
          }
        )

        it(
          'utc returns a datetime with positive millis',
          () => {
            expect(MockDateTime.utc().toMillis()).toBeGreaterThan(0)
          }
        )
      }
    )

    describe(
      'createMockSettings',
      () => {
        it(
          'returns default UTC zone and en locale',
          () => {
            const settings = createMockSettings()
            expect(settings.defaultZone.name).toBe('UTC')
            expect(settings.defaultLocale).toBe('en')
          }
        )

        it(
          'accepts custom zone and locale',
          () => {
            const settings = createMockSettings({ initialZone: 'Europe/London', initialLocale: 'fr' })
            expect(settings.defaultZone.name).toBe('Europe/London')
            expect(settings.defaultLocale).toBe('fr')
          }
        )

        it(
          'accepts empty string locale',
          () => {
            const settings = createMockSettings({ initialLocale: '' })
            expect(settings.defaultLocale).toBe('')
          }
        )

        it(
          'accepts custom zone with default locale',
          () => {
            const settings = createMockSettings({ initialZone: 'Asia/Tokyo' })
            expect(settings.defaultZone.name).toBe('Asia/Tokyo')
            expect(settings.defaultLocale).toBe('en')
          }
        )
      }
    )
  }
)
