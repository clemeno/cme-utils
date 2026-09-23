import { afterEach, describe, expect, it } from 'bun:test'
import { GET_GEO } from '../../ts/space/get-geo.util.js'
import { createMockDocument } from '../mocks/space-mocks.js'
import { createMockSettings } from '../mocks/luxon-mock.js'

/** Exposes the given mock document through a global window. */
function installWindow (inDocument: ReturnType<typeof createMockDocument>): void {
  global.window = { document: inDocument } as any
}

/** Removes the global window so no document is reachable. */
function removeWindow (): void {
  delete (global as any).window
}

describe(
  'GET_GEO',
  () => {
    const originalWindow = global.window

    // restore even when an assertion fails, so a broken case can't leak a mocked window into other tests
    afterEach(() => {
      global.window = originalWindow
    })

    it.each<{
      name: string
      setup: typeof installWindow
      getAttributeValue: string
      locale: string
      expected: string
      expectedSetAttributeCalls: Array<[string, string]>
    }>([
      { name: 'should return the geo from Settings locale', setup: installWindow, getAttributeValue: '', locale: 'en-US', expected: 'US', expectedSetAttributeCalls: [['locale', 'en-US'], ['geo', 'US']] },
      { name: 'should return the geo of a locale with multiple parts', setup: installWindow, getAttributeValue: '', locale: 'zh-CN-Hans', expected: 'CN-Hans', expectedSetAttributeCalls: [['locale', 'zh-CN-Hans'], ['geo', 'CN-Hans']] },
      { name: 'should return an empty geo for a locale without geo', setup: installWindow, getAttributeValue: '', locale: 'en', expected: '', expectedSetAttributeCalls: [['locale', 'en']] },
      { name: 'should set document geo if different', setup: installWindow, getAttributeValue: 'old-geo', locale: 'en-US', expected: 'US', expectedSetAttributeCalls: [['locale', 'en-US'], ['geo', 'US']] },
      { name: 'should not set document geo if already equal', setup: installWindow, getAttributeValue: 'US', locale: 'en-US', expected: 'US', expectedSetAttributeCalls: [['locale', 'en-US']] },
      { name: 'should handle missing document', setup: removeWindow, getAttributeValue: '', locale: 'en-US', expected: 'US', expectedSetAttributeCalls: [] },
    ])(
      '$name',
      ({ setup, getAttributeValue, locale, expected, expectedSetAttributeCalls }) => {
        const mockDocument = createMockDocument({ getAttributeValue })
        setup(mockDocument)

        const mockSettings = createMockSettings({ initialZone: 'UTC', initialLocale: locale })
        const result = GET_GEO(mockSettings)

        expect(result).toBe(expected)
        expect(mockDocument.getSetAttributeCalls()).toEqual(expectedSetAttributeCalls)
      }
    )
  }
)
