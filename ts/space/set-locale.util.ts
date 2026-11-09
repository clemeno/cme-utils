import { IS_A_STRING_AND_NOT_EMPTY } from '../string/is-a-string-and-not-empty.util.js'
import { SET_DOCUMENT_GEO_FROM_LOCALE } from './set-document-geo-from-locale.util.js'
import { SET_DOCUMENT_LANG_FROM_LOCALE } from './set-document-lang-from-locale.util.js'
import { SET_DOCUMENT_LOCALE } from './set-document-locale.util.js'

/**
 * Sets the global locale of `Luxon` `Settings` and of the document attributes (locale, lang, geo). An empty locale falls back to 'en-gb'.
 * @param _ - The object parameter
 * @param _.Settings - The luxon `Settings` class, for example `Settings` of 'luxon'
 * @param _.locale - The locale, for example 'fr-CA'
 * @returns Nothing
 * @example
 * ```typescript
 * const settings = { defaultLocale: 'en-US' }
 * SET_LOCALE({ Settings: settings, locale: 'fr-CA' }) // returns undefined
 * settings.defaultLocale // returns 'fr-CA'
 * SET_LOCALE({ Settings: settings, locale: '' }) // returns undefined
 * settings.defaultLocale // returns 'en-gb'
 * ```
 */
export function SET_LOCALE<TypeofSettings = any> (_: {
  Settings: TypeofSettings
  locale: string
}): void {
  const locale = IS_A_STRING_AND_NOT_EMPTY(_.locale) ? _.locale : 'en-gb'

  const SettingsClass = _.Settings as any

  SettingsClass.defaultLocale = locale

  SET_DOCUMENT_LOCALE(locale)

  SET_DOCUMENT_LANG_FROM_LOCALE(locale)

  SET_DOCUMENT_GEO_FROM_LOCALE(locale)
}
