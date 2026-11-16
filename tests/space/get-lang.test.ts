import { afterEach, describe, expect, it } from 'bun:test'
import { GET_LANG } from '../../ts/space/get-lang.util.js'
import { createMockDocument } from '../mocks/space-mocks.js'
import { createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'GET_LANG',
  () => {
    const originalWindow = global.window

    // restore even when an assertion fails, so a mocked window can't leak into other tests
    afterEach(() => {
      global.window = originalWindow
    })

    it.each<{ name: string, locale: string, expected: string }>([
      { name: 'en from en-US', locale: 'en-US', expected: 'en' },
      { name: 'zh from zh-CN-Hans', locale: 'zh-CN-Hans', expected: 'zh' },
      { name: 'fr from fr', locale: 'fr', expected: 'fr' },
    ])(
      '$name, without touching the document',
      ({ locale, expected }) => {
        const mockDocument = createMockDocument()
        global.window = { document: mockDocument } as any

        const result = GET_LANG(createMockSettings({ initialLocale: locale }))

        expect(result).toBe(expected)
        expect(mockDocument.getGetAttributeCalls()).toEqual([])
        expect(mockDocument.getSetAttributeCalls()).toEqual([])
      }
    )
  }
)
