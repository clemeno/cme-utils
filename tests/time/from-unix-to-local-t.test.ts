import { afterEach, describe, expect, it } from 'bun:test'
import { DateTime, Settings } from 'luxon'
import { FROM_UNIX_TO_LOCAL_T } from '../../ts/time/from-unix-to-local-t.util.js'

describe(
  'FROM_UNIX_TO_LOCAL_T',
  () => {
    const { defaultLocale, defaultZone } = Settings

    // luxon Settings is global: restore it so the pinned locale and zone can't leak into other tests
    afterEach(() => {
      Settings.defaultLocale = defaultLocale
      Settings.defaultZone = defaultZone
    })

    const testCases: Array<{ name: string, unix: number, expected: string }> = [
      { name: 'formats as the local time (T) in en-US, Europe/Paris', unix: 1710513045, expected: '15:30' },
    ]

    it.each(testCases)(
      '$name',
      ({ unix, expected }) => {
        Settings.defaultLocale = 'en-US'
        Settings.defaultZone = 'Europe/Paris'
        expect(FROM_UNIX_TO_LOCAL_T({ DateTime, Settings, unix })).toBe(expected)
      }
    )
  }
)
