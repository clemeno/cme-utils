import { afterEach, describe, expect, it } from 'bun:test'
import { Settings } from 'luxon'
import { SET_TZ } from '../../ts/time/set-tz.util.js'

describe(
  'SET_TZ',
  () => {
    const originalZone = Settings.defaultZone

    // luxon Settings is global: restore it so a zone can't leak into other tests
    afterEach(() => {
      Settings.defaultZone = originalZone
    })

    it.each<{ name: string, tz: string, expected: string }>([
      { name: 'sets the zone of luxon Settings', tz: 'Asia/Tokyo', expected: 'Asia/Tokyo' },
      { name: 'falls back to UTC when tz is empty', tz: '', expected: 'UTC' },
    ])(
      '$name',
      ({ tz, expected }) => {
        SET_TZ({ Settings, tz })
        expect(Settings.defaultZone.name).toBe(expected)
      }
    )
  }
)
