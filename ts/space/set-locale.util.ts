import type { AppLuxonSettings } from '../app-luxon-settings.js'
import { IS_A_STRING_AND_NOT_EMPTY } from '../string/is-a-string-and-not-empty.util.js'
import { GET_GEO } from './get-geo.util.js'
import { GET_LANG } from './get-lang.util.js'
import { SET_DOCUMENT_GEO } from './set-document-geo.util.js'
import { SET_DOCUMENT_LANG } from './set-document-lang.util.js'
import { SET_DOCUMENT_LOCALE } from './set-document-locale.util.js'

/**
 * Sets the global locale of `Luxon` `Settings` and of the document attributes (locale, lang, geo). An empty locale falls back to 'en-gb'.
 * @param _ - The object parameter
 * @param _.Settings - The luxon `Settings` class, for example `Settings` of 'luxon'
 * @param _.locale - The locale, for example 'fr-CA'
 * @returns Nothing
 * @example
 * ```typescript
 * SET_LOCALE({ Settings, locale: 'fr-CA' }) // returns undefined
 * Settings.defaultLocale // returns 'fr-CA'
 * SET_LOCALE({ Settings, locale: '' }) // returns undefined
 * Settings.defaultLocale // returns 'en-gb'
 * ```
 */
export function SET_LOCALE (_: {
  Settings: AppLuxonSettings
  locale: string
}): void {
  const locale = IS_A_STRING_AND_NOT_EMPTY(_.locale) ? _.locale : 'en-gb'

  _.Settings.defaultLocale = locale

  SET_DOCUMENT_LOCALE(locale)

  SET_DOCUMENT_LANG(GET_LANG(_.Settings))

  SET_DOCUMENT_GEO(GET_GEO(_.Settings))
}
