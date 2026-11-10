import { describe, expect, it } from 'bun:test'
import { TO_LOCAL_NUMBER } from '../../ts/number/to-local-number.util.js'
import { createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'TO_LOCAL_NUMBER',
  () => {
    const formatTestCases: Array<{ name: string, input: unknown, locale: string, expected: string }> = [
      { name: 'large number with en-US locale', input: 1234567.89, locale: 'en-US', expected: '1,234,567.89' },
      { name: 'small integer', input: 123, locale: 'en-US', expected: '123' },
      { name: 'zero', input: 0, locale: 'en-US', expected: '0' },
      { name: 'negative decimal', input: -123.456, locale: 'en-US', expected: '-123.456' },
      { name: 'large string number', input: '1234567.89', locale: 'en-US', expected: '1,234,567.89' },
      { name: 'small string number', input: '123', locale: 'en-US', expected: '123' },
      { name: 'large number with fr-FR locale', input: 1234567.89, locale: 'fr-FR', expected: '1\u202f234\u202f567,89' },
      { name: 'large number with de-DE locale', input: 1234567.89, locale: 'de-DE', expected: '1.234.567,89' },
    ]

    it.each(formatTestCases)(
      '$name',
      ({ input, locale, expected }) => {
        expect(TO_LOCAL_NUMBER({ Settings: createMockSettings({ initialLocale: locale }), x: input })).toBe(expected)
      }
    )

    const nonNumericTestCases: Array<{ name: string, input: unknown, expected: string }> = [
      { name: 'non-numeric string', input: 'abc', expected: '' },
      { name: 'null', input: null, expected: '' },
      { name: 'undefined', input: undefined, expected: '' },
      { name: 'object', input: {}, expected: '' },
      { name: 'array', input: [], expected: '' },
      { name: 'NaN', input: NaN, expected: '' },
      { name: 'Infinity', input: Infinity, expected: '\u221e' },
      { name: '-Infinity', input: -Infinity, expected: '-\u221e' },
    ]

    it.each(nonNumericTestCases)(
      '$name -> returns expected string',
      ({ input, expected }) => {
        const mockSettings = createMockSettings({ initialLocale: 'en-US' })
        expect(TO_LOCAL_NUMBER({ Settings: mockSettings, x: input })).toBe(expected)
      }
    )
  }
)
