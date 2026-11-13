import { describe, expect, it } from 'bun:test'
import type { AppLuxonSettings } from '../../ts/app-luxon-settings.js'
import { TO_LOCAL_NUMBER_WITH_1_F_DIGIT } from '../../ts/number/to-local-number-with-1-f-digit.util.js'
import { createMockSettings } from '../mocks/luxon-mock.js'

describe(
  'TO_LOCAL_NUMBER_WITH_1_F_DIGIT',
  () => {
    const enUS = createMockSettings({ initialLocale: 'en-US' })
    const frFR = createMockSettings({ initialLocale: 'fr-FR' })
    const deDE = createMockSettings({ initialLocale: 'de-DE' })

    const testCases: Array<{ name: string, Settings: AppLuxonSettings, x: unknown, expected: string }> = [
      { name: '123.456 (en-US)', Settings: enUS, x: 123.456, expected: '123.5' },
      { name: '123 (en-US)', Settings: enUS, x: 123, expected: '123.0' },
      { name: '0 (en-US)', Settings: enUS, x: 0, expected: '0.0' },
      { name: '-123.789 (en-US)', Settings: enUS, x: -123.789, expected: '-123.8' },
      { name: '"123.456" string (en-US)', Settings: enUS, x: '123.456', expected: '123.5' },
      { name: '"123" string (en-US)', Settings: enUS, x: '123', expected: '123.0' },
      { name: '"abc" (en-US)', Settings: enUS, x: 'abc', expected: '' },
      { name: 'null (en-US)', Settings: enUS, x: null, expected: '' },
      { name: 'undefined (en-US)', Settings: enUS, x: undefined, expected: '' },
      { name: '{} (en-US)', Settings: enUS, x: {}, expected: '' },
      { name: '[] (en-US)', Settings: enUS, x: [], expected: '' },
      { name: '123.456 (fr-FR)', Settings: frFR, x: 123.456, expected: '123,5' },
      { name: '123.456 (de-DE)', Settings: deDE, x: 123.456, expected: '123,5' },
      { name: 'NaN (en-US)', Settings: enUS, x: NaN, expected: '' },
      { name: 'Infinity (en-US)', Settings: enUS, x: Infinity, expected: '∞' },
      { name: '-Infinity (en-US)', Settings: enUS, x: -Infinity, expected: '-∞' },
    ]

    it.each(testCases)(
      'TO_LOCAL_NUMBER_WITH_1_F_DIGIT($name) → $expected',
      ({ Settings, x, expected }) => {
        expect(TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings, x })).toBe(expected)
      }
    )
  }
)
