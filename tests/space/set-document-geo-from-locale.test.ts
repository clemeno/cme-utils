import { describe, expect, it } from 'bun:test'
import { SET_DOCUMENT_GEO_FROM_LOCALE } from '../../ts/space/set-document-geo-from-locale.util.js'
import { createMockDocument } from '../mocks/space-mocks.js'

describe(
  'SET_DOCUMENT_GEO_FROM_LOCALE',
  () => {
    it(
      'should set the geo attribute from locale',
      () => {
        const mockDocument = createMockDocument()
        const originalDocument = global.window?.document
        global.window = { document: mockDocument } as any

        SET_DOCUMENT_GEO_FROM_LOCALE('en-US')

        expect(mockDocument.getSetAttributeCalls()).toEqual([['geo', 'US']])

        global.window = originalDocument as any
      }
    )

    it(
      'should handle locale with multiple parts',
      () => {
        const mockDocument = createMockDocument()
        const originalDocument = global.window?.document
        global.window = { document: mockDocument } as any

        SET_DOCUMENT_GEO_FROM_LOCALE('zh-CN-Hans')

        expect(mockDocument.getSetAttributeCalls()).toEqual([['geo', 'CN-Hans']])

        global.window = originalDocument as any
      }
    )

    it(
      'should handle locale without geo',
      () => {
        const mockDocument = createMockDocument()
        const originalDocument = global.window?.document
        global.window = { document: mockDocument } as any

        SET_DOCUMENT_GEO_FROM_LOCALE('en')

        expect(mockDocument.getSetAttributeCalls()).toEqual([['geo', '']])

        global.window = originalDocument as any
      }
    )

    it(
      'should handle missing document',
      () => {
        const originalWindow = global.window
        delete (global as any).window

        expect(() => SET_DOCUMENT_GEO_FROM_LOCALE('en-US')).not.toThrow()

        global.window = originalWindow
      }
    )
  }
)
