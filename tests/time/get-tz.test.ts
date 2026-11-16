import { afterEach, describe, expect, it } from 'bun:test'
import { GET_TZ } from '../../ts/time/get-tz.util.js'
import { createMockSettings } from '../mocks/luxon-mock.js'
import { createMockDocument } from '../mocks/space-mocks.js'

describe(
  'GET_TZ',
  () => {
    const originalWindow = global.window

    // restore even when an assertion fails, so a mocked window can't leak into other tests
    afterEach(() => {
      global.window = originalWindow
    })

    it.each<{ name: string, zone: string, expected: string }>([
      { name: 'Europe/Paris', zone: 'Europe/Paris', expected: 'Europe/Paris' },
      { name: 'UTC', zone: 'UTC', expected: 'UTC' },
    ])(
      'should return the zone name of Settings ($name), without touching the document',
      ({ zone, expected }) => {
        const mockDocument = createMockDocument()
        global.window = { document: mockDocument } as any

        const result = GET_TZ(createMockSettings({ initialZone: zone }))

        expect(result).toBe(expected)
        expect(mockDocument.getGetAttributeCalls()).toEqual([])
        expect(mockDocument.getSetAttributeCalls()).toEqual([])
      }
    )
  }
)
