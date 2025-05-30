import { IS_A_STRING_AND_NOT_EMPTY } from '../check/is-a-string-and-not-empty.util.js'
import { SET_DOCUMENT_GEO_FROM_LOCALE } from './set-document-geo-from-locale.util.js'
import { SET_DOCUMENT_LANG_FROM_LOCALE } from './set-document-lang-from-locale.util.js'
import { SET_DOCUMENT_LOCALE } from './set-document-locale.util.js'

/**
 * set the global locale to `Luxon` `Settings`
 * * provide Settings -> import type { Settings } from 'luxon'
 */
export const SET_LOCALE = <TypeofSettings = any> (_: {
  Settings: TypeofSettings
  locale: string
}): void => {
  const locale = IS_A_STRING_AND_NOT_EMPTY(_.locale) ? _.locale : 'en-gb'

  const SettingsClass = _.Settings as any

  SettingsClass.defaultLocale = locale

  SET_DOCUMENT_LOCALE(locale)

  SET_DOCUMENT_LANG_FROM_LOCALE(locale)

  SET_DOCUMENT_GEO_FROM_LOCALE(locale)
}
