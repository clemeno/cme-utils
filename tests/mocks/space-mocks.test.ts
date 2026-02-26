import { describe, expect, it } from 'bun:test'
import { createMockDocument, createMockSettings } from './space-mocks.js'

describe(
  'Space Mocks',
  () => {
    describe(
      'createMockDocument',
      () => {
        it(
          'should create a mock document with documentElement',
          () => {
            const mock = createMockDocument()
            expect(mock.documentElement).toBeDefined()
            expect(typeof mock.documentElement.setAttribute).toBe('function')
          }
        )

        it(
          'should track setAttribute calls',
          () => {
            const mock = createMockDocument()
            mock.documentElement.setAttribute('lang', 'en')
            mock.documentElement.setAttribute('dir', 'ltr')

            const calls = mock.getSetAttributeCalls()
            expect(calls).toHaveLength(2)
            expect(calls[0]).toEqual(['lang', 'en'])
            expect(calls[1]).toEqual(['dir', 'ltr'])
          }
        )

        it(
          'should return empty calls array initially',
          () => {
            const mock = createMockDocument()
            expect(mock.getSetAttributeCalls()).toEqual([])
          }
        )

        it(
          'should track getAttribute calls and return getAttributeValue',
          () => {
            const mock = createMockDocument({ getAttributeValue: 'en' })
            const result = mock.documentElement.getAttribute('lang')
            expect(result).toBe('en')
            const calls = mock.getGetAttributeCalls()
            expect(calls).toHaveLength(1)
            expect(calls[0]).toBe('lang')
          }
        )

        it(
          'should return default empty string for getAttribute when no value provided',
          () => {
            const mock = createMockDocument()
            const result = mock.documentElement.getAttribute('lang')
            expect(result).toBe('')
            expect(mock.getGetAttributeCalls()).toEqual(['lang'])
          }
        )
      }
    )

    describe(
      'createMockSettings',
      () => {
        it(
          'should create a mock settings with default locale',
          () => {
            const mock = createMockSettings()
            expect(mock.defaultLocale).toBe('old')
          }
        )

        it(
          'should create a mock settings with custom locale',
          () => {
            const mock = createMockSettings('en-US')
            expect(mock.defaultLocale).toBe('en-US')
          }
        )

        it(
          'should create a mock settings with empty string locale',
          () => {
            const mock = createMockSettings('')
            expect(mock.defaultLocale).toBe('')
          }
        )
      }
    )
  }
)
