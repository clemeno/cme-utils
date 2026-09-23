import { afterEach, describe, expect, it } from 'bun:test'
import { SET_DOCUMENT_LOCALE } from '../../ts/space/set-document-locale.util.js'
import { createMockDocument } from '../mocks/space-mocks.js'

describe(
  'SET_DOCUMENT_LOCALE',
  () => {
    const originalWindow = global.window

    // restore even when an assertion fails, so a mocked or deleted window can't leak into other tests
    afterEach(() => {
      global.window = originalWindow
    })

    it(
      'should set the locale attribute on document',
      () => {
        const mockDocument = createMockDocument()
        global.window = { document: mockDocument } as any

        SET_DOCUMENT_LOCALE('en-US')

        expect(mockDocument.getSetAttributeCalls()).toEqual([['locale', 'en-US']])
      }
    )

    it(
      'should handle missing document',
      () => {
        delete (global as any).window

        expect(() => SET_DOCUMENT_LOCALE('en-US')).not.toThrow()
      }
    )
  }
)
