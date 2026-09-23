import { describe, expect, it } from 'bun:test'
import type { AppSpDate } from '../../ts/time/app-sp-date.js'
import { FROM_SP_DATETIME_OBJECT_TO_LUXON } from '../../ts/time/from-sp-datetime-object-to-luxon.util.js'

describe(
  'FROM_SP_DATETIME_OBJECT_TO_LUXON',
  () => {
    // records what the util asks Luxon for, so the test checks the call, not a mock's parsing
    const DateTime = {
      // eslint-disable-next-line max-params -- mirrors Luxon's DateTime.fromSQL(text, opts) signature
      fromSQL: (sql: string, opts: { zone: string }): unknown => ({ fromSQL: [sql, opts] }),
      invalid: (reason: string): unknown => ({ invalid: reason }),
    }

    const testCases: Array<{ name: string, spDate: AppSpDate | null | undefined, expected: Record<string, unknown> }> = [
      { name: 'sp date → DateTime.fromSQL(date, { zone: timezone })', spDate: { date: '2023-01-01 12:34:56.000000', timezone_type: 3, timezone: 'Europe/Paris' }, expected: { fromSQL: ['2023-01-01 12:34:56.000000', { zone: 'Europe/Paris' }] } },
      { name: 'UTC offset timezone is passed as zone', spDate: { date: '2023-06-15 08:00:00.000000', timezone_type: 1, timezone: '+02:00' }, expected: { fromSQL: ['2023-06-15 08:00:00.000000', { zone: '+02:00' }] } },
      { name: 'null sp date → DateTime.invalid("i")', spDate: null, expected: { invalid: 'i' } },
      { name: 'undefined sp date → DateTime.invalid("i")', spDate: undefined, expected: { invalid: 'i' } },
    ]

    it.each(testCases)(
      '$name',
      ({ spDate, expected }) => {
        expect(FROM_SP_DATETIME_OBJECT_TO_LUXON<typeof DateTime, Record<string, unknown>>({ DateTime, spDate: spDate as AppSpDate })).toEqual(expected)
      }
    )
  }
)
