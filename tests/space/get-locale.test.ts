import { afterEach, describe, expect, it, mock, spyOn } from 'bun:test'
import { GET_LOCALE } from '../../ts/space/get-locale.util.js'
import { createMockDocument } from '../mocks/space-mocks.js'
import { createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'GET_LOCALE',
  () => {
    const originalWindow = global.window

    // restore even when an assertion fails, so a mocked window or Intl can't leak into other tests
    afterEach(() => {
      global.window = originalWindow
      mock.restore()
    })

    it.each<{ name: string, defaultLocale: string | null, expected: string }>([
      { name: 'should return the locale from Settings', defaultLocale: 'en-US', expected: 'en-US' },
      { name: 'should fall back to the system locale when Settings has none (luxon starts with null)', defaultLocale: null, expected: 'de-DE' },
      { name: 'should fall back to the system locale for an empty locale, as luxon does', defaultLocale: '', expected: 'de-DE' },
    ])(
      '$name, without touching the document',
      ({ defaultLocale, expected }) => {
        // the system locale, the one luxon formats with when no locale is set
        spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions').mockReturnValue({ locale: 'de-DE' } as Intl.ResolvedDateTimeFormatOptions)
        const mockDocument = createMockDocument()
        global.window = { document: mockDocument } as any

        const result = GET_LOCALE(createMockSettings({ initialLocale: defaultLocale }))

        expect(result).toBe(expected)
        expect(mockDocument.getGetAttributeCalls()).toEqual([])
        expect(mockDocument.getSetAttributeCalls()).toEqual([])
      }
    )
  }
)
