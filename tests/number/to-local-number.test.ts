import { describe, expect, it } from 'bun:test'
import { TO_LOCAL_NUMBER } from '../../ts/number/to-local-number.util.js'

describe(
  'TO_LOCAL_NUMBER',
  () => {
    const formatTestCases: Array<{ name: string, input: unknown, settings: { locale: string }, expected: string }> = [
      { name: 'large number with en-US locale', input: 1234567.89, settings: { locale: 'en-US' }, expected: '1 234 567,89' },
      { name: 'small integer', input: 123, settings: { locale: 'en-US' }, expected: '123' },
      { name: 'zero', input: 0, settings: { locale: 'en-US' }, expected: '0' },
      { name: 'negative decimal', input: -123.456, settings: { locale: 'en-US' }, expected: '-123,456' },
      { name: 'large string number', input: '1234567.89', settings: { locale: 'en-US' }, expected: '1 234 567,89' },
      { name: 'small string number', input: '123', settings: { locale: 'en-US' }, expected: '123' },
      { name: 'large number with fr-FR locale', input: 1234567.89, settings: { locale: 'fr-FR' }, expected: '1 234 567,89' },
      { name: 'large number with de-DE locale', input: 1234567.89, settings: { locale: 'de-DE' }, expected: '1 234 567,89' },
    ]

    it.each(formatTestCases)(
      '$name',
      ({ input, settings, expected }) => {
        expect(TO_LOCAL_NUMBER({ Settings: settings, x: input })).toBe(expected)
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
        const mockSettings = { locale: 'en-US' }
        expect(TO_LOCAL_NUMBER({ Settings: mockSettings, x: input })).toBe(expected)
      }
    )
  }
)
