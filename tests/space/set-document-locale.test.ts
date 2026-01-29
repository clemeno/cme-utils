import { describe, expect, it } from 'bun:test'
import { SET_DOCUMENT_LOCALE } from '../../ts/space/set-document-locale.util.js'
import { createMockDocument } from '../mocks/space-mocks.js'

describe(
  'SET_DOCUMENT_LOCALE',
  () => {
    it(
      'should set the locale attribute on document',
      () => {
        const mockDocument = createMockDocument()
        const originalDocument = global.window?.document
        global.window = { document: mockDocument } as any

        SET_DOCUMENT_LOCALE('en-US')

        expect(mockDocument.getSetAttributeCalls()).toEqual([['locale', 'en-US']])

        global.window = originalDocument as any
      }
    )

    it(
      'should handle missing document',
      () => {
        const originalWindow = global.window
        delete (global as any).window

        expect(() => SET_DOCUMENT_LOCALE('en-US')).not.toThrow()

        global.window = originalWindow
      }
    )
  }
)
