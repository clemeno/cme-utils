import { describe, expect, it } from 'bun:test'
import { SET_DOCUMENT_LANG_FROM_LOCALE } from '../../ts/space/set-document-lang-from-locale.util.js'
import { createMockDocument } from '../mocks/space-mocks.js'

describe(
  'SET_DOCUMENT_LANG_FROM_LOCALE',
  () => {
    it(
      'should set the lang attribute from locale',
      () => {
        const mockDocument = createMockDocument()
        const originalDocument = global.window?.document
        global.window = { document: mockDocument } as any

        SET_DOCUMENT_LANG_FROM_LOCALE('en-US')

        expect(mockDocument.getSetAttributeCalls()).toEqual([['lang', 'en']])

        global.window = originalDocument as any
      }
    )

    it(
      'should handle locale with multiple parts',
      () => {
        const mockDocument = createMockDocument()
        const originalDocument = global.window?.document
        global.window = { document: mockDocument } as any

        SET_DOCUMENT_LANG_FROM_LOCALE('zh-CN-Hans')

        expect(mockDocument.getSetAttributeCalls()).toEqual([['lang', 'zh']])

        global.window = originalDocument as any
      }
    )

    it(
      'should handle simple locale',
      () => {
        const mockDocument = createMockDocument()
        const originalDocument = global.window?.document
        global.window = { document: mockDocument } as any

        SET_DOCUMENT_LANG_FROM_LOCALE('fr')

        expect(mockDocument.getSetAttributeCalls()).toEqual([['lang', 'fr']])

        global.window = originalDocument as any
      }
    )

    it(
      'should handle missing document',
      () => {
        const originalWindow = global.window
        delete (global as any).window

        expect(() => SET_DOCUMENT_LANG_FROM_LOCALE('en-US')).not.toThrow()

        global.window = originalWindow
      }
    )
  }
)
