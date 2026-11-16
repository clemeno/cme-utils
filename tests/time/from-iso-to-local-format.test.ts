import { afterEach, describe, expect, it } from 'bun:test'
import { DateTime, Settings } from 'luxon'
import { FROM_ISO_TO_LOCAL_FORMAT } from '../../ts/time/from-iso-to-local-format.util.js'

describe(
  'FROM_ISO_TO_LOCAL_FORMAT',
  () => {
    const { defaultLocale, defaultZone } = Settings

    // luxon Settings is global: restore it so the pinned locale and zone can't leak into other tests
    afterEach(() => {
      Settings.defaultLocale = defaultLocale
      Settings.defaultZone = defaultZone
    })

    const testCases: Array<{ name: string, zone: string, iso: string, format?: string, expected: string }> = [
      { name: 'formats in UTC', zone: 'UTC', iso: '1970-01-01T00:00:00Z', format: 'yyyy-MM-dd HH:mm', expected: '1970-01-01 00:00' },
      { name: 'formats in Asia/Tokyo', zone: 'Asia/Tokyo', iso: '1970-01-01T00:00:00Z', format: 'yyyy-MM-dd HH:mm', expected: '1970-01-01 09:00' },
      { name: 'defaults to the local date, time, milliseconds and zone (D TT.SSS z)', zone: 'Asia/Tokyo', iso: '1970-01-01T00:00:00Z', expected: '1/1/1970 09:00:00.000 Asia/Tokyo' },
      { name: 'returns an empty string when iso is empty', zone: 'UTC', iso: '', format: 'yyyy-MM-dd', expected: '' },
      { name: 'returns an empty string when iso is not a date', zone: 'UTC', iso: 'not a date', format: 'yyyy-MM-dd', expected: '' },
    ]

    it.each(testCases)(
      '$name',
      ({ zone, iso, format, expected }) => {
        Settings.defaultLocale = 'en-US'
        Settings.defaultZone = zone
        expect(FROM_ISO_TO_LOCAL_FORMAT({ DateTime, Settings, iso, format })).toBe(expected)
      }
    )
  }
)
