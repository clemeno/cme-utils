import { afterEach, describe, expect, it } from 'bun:test'
import { DateTime, Settings } from 'luxon'
import { FROM_UNIX_TO_LOCAL_TT } from '../../ts/time/from-unix-to-local-tt.util.js'

describe(
  'FROM_UNIX_TO_LOCAL_TT',
  () => {
    const { defaultLocale, defaultZone } = Settings

    // luxon Settings is global: restore it so the pinned locale and zone can't leak into other tests
    afterEach(() => {
      Settings.defaultLocale = defaultLocale
      Settings.defaultZone = defaultZone
    })

    const testCases: Array<{ name: string, unix: number, expected: string }> = [
      { name: 'formats as the local time to the second (TT) in en-US, Europe/Paris', unix: 1710513045, expected: '15:30:45' },
    ]

    it.each(testCases)(
      '$name',
      ({ unix, expected }) => {
        Settings.defaultLocale = 'en-US'
        Settings.defaultZone = 'Europe/Paris'
        expect(FROM_UNIX_TO_LOCAL_TT({ DateTime, Settings, unix })).toBe(expected)
      }
    )
  }
)
