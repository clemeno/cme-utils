import { describe, expect, it } from 'bun:test'
import { FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT } from '../../ts/time/from-any-db-moment-to-sp-datetime-object.util.js'
import { MockDateTime } from '../mocks/luxon-mock.js'
import { NULL_DATE } from '../../ts/time/null-date.util.js'
import type { AppSpDate } from '../../ts/time/app-sp-date.js'

describe(
  'FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT',
  () => {
    // Build an instance that passes `instanceof MockDateTime` (the DateTimeClass)
    // and exposes the instance methods the util calls after setZone().
    class DateTimeSubInstance extends MockDateTime {
      setZone (_tz: string): this { return this }
      toSQL (_opts?: any): string { return '2023-01-01 00:00:00' }
      get zoneName (): string { return 'UTC' }
      get isValid (): boolean { return true }
    }

    it.each<{ name: string, from: unknown, expected: AppSpDate | null }>([
      {
        name: 'converts ISO string to sp datetime object',
        from: '2023-01-01 00:00:00',
        // the mock parses the SQL-like string as local time and renders it as UTC SQL
        expected: { date: new Date(2023, 0, 1).toISOString().replace('T', ' ').replace('Z', ''), timezone_type: 3, timezone: 'UTC' },
      },
      {
        name: 'returns null for NULL_DATE sentinel',
        from: NULL_DATE,
        expected: null,
      },
      {
        name: 'converts JS Date (instanceof Date) via fromMillis',
        from: new Date('2023-06-15T12:00:00.000Z'),
        expected: { date: '2023-06-15 12:00:00.000', timezone_type: 3, timezone: 'UTC' },
      },
      {
        name: 'converts numeric timestamp via fromMillis',
        from: 1686830400000,
        expected: { date: '2023-06-15 12:00:00.000', timezone_type: 3, timezone: 'UTC' },
      },
      {
        name: 'converts a DateTime instance (instanceof DateTimeClass) via setZone',
        from: new DateTimeSubInstance(),
        expected: { date: '2023-01-01 00:00:00', timezone_type: 3, timezone: 'UTC' },
      },
      { name: 'returns null for null input', from: null, expected: null },
      { name: 'returns null for undefined input', from: undefined, expected: null },
      { name: 'returns null for an empty string', from: '', expected: null },
      { name: 'returns null for an unparseable string (fromISO and fromSQL both invalid)', from: 'not a date', expected: null },
      { name: 'returns null for NaN', from: NaN, expected: null },
      { name: 'returns null for an unsupported type', from: {}, expected: null },
    ])(
      '$name',
      ({ from, expected }) => {
        const result = FROM_ANY_DB_MOMENT_TO_SP_DATETIME_OBJECT({
          DateTime: MockDateTime,
          from,
          dbTz: 'UTC',
        })
        expect(result).toEqual(expected)
      }
    )
  }
)
