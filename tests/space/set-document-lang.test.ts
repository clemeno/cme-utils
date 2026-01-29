import { describe, expect, it } from 'bun:test'
import { SET_DOCUMENT_LANG } from '../../ts/space/set-document-lang.util.js'
import { createMockDocument } from '../mocks/space-mocks.js'

describe(
  'SET_DOCUMENT_LANG',
  () => {
    it(
      'should set the lang attribute on document',
      () => {
        const mockDocument = createMockDocument()
        const originalDocument = global.window?.document
        global.window = { document: mockDocument } as any

        SET_DOCUMENT_LANG('en')

        expect(mockDocument.getSetAttributeCalls()).toEqual([['lang', 'en']])

        global.window = originalDocument as any
      }
    )

    it(
      'should handle missing document',
      () => {
        const originalWindow = global.window
        delete (global as any).window

        expect(() => SET_DOCUMENT_LANG('en')).not.toThrow()

        global.window = originalWindow
      }
    )
  }
)
