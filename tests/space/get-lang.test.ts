import { afterEach, describe, expect, it } from 'bun:test'
import { GET_LANG } from '../../ts/space/get-lang.util.js'
import { createMockDocument } from '../mocks/space-mocks.js'
import { createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'GET_LANG',
  () => {
    const originalWindow = global.window

    afterEach(() => {
      global.window = originalWindow
    })

    const testCases = [
      { name: 'en from en-US', input: createMockSettings({ initialZone: 'UTC', initialLocale: 'en-US' }), expected: 'en' },
      { name: 'zh from zh-CN-Hans', input: createMockSettings({ initialZone: 'UTC', initialLocale: 'zh-CN-Hans' }), expected: 'zh' },
      { name: 'fr from fr', input: createMockSettings({ initialZone: 'UTC', initialLocale: 'fr' }), expected: 'fr' },
    ]

    it.each(testCases)(
      'should return the correct lang ($name) and handle missing document',
      ({ input, expected }) => {
        delete (global as any).window

        expect(GET_LANG(input)).toBe(expected)
      }
    )

    it.each<{ name: string, getAttributeValue: string, expectedSetAttributeCalls: Array<[string, string]> }>([
      { name: 'should set document lang if different', getAttributeValue: 'old-lang', expectedSetAttributeCalls: [['locale', 'en-US'], ['lang', 'en']] },
      { name: 'should not set document lang if already equal', getAttributeValue: 'en', expectedSetAttributeCalls: [['locale', 'en-US']] },
    ])(
      '$name',
      ({ getAttributeValue, expectedSetAttributeCalls }) => {
        const mockDocument = createMockDocument({ getAttributeValue })
        global.window = { document: mockDocument } as any

        const mockSettings = createMockSettings({ initialZone: 'UTC', initialLocale: 'en-US' })
        const result = GET_LANG(mockSettings)
        expect(result).toBe('en')
        expect(mockDocument.getSetAttributeCalls()).toEqual(expectedSetAttributeCalls)
      }
    )
  }
)
