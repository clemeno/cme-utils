import { describe, expect, it } from 'bun:test'
import { TO_LOCAL_NUMBER_WITH_2_F_DIGITS } from '../../ts/number/to-local-number-with-2-f-digits.util.js'

describe(
  'TO_LOCAL_NUMBER_WITH_2_F_DIGITS',
  () => {
    it(
      'should format numbers with exactly 2 decimal places',
      () => {
        const mockSettings = { locale: 'en-US' }

        expect(TO_LOCAL_NUMBER_WITH_2_F_DIGITS({ Settings: mockSettings, x: 123.456 })).toBe('123,46')
        expect(TO_LOCAL_NUMBER_WITH_2_F_DIGITS({ Settings: mockSettings, x: 123 })).toBe('123,00')
        expect(TO_LOCAL_NUMBER_WITH_2_F_DIGITS({ Settings: mockSettings, x: 0 })).toBe('0,00')
        expect(TO_LOCAL_NUMBER_WITH_2_F_DIGITS({ Settings: mockSettings, x: -123.789 })).toBe('-123,79')
      }
    )

    it(
      'should handle string numbers',
      () => {
        const mockSettings = { locale: 'en-US' }

        expect(TO_LOCAL_NUMBER_WITH_2_F_DIGITS({ Settings: mockSettings, x: '123.456' })).toBe('123,46')
        expect(TO_LOCAL_NUMBER_WITH_2_F_DIGITS({ Settings: mockSettings, x: '123' })).toBe('123,00')
      }
    )

    it(
      'should return empty string for non-numeric values',
      () => {
        const mockSettings = { locale: 'en-US' }

        expect(TO_LOCAL_NUMBER_WITH_2_F_DIGITS({ Settings: mockSettings, x: 'abc' })).toBe('')
        expect(TO_LOCAL_NUMBER_WITH_2_F_DIGITS({ Settings: mockSettings, x: null })).toBe('')
        expect(TO_LOCAL_NUMBER_WITH_2_F_DIGITS({ Settings: mockSettings, x: undefined })).toBe('')
        expect(TO_LOCAL_NUMBER_WITH_2_F_DIGITS({ Settings: mockSettings, x: {} })).toBe('')
        expect(TO_LOCAL_NUMBER_WITH_2_F_DIGITS({ Settings: mockSettings, x: [] })).toBe('')
      }
    )

    it(
      'should handle different locales',
      () => {
        const frenchSettings = { locale: 'fr-FR' }
        const germanSettings = { locale: 'de-DE' }

        expect(TO_LOCAL_NUMBER_WITH_2_F_DIGITS({ Settings: frenchSettings, x: 123.456 })).toBe('123,46')
        expect(TO_LOCAL_NUMBER_WITH_2_F_DIGITS({ Settings: germanSettings, x: 123.456 })).toBe('123,46')
      }
    )

    it(
      'should handle edge cases',
      () => {
        const mockSettings = { locale: 'en-US' }

        expect(TO_LOCAL_NUMBER_WITH_2_F_DIGITS({ Settings: mockSettings, x: NaN })).toBe('')
        expect(TO_LOCAL_NUMBER_WITH_2_F_DIGITS({ Settings: mockSettings, x: Infinity })).toBe('∞')
        expect(TO_LOCAL_NUMBER_WITH_2_F_DIGITS({ Settings: mockSettings, x: -Infinity })).toBe('-∞')
      }
    )

    it(
      'should return a string',
      () => {
        const mockSettings = { locale: 'en-US' }
        const result = TO_LOCAL_NUMBER_WITH_2_F_DIGITS({ Settings: mockSettings, x: 123.456 })
        expect(typeof result).toBe('string')
      }
    )
  }
)
