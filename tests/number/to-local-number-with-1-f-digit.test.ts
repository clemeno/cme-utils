import { describe, expect, it } from 'bun:test'
import { TO_LOCAL_NUMBER_WITH_1_F_DIGIT } from '../../ts/number/to-local-number-with-1-f-digit.util.js'

describe(
  'TO_LOCAL_NUMBER_WITH_1_F_DIGIT',
  () => {
    it(
      'should format numbers with exactly 1 decimal place',
      () => {
        const mockSettings = { locale: 'en-US' }

        expect(TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings: mockSettings, x: 123.456 })).toBe('123,5')
        expect(TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings: mockSettings, x: 123 })).toBe('123,0')
        expect(TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings: mockSettings, x: 0 })).toBe('0,0')
        expect(TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings: mockSettings, x: -123.789 })).toBe('-123,8')
      }
    )

    it(
      'should handle string numbers',
      () => {
        const mockSettings = { locale: 'en-US' }

        expect(TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings: mockSettings, x: '123.456' })).toBe('123,5')
        expect(TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings: mockSettings, x: '123' })).toBe('123,0')
      }
    )

    it(
      'should return empty string for non-numeric values',
      () => {
        const mockSettings = { locale: 'en-US' }

        expect(TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings: mockSettings, x: 'abc' })).toBe('')
        expect(TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings: mockSettings, x: null })).toBe('')
        expect(TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings: mockSettings, x: undefined })).toBe('')
        expect(TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings: mockSettings, x: {} })).toBe('')
        expect(TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings: mockSettings, x: [] })).toBe('')
      }
    )

    it(
      'should handle different locales',
      () => {
        const frenchSettings = { locale: 'fr-FR' }
        const germanSettings = { locale: 'de-DE' }

        expect(TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings: frenchSettings, x: 123.456 })).toBe('123,5')
        expect(TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings: germanSettings, x: 123.456 })).toBe('123,5')
      }
    )

    it(
      'should handle edge cases',
      () => {
        const mockSettings = { locale: 'en-US' }

        expect(TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings: mockSettings, x: NaN })).toBe('')
        expect(TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings: mockSettings, x: Infinity })).toBe('∞')
        expect(TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings: mockSettings, x: -Infinity })).toBe('-∞')
      }
    )

    it(
      'should return a string',
      () => {
        const mockSettings = { locale: 'en-US' }
        const result = TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings: mockSettings, x: 123.456 })
        expect(typeof result).toBe('string')
      }
    )
  }
)
