import { describe, expect, it } from 'bun:test'
import { GET_GEO } from '../../ts/space/get-geo.util.js'
import { createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'GET_GEO',
  () => {
    const testCases = [
      {
        name: 'geo from Settings locale',
        input: createMockSettings({ initialZone: 'UTC', initialLocale: 'en-US' }),
        expected: 'US',
      },
      {
        name: 'locale with multiple parts',
        input: createMockSettings({ initialZone: 'UTC', initialLocale: 'zh-CN-Hans' }),
        expected: 'CN-Hans',
      },
      {
        name: 'locale without geo',
        input: createMockSettings({ initialZone: 'UTC', initialLocale: 'en' }),
        expected: '',
      },
    ]

    it.each(testCases)(
      'should return the $name',
      ({ name, input, expected }) => {
        const result = GET_GEO(input)
        expect(result).toBe(expected)
      }
    )

    it(
      'should set document geo if different',
      () => {
        const mockDocument = {
          documentElement: {
            getAttribute: () => 'old-geo',
            setAttribute: () => {},
          },
        }
        // Mock window.document
        const originalDocument = global.window?.document
        global.window = { document: mockDocument } as any

        const mockSettings = createMockSettings({ initialZone: 'UTC', initialLocale: 'en-US' })
        const result = GET_GEO(mockSettings)
        expect(result).toBe('US')

        // Restore
        global.window = originalDocument as any
      }
    )

    it(
      'should handle missing document',
      () => {
        const originalWindow = global.window
        delete (global as any).window

        const mockSettings = createMockSettings({ initialZone: 'UTC', initialLocale: 'en-US' })
        const result = GET_GEO(mockSettings)
        expect(result).toBe('US')

        global.window = originalWindow
      }
    )
  }
)
