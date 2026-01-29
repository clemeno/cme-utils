import { describe, expect, it } from 'bun:test'
import { GET_LANG } from '../../ts/space/get-lang.util.js'
import { createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'GET_LANG',
  () => {
    const testCases = [
      { input: createMockSettings({ initialZone: 'UTC', initialLocale: 'en-US' }), expected: 'en' },
      { input: createMockSettings({ initialZone: 'UTC', initialLocale: 'zh-CN-Hans' }), expected: 'zh' },
      { input: createMockSettings({ initialZone: 'UTC', initialLocale: 'fr' }), expected: 'fr' },
    ]

    it(
      'should return the correct lang from locale',
      () => {
        for (const { input, expected } of testCases) {
          expect(GET_LANG(input)).toBe(expected)
        }
      }
    )

    it(
      'should set document lang if different',
      () => {
        const mockDocument = {
          documentElement: {
            getAttribute: () => 'old-lang',
            setAttribute: () => {},
          },
        }
        const originalDocument = global.window?.document
        global.window = { document: mockDocument } as any

        const mockSettings = createMockSettings({ initialZone: 'UTC', initialLocale: 'en-US' })
        const result = GET_LANG(mockSettings)
        expect(result).toBe('en')

        global.window = originalDocument as any
      }
    )

    it(
      'should handle missing document',
      () => {
        const originalWindow = global.window
        delete (global as any).window

        const mockSettings = createMockSettings({ initialZone: 'UTC', initialLocale: 'en-US' })
        const result = GET_LANG(mockSettings)
        expect(result).toBe('en')

        global.window = originalWindow
      }
    )
  }
)
