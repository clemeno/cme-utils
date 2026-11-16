import { afterEach, describe, expect, it } from 'bun:test'
import { DateTime, Settings } from 'luxon'
import { FROM_ISO_TO_LOCAL_T } from '../../ts/time/from-iso-to-local-t.util.js'

describe(
  'FROM_ISO_TO_LOCAL_T',
  () => {
    const { defaultLocale, defaultZone } = Settings

    // luxon Settings is global: restore it so the pinned locale and zone can't leak into other tests
    afterEach(() => {
      Settings.defaultLocale = defaultLocale
      Settings.defaultZone = defaultZone
    })

    const testCases: Array<{ name: string, iso: string, expected: string }> = [
      { name: 'formats as the local time (T) in en-US, Europe/Paris', iso: '2024-03-15T14:30:45.123Z', expected: '15:30' },
    ]

    it.each(testCases)(
      '$name',
      ({ iso, expected }) => {
        Settings.defaultLocale = 'en-US'
        Settings.defaultZone = 'Europe/Paris'
        expect(FROM_ISO_TO_LOCAL_T({ DateTime, Settings, iso })).toBe(expected)
      }
    )
  }
)
