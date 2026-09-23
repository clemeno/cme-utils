import { afterEach, describe, expect, it } from 'bun:test'
import { SET_DOCUMENT_GEO_FROM_LOCALE } from '../../ts/space/set-document-geo-from-locale.util.js'
import { createMockDocument } from '../mocks/space-mocks.js'

describe(
  'SET_DOCUMENT_GEO_FROM_LOCALE',
  () => {
    const originalWindow = global.window

    // restore even when an assertion fails, so a broken case can't leak the mocked window into other tests
    afterEach(() => {
      global.window = originalWindow
    })

    it.each<{ name: string, locale: string, expected: Array<[string, string]> }>([
      { name: 'set the geo attribute from locale', locale: 'en-US', expected: [['geo', 'US']] },
      { name: 'handle locale with multiple parts', locale: 'zh-CN-Hans', expected: [['geo', 'CN-Hans']] },
      { name: 'handle locale without geo', locale: 'en', expected: [['geo', '']] },
    ])(
      'should $name',
      ({ locale, expected }) => {
        const mockDocument = createMockDocument()
        global.window = { document: mockDocument } as any

        SET_DOCUMENT_GEO_FROM_LOCALE(locale)

        expect(mockDocument.getSetAttributeCalls()).toEqual(expected)
      }
    )

    it(
      'should handle missing document',
      () => {
        delete (global as any).window

        expect(() => SET_DOCUMENT_GEO_FROM_LOCALE('en-US')).not.toThrow()
      }
    )
  }
)
