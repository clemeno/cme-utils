import { describe, expect, it } from 'bun:test'
import { createMockDocument } from './space-mocks.js'

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
            expect(mock).toEqual({
              documentElement: {
                setAttribute: expect.any(Function),
                getAttribute: expect.any(Function),
              },
              getSetAttributeCalls: expect.any(Function),
              getGetAttributeCalls: expect.any(Function),
            })
          }
        )

        it.each<{ name: string, attributes: Array<[string, string]> }>([
          { name: 'should return empty calls array initially', attributes: [] },
          { name: 'should track setAttribute calls', attributes: [['lang', 'en'], ['dir', 'ltr']] },
        ])(
          '$name',
          ({ attributes }) => {
            const mock = createMockDocument()
            for (const inAttribute of attributes) {
              mock.documentElement.setAttribute(...inAttribute)
            }
            expect(mock.getSetAttributeCalls()).toEqual(attributes)
          }
        )

        it.each<{ name: string, options: Parameters<typeof createMockDocument>[0], expected: string }>([
          { name: 'should track getAttribute calls and return getAttributeValue', options: { getAttributeValue: 'en' }, expected: 'en' },
          { name: 'should return default empty string for getAttribute when no value provided', options: undefined, expected: '' },
        ])(
          '$name',
          ({ options, expected }) => {
            const mock = createMockDocument(options)
            const result = mock.documentElement.getAttribute('lang')
            expect(result).toBe(expected)
            expect(mock.getGetAttributeCalls()).toEqual(['lang'])
          }
        )
      }
    )
  }
)
