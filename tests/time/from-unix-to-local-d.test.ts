import { afterEach, describe, expect, it } from 'bun:test'
import { DateTime, Settings } from 'luxon'
import { FROM_UNIX_TO_LOCAL_D } from '../../ts/time/from-unix-to-local-d.util.js'

describe(
  'FROM_UNIX_TO_LOCAL_D',
  () => {
    const { defaultLocale, defaultZone } = Settings

    // luxon Settings is global: restore it so the pinned locale and zone can't leak into other tests
    afterEach(() => {
      Settings.defaultLocale = defaultLocale
      Settings.defaultZone = defaultZone
    })

    const testCases: Array<{ name: string, unix: number, expected: string }> = [
      { name: 'formats as the local date (D) in en-US, Europe/Paris', unix: 1710513045, expected: '3/15/2024' },
    ]

    it.each(testCases)(
      '$name',
      ({ unix, expected }) => {
        Settings.defaultLocale = 'en-US'
        Settings.defaultZone = 'Europe/Paris'
        expect(FROM_UNIX_TO_LOCAL_D({ DateTime, Settings, unix })).toBe(expected)
      }
    )
  }
)
