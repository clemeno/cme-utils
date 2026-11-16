import { afterEach, describe, expect, it } from 'bun:test'
import { DateTime, Settings } from 'luxon'
import { FROM_ISO_TO_LOCAL_D } from '../../ts/time/from-iso-to-local-d.util.js'

describe(
  'FROM_ISO_TO_LOCAL_D',
  () => {
    const { defaultLocale, defaultZone } = Settings

    // luxon Settings is global: restore it so the pinned locale and zone can't leak into other tests
    afterEach(() => {
      Settings.defaultLocale = defaultLocale
      Settings.defaultZone = defaultZone
    })

    const testCases: Array<{ name: string, iso: string, expected: string }> = [
      { name: 'formats as the local date (D) in en-US, Europe/Paris', iso: '2024-03-15T14:30:45.123Z', expected: '3/15/2024' },
    ]

    it.each(testCases)(
      '$name',
      ({ iso, expected }) => {
        Settings.defaultLocale = 'en-US'
        Settings.defaultZone = 'Europe/Paris'
        expect(FROM_ISO_TO_LOCAL_D({ DateTime, Settings, iso })).toBe(expected)
      }
    )
  }
)
