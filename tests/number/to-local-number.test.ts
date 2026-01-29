import { describe, expect, it } from 'bun:test'
import { TO_LOCAL_NUMBER } from '../../ts/number/to-local-number.util.js'

describe(
  'TO_LOCAL_NUMBER',
  () => {
    const formatTestCases = [
      { name: 'large number', input: 1234567.89, expected: '1 234 567,89' },
      { name: 'small integer', input: 123, expected: '123' },
      { name: 'zero', input: 0, expected: '0' },
      { name: 'negative decimal', input: -123.456, expected: '-123,456' },
    ]

    it.each(formatTestCases)(
      'should format $name according to locale',
      ({ input, expected }) => {
        const mockSettings = { locale: 'en-US' }
        expect(TO_LOCAL_NUMBER({ Settings: mockSettings, x: input })).toBe(expected)
      }
    )

    const stringTestCases = [
      { name: 'large string number', input: '1234567.89', expected: '1 234 567,89' },
      { name: 'small string number', input: '123', expected: '123' },
    ]

    it.each(stringTestCases)(
      'should handle $name',
      ({ input, expected }) => {
        const mockSettings = { locale: 'en-US' }
        expect(TO_LOCAL_NUMBER({ Settings: mockSettings, x: input })).toBe(expected)
      }
    )

    const nonNumericTestCases = [
      { name: 'non-numeric string', input: 'abc' },
      { name: 'null', input: null },
      { name: 'undefined', input: undefined },
      { name: 'object', input: {} },
      { name: 'array', input: [] },
    ]

    it.each(nonNumericTestCases)(
      'should return empty string for $name',
      ({ input }) => {
        const mockSettings = { locale: 'en-US' }
        expect(TO_LOCAL_NUMBER({ Settings: mockSettings, x: input })).toBe('')
      }
    )

    it(
      'should handle different locales',
      () => {
        const frenchSettings = { locale: 'fr-FR' }
        const germanSettings = { locale: 'de-DE' }

        expect(TO_LOCAL_NUMBER({ Settings: frenchSettings, x: 1234567.89 })).toBe('1 234 567,89')
        expect(TO_LOCAL_NUMBER({ Settings: germanSettings, x: 1234567.89 })).toBe('1 234 567,89')
      }
    )

    it(
      'should handle edge cases',
      () => {
        const mockSettings = { locale: 'en-US' }

        expect(TO_LOCAL_NUMBER({ Settings: mockSettings, x: NaN })).toBe('')
        expect(TO_LOCAL_NUMBER({ Settings: mockSettings, x: Infinity })).toBe('∞')
        expect(TO_LOCAL_NUMBER({ Settings: mockSettings, x: -Infinity })).toBe('-∞')
      }
    )

    it(
      'should return a string',
      () => {
        const mockSettings = { locale: 'en-US' }
        const result = TO_LOCAL_NUMBER({ Settings: mockSettings, x: 1234567.89 })
        expect(typeof result).toBe('string')
      }
    )
  }
)
