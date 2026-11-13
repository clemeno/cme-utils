import { afterEach, describe, expect, it, mock, spyOn } from 'bun:test'
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
      mock.restore()
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

    it.each<{ name: string, defaultLocale: string | null }>([
      { name: 'should fall back to the system locale when Settings has none (luxon starts with null)', defaultLocale: null },
      { name: 'should fall back to the system locale for an empty locale, as luxon does', defaultLocale: '' },
    ])(
      '$name',
      ({ defaultLocale }) => {
        // the system locale, the one luxon formats with when no locale is set
        spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions').mockReturnValue({ locale: 'de-DE' } as Intl.ResolvedDateTimeFormatOptions)
        const mockDocument = createMockDocument({ getAttributeValue: '' })
        global.window = { document: mockDocument } as any

        const result = GET_LOCALE(createMockSettings({ initialLocale: defaultLocale }))

        expect(result).toBe('de-DE')
        expect(mockDocument.getSetAttributeCalls()).toEqual([['locale', 'de-DE']])
      }
    )
  }
)
