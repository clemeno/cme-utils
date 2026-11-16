import { afterEach, describe, expect, it } from 'bun:test'
import { Settings } from 'luxon'
import { SET_TZ } from '../../ts/time/set-tz.util.js'
import { createMockDocument } from '../mocks/space-mocks.js'

describe(
  'SET_TZ',
  () => {
    const originalZone = Settings.defaultZone
    const originalWindow = global.window

    // luxon Settings and the window are global: restore them so a zone or a mocked window can't leak into other tests
    afterEach(() => {
      Settings.defaultZone = originalZone
      global.window = originalWindow
    })

    it.each<{ name: string, tz: string, expected: string }>([
      { name: 'sets the zone of luxon Settings', tz: 'Asia/Tokyo', expected: 'Asia/Tokyo' },
      { name: 'falls back to UTC when tz is empty', tz: '', expected: 'UTC' },
    ])(
      '$name, and writes it to the document',
      ({ tz, expected }) => {
        const mockDocument = createMockDocument()
        global.window = { document: mockDocument } as any

        SET_TZ({ Settings, tz })

        expect(Settings.defaultZone.name).toBe(expected)
        expect(mockDocument.getSetAttributeCalls()).toEqual([['tz', expected]])
      }
    )
  }
)
