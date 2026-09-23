import { afterEach, describe, expect, it } from 'bun:test'
import { SET_DOCUMENT_GEO } from '../../ts/space/set-document-geo.util.js'
import { createMockDocument } from '../mocks/space-mocks.js'

describe(
  'SET_DOCUMENT_GEO',
  () => {
    const originalWindow = global.window

    // restore even when an assertion fails, so a broken case can't leak the mocked window into other tests
    afterEach(() => {
      global.window = originalWindow
    })

    it(
      'should set the geo attribute on document',
      () => {
        const mockDocument = createMockDocument()
        global.window = { document: mockDocument } as any

        SET_DOCUMENT_GEO('US')

        expect(mockDocument.getSetAttributeCalls()).toEqual([['geo', 'US']])
      }
    )

    it(
      'should handle missing document',
      () => {
        delete (global as any).window

        expect(() => SET_DOCUMENT_GEO('US')).not.toThrow()
      }
    )
  }
)
