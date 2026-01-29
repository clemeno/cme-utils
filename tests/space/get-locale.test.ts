import { describe, expect, it } from 'bun:test'
import { GET_LOCALE } from '../../ts/space/get-locale.util.js'
import { createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'GET_LOCALE',
  () => {
    it(
      'should return the locale from Settings',
      () => {
        const mockSettings = createMockSettings({ initialZone: 'UTC', initialLocale: 'en-US' })
        const result = GET_LOCALE(mockSettings)
        expect(result).toBe('en-US')
      }
    )

    it(
      'should set document locale if different',
      () => {
        const mockDocument = {
          documentElement: {
            getAttribute: () => 'old-locale',
            setAttribute: () => {},
          },
        }
        const originalDocument = global.window?.document
        global.window = { document: mockDocument } as any

        const mockSettings = createMockSettings({ initialZone: 'UTC', initialLocale: 'en-US' })
        const result = GET_LOCALE(mockSettings)
        expect(result).toBe('en-US')

        global.window = originalDocument as any
      }
    )

    it(
      'should handle missing document',
      () => {
        const originalWindow = global.window
        delete (global as any).window

        const mockSettings = createMockSettings({ initialZone: 'UTC', initialLocale: 'en-US' })
        const result = GET_LOCALE(mockSettings)
        expect(result).toBe('en-US')

        global.window = originalWindow
      }
    )
  }
)
