import { describe, expect, it } from 'bun:test'
import { SET_DOCUMENT_GEO } from '../../ts/space/set-document-geo.util.js'
import { createMockDocument } from '../mocks/space-mocks.js'

describe(
  'SET_DOCUMENT_GEO',
  () => {
    it(
      'should set the geo attribute on document',
      () => {
        const mockDocument = createMockDocument()
        const originalDocument = global.window?.document
        global.window = { document: mockDocument } as any

        SET_DOCUMENT_GEO('US')

        expect(mockDocument.getSetAttributeCalls()).toEqual([['geo', 'US']])

        global.window = originalDocument as any
      }
    )

    it(
      'should handle missing document',
      () => {
        const originalWindow = global.window
        delete (global as any).window

        expect(() => SET_DOCUMENT_GEO('US')).not.toThrow()

        global.window = originalWindow
      }
    )
  }
)
