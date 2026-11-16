import { afterEach, describe, expect, it } from 'bun:test'
import { DateTime, Settings } from 'luxon'
import { FROM_UNIX_TO_LOCAL_FORMAT } from '../../ts/time/from-unix-to-local-format.util.js'

describe(
  'FROM_UNIX_TO_LOCAL_FORMAT',
  () => {
    const { defaultLocale, defaultZone } = Settings

    // luxon Settings is global: restore it so the pinned locale and zone can't leak into other tests
    afterEach(() => {
      Settings.defaultLocale = defaultLocale
      Settings.defaultZone = defaultZone
    })

    const testCases: Array<{ name: string, zone: string, unix: number, format?: string, expected: string }> = [
      { name: 'formats in UTC', zone: 'UTC', unix: 0, format: 'yyyy-MM-dd HH:mm', expected: '1970-01-01 00:00' },
      { name: 'formats in Asia/Tokyo', zone: 'Asia/Tokyo', unix: 0, format: 'yyyy-MM-dd HH:mm', expected: '1970-01-01 09:00' },
      { name: 'defaults to the local date, time, milliseconds and zone (D TT.SSS z)', zone: 'Asia/Tokyo', unix: 0, expected: '1/1/1970 09:00:00.000 Asia/Tokyo' },
      { name: 'returns an empty string when unix is not numeric', zone: 'UTC', unix: NaN, format: 'yyyy-MM-dd', expected: '' },
    ]

    it.each(testCases)(
      '$name',
      ({ zone, unix, format, expected }) => {
        Settings.defaultLocale = 'en-US'
        Settings.defaultZone = zone
        expect(FROM_UNIX_TO_LOCAL_FORMAT({ DateTime, Settings, unix, format })).toBe(expected)
      }
    )
  }
)
