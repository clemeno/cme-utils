import { afterEach, describe, expect, it } from 'bun:test'
import { SET_LOCALE } from '../../ts/space/set-locale.util.js'
import { createMockDocument, createMockSettings } from '../mocks/space-mocks.js'

/** Exposes the given mock document through a global window. */
function installWindow (inDocument: ReturnType<typeof createMockDocument>): void {
  global.window = { document: inDocument } as any
}

/** Removes the global window so no document is reachable. */
function removeWindow (): void {
  delete (global as any).window
}

describe(
  'SET_LOCALE',
  () => {
    const originalWindow = global.window

    // restore even when an assertion fails, so a broken case can't leak a mocked window into other tests
    afterEach(() => {
      global.window = originalWindow
    })

    it.each<{
      name: string
      setup: typeof installWindow
      locale: string
      expected: string
      expectedSetAttributeCalls: Array<[string, string]>
    }>([
      { name: 'should set the defaultLocale on Settings', setup: installWindow, locale: 'fr-FR', expected: 'fr-FR', expectedSetAttributeCalls: [['locale', 'fr-FR'], ['lang', 'fr'], ['geo', 'FR']] },
      { name: 'should use default locale if empty', setup: installWindow, locale: '', expected: 'en-gb', expectedSetAttributeCalls: [['locale', 'en-gb'], ['lang', 'en'], ['geo', 'gb']] },
      { name: 'should set document attributes', setup: installWindow, locale: 'en-US', expected: 'en-US', expectedSetAttributeCalls: [['locale', 'en-US'], ['lang', 'en'], ['geo', 'US']] },
      { name: 'should set every part after the language as document geo', setup: installWindow, locale: 'zh-CN-Hans', expected: 'zh-CN-Hans', expectedSetAttributeCalls: [['locale', 'zh-CN-Hans'], ['lang', 'zh'], ['geo', 'CN-Hans']] },
      { name: 'should handle missing document', setup: removeWindow, locale: 'en-US', expected: 'en-US', expectedSetAttributeCalls: [] },
    ])(
      '$name',
      ({ setup, locale, expected, expectedSetAttributeCalls }) => {
        const mockDocument = createMockDocument()
        setup(mockDocument)

        const mockSettings = createMockSettings()
        expect(() => { SET_LOCALE({ Settings: mockSettings, locale }) }).not.toThrow()

        expect(mockSettings.defaultLocale).toBe(expected)
        expect(mockDocument.getSetAttributeCalls()).toEqual(expectedSetAttributeCalls)
      }
    )
  }
)
