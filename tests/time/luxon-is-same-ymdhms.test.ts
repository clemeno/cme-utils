import { describe, expect, it } from 'bun:test'
import { DateTime } from 'luxon'
import { LUXON_IS_SAME_YMDHMS } from '../../ts/time/luxon-is-same-ymdhms.util.js'

describe(
  'LUXON_IS_SAME_YMDHMS',
  () => {
    // each row names its zone, so the result holds whatever the default zone
    const testCases: Array<{ name: string, ma: DateTime, mb: DateTime, expected: boolean }> = [
      {
        name: 'same year, month, day, hour, minute, second',
        ma: DateTime.fromISO('2022-01-01T00:00:00.000Z', { zone: 'UTC' }),
        mb: DateTime.fromISO('2022-01-01T00:00:00.900Z', { zone: 'UTC' }),
        expected: true,
      },
      {
        name: 'different seconds',
        ma: DateTime.fromISO('2022-01-01T00:00:00Z', { zone: 'UTC' }),
        mb: DateTime.fromISO('2022-01-01T00:00:01Z', { zone: 'UTC' }),
        expected: false,
      },
      {
        name: 'same instant, read in Paris and in UTC',
        ma: DateTime.fromISO('2026-01-01T12:00:00Z', { zone: 'Europe/Paris' }),
        mb: DateTime.fromISO('2026-01-01T12:00:00Z', { zone: 'UTC' }),
        expected: false,
      },
      {
        name: 'same wall clock in Paris and in UTC',
        ma: DateTime.fromISO('2026-01-01T12:00:00', { zone: 'Europe/Paris' }),
        mb: DateTime.fromISO('2026-01-01T12:00:00', { zone: 'UTC' }),
        expected: true,
      },
    ]

    it.each(testCases)(
      '$name',
      ({ ma, mb, expected }) => {
        expect(LUXON_IS_SAME_YMDHMS({ ma, mb })).toBe(expected)
      }
    )
  }
)
