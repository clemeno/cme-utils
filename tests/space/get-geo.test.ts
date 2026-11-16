import { afterEach, describe, expect, it } from 'bun:test'
import { GET_GEO } from '../../ts/space/get-geo.util.js'
import { createMockDocument } from '../mocks/space-mocks.js'
import { createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'GET_GEO',
  () => {
    const originalWindow = global.window

    // restore even when an assertion fails, so a mocked window can't leak into other tests
    afterEach(() => {
      global.window = originalWindow
    })

    it.each<{ name: string, locale: string, expected: string }>([
      { name: 'US from en-US', locale: 'en-US', expected: 'US' },
      { name: 'every part after the language from zh-CN-Hans', locale: 'zh-CN-Hans', expected: 'CN-Hans' },
      { name: 'an empty geo from a locale without geo', locale: 'en', expected: '' },
    ])(
      '$name, without touching the document',
      ({ locale, expected }) => {
        const mockDocument = createMockDocument()
        global.window = { document: mockDocument } as any

        const result = GET_GEO(createMockSettings({ initialLocale: locale }))

        expect(result).toBe(expected)
        expect(mockDocument.getGetAttributeCalls()).toEqual([])
        expect(mockDocument.getSetAttributeCalls()).toEqual([])
      }
    )
  }
)
