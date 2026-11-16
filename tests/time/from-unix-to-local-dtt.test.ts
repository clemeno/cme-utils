import { afterEach, describe, expect, it } from 'bun:test'
import { DateTime, Settings } from 'luxon'
import { FROM_UNIX_TO_LOCAL_DTT } from '../../ts/time/from-unix-to-local-dtt.util.js'

describe(
  'FROM_UNIX_TO_LOCAL_DTT',
  () => {
    const { defaultLocale, defaultZone } = Settings

    // luxon Settings is global: restore it so the pinned locale and zone can't leak into other tests
    afterEach(() => {
      Settings.defaultLocale = defaultLocale
      Settings.defaultZone = defaultZone
    })

    const testCases: Array<{ name: string, unix: number, expected: string }> = [
      { name: 'formats as the local date and time to the second (D TT) in en-US, Europe/Paris', unix: 1710513045, expected: '3/15/2024 15:30:45' },
    ]

    it.each(testCases)(
      '$name',
      ({ unix, expected }) => {
        Settings.defaultLocale = 'en-US'
        Settings.defaultZone = 'Europe/Paris'
        expect(FROM_UNIX_TO_LOCAL_DTT({ DateTime, Settings, unix })).toBe(expected)
      }
    )
  }
)
