import { describe, expect, it } from 'bun:test'
import { TO_LOCAL_NUMBER_WITH_1_F_DIGIT } from '../../ts/number/to-local-number-with-1-f-digit.util.js'

describe(
  'TO_LOCAL_NUMBER_WITH_1_F_DIGIT',
  () => {
    const enUS = { locale: 'en-US' }
    const frFR = { locale: 'fr-FR' }
    const deDE = { locale: 'de-DE' }

    const testCases = [
      { label: '123.456 (en-US)', Settings: enUS, x: 123.456, expected: '123,5' },
      { label: '123 (en-US)', Settings: enUS, x: 123, expected: '123,0' },
      { label: '0 (en-US)', Settings: enUS, x: 0, expected: '0,0' },
      { label: '-123.789 (en-US)', Settings: enUS, x: -123.789, expected: '-123,8' },
      { label: '"123.456" string (en-US)', Settings: enUS, x: '123.456', expected: '123,5' },
      { label: '"123" string (en-US)', Settings: enUS, x: '123', expected: '123,0' },
      { label: '"abc" (en-US)', Settings: enUS, x: 'abc', expected: '' },
      { label: 'null (en-US)', Settings: enUS, x: null, expected: '' },
      { label: 'undefined (en-US)', Settings: enUS, x: undefined, expected: '' },
      { label: '{} (en-US)', Settings: enUS, x: {}, expected: '' },
      { label: '[] (en-US)', Settings: enUS, x: [], expected: '' },
      { label: '123.456 (fr-FR)', Settings: frFR, x: 123.456, expected: '123,5' },
      { label: '123.456 (de-DE)', Settings: deDE, x: 123.456, expected: '123,5' },
      { label: 'NaN (en-US)', Settings: enUS, x: NaN, expected: '' },
      { label: 'Infinity (en-US)', Settings: enUS, x: Infinity, expected: '∞' },
      { label: '-Infinity (en-US)', Settings: enUS, x: -Infinity, expected: '-∞' },
    ]

    it.each(testCases)(
      'TO_LOCAL_NUMBER_WITH_1_F_DIGIT($label) → $expected',
      ({ Settings, x, expected }) => {
        expect(TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings, x })).toBe(expected)
      }
    )

    it(
      'returns a string',
      () => {
        const result = TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings: { locale: 'en-US' }, x: 123.456 })
        expect(typeof result).toBe('string')
      }
    )
  }
)
