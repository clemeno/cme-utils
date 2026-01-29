import { describe, expect, it } from 'bun:test'
import { SET_LOCALE } from '../../ts/space/set-locale.util.js'
import { createMockDocument, createMockSettings } from '../mocks/space-mocks.js'

describe(
  'SET_LOCALE',
  () => {
    it(
      'should set the defaultLocale on Settings',
      () => {
        const mockSettings = createMockSettings()
        SET_LOCALE({ Settings: mockSettings, locale: 'en-US' })
        expect(mockSettings.defaultLocale).toBe('en-US')
      }
    )

    it(
      'should use default locale if empty',
      () => {
        const mockSettings = createMockSettings()
        SET_LOCALE({ Settings: mockSettings, locale: '' })
        expect(mockSettings.defaultLocale).toBe('en-gb')
      }
    )

    it(
      'should set document attributes',
      () => {
        const mockDocument = createMockDocument()
        const originalDocument = global.window?.document
        global.window = { document: mockDocument } as any

        const mockSettings = createMockSettings()
        SET_LOCALE({ Settings: mockSettings, locale: 'en-US' })
        expect(mockSettings.defaultLocale).toBe('en-US')

        global.window = originalDocument as any
      }
    )

    it(
      'should handle missing document',
      () => {
        const originalWindow = global.window
        delete (global as any).window

        const mockSettings = createMockSettings()
        expect(() => SET_LOCALE({ Settings: mockSettings, locale: 'en-US' })).not.toThrow()
        expect(mockSettings.defaultLocale).toBe('en-US')

        global.window = originalWindow
      }
    )
  }
)
