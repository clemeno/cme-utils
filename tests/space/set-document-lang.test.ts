import { afterEach, describe, expect, it } from 'bun:test'
import { SET_DOCUMENT_LANG } from '../../ts/space/set-document-lang.util.js'
import { createMockDocument } from '../mocks/space-mocks.js'

describe(
  'SET_DOCUMENT_LANG',
  () => {
    const originalWindow = global.window

    afterEach(() => {
      global.window = originalWindow
    })

    it(
      'should set the lang attribute on document',
      () => {
        const mockDocument = createMockDocument()
        global.window = { document: mockDocument } as any

        SET_DOCUMENT_LANG('en')

        expect(mockDocument.getSetAttributeCalls()).toEqual([['lang', 'en']])
      }
    )

    it(
      'should handle missing document',
      () => {
        delete (global as any).window

        expect(() => SET_DOCUMENT_LANG('en')).not.toThrow()
      }
    )
  }
)
