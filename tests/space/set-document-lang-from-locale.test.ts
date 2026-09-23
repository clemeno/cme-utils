import { afterEach, describe, expect, it } from 'bun:test'
import { SET_DOCUMENT_LANG_FROM_LOCALE } from '../../ts/space/set-document-lang-from-locale.util.js'
import { createMockDocument } from '../mocks/space-mocks.js'

describe(
  'SET_DOCUMENT_LANG_FROM_LOCALE',
  () => {
    const originalWindow = global.window

    // restore even when an assertion fails, so a mocked or deleted window can't leak into other tests
    afterEach(() => {
      global.window = originalWindow
    })

    it.each<{ name: string, input: string, expected: Array<[string, string]> }>([
      { name: 'should set the lang attribute from locale', input: 'en-US', expected: [['lang', 'en']] },
      { name: 'should handle locale with multiple parts', input: 'zh-CN-Hans', expected: [['lang', 'zh']] },
      { name: 'should handle simple locale', input: 'fr', expected: [['lang', 'fr']] },
    ])(
      '$name',
      ({ input, expected }) => {
        const mockDocument = createMockDocument()
        global.window = { document: mockDocument } as any

        SET_DOCUMENT_LANG_FROM_LOCALE(input)

        expect(mockDocument.getSetAttributeCalls()).toEqual(expected)
      }
    )

    it(
      'should handle missing document',
      () => {
        delete (global as any).window

        expect(() => SET_DOCUMENT_LANG_FROM_LOCALE('en-US')).not.toThrow()
      }
    )
  }
)
