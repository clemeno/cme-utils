import { afterEach, describe, expect, it } from 'bun:test'
import { GET_LOCALE } from '../../ts/space/get-locale.util.js'
import { createMockDocument } from '../mocks/space-mocks.js'
import { createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'GET_LOCALE',
  () => {
    const originalWindow = global.window

    // restore even when an assertion fails, so a mocked or deleted window can't leak into other tests
    afterEach(() => {
      global.window = originalWindow
    })

    it.each<{ name: string, setup: () => void }>([
      { name: 'should return the locale from Settings', setup: () => {} },
      { name: 'should handle missing document', setup: () => { delete (global as any).window } },
    ])(
      '$name',
      ({ setup }) => {
        setup()

        const mockSettings = createMockSettings({ initialZone: 'UTC', initialLocale: 'en-US' })
        const result = GET_LOCALE(mockSettings)
        expect(result).toBe('en-US')
      }
    )

    it.each<{ name: string, getAttributeValue: string, expectedSetAttributeCalls: Array<[string, string]> }>([
      { name: 'should set document locale if different', getAttributeValue: 'old-locale', expectedSetAttributeCalls: [['locale', 'en-US']] },
      { name: 'should not set document locale if already equal', getAttributeValue: 'en-US', expectedSetAttributeCalls: [] },
    ])(
      '$name',
      ({ getAttributeValue, expectedSetAttributeCalls }) => {
        const mockDocument = createMockDocument({ getAttributeValue })
        global.window = { document: mockDocument } as any

        const mockSettings = createMockSettings({ initialZone: 'UTC', initialLocale: 'en-US' })
        const result = GET_LOCALE(mockSettings)
        expect(result).toBe('en-US')
        expect(mockDocument.getGetAttributeCalls()).toEqual(['locale'])
        expect(mockDocument.getSetAttributeCalls()).toEqual(expectedSetAttributeCalls)
      }
    )
  }
)
