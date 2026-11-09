import { GET_LOCALE } from './get-locale.util.js'
import { SET_DOCUMENT_LANG } from './set-document-lang.util.js'

/**
 * Gets the global lang (the part of the locale before the first dash) from `Luxon` `Settings`, and syncs the document lang attribute with it.
 * @param _Settings - The luxon `Settings` class, for example `Settings` of 'luxon'
 * @returns The lang of the default locale
 * @example
 * ```typescript
 * GET_LANG({ defaultLocale: 'fr-CA' }) // returns 'fr'
 * GET_LANG({ defaultLocale: 'en' }) // returns 'en'
 * ```
 */
export function GET_LANG<TypeofSettings = any> (_Settings: TypeofSettings): string {
  let documentLang = ''

  try {
    // @ts-ignore
    documentLang = window.document.documentElement.getAttribute('lang') ?? ''
  } catch {}

  const settingsLocale = GET_LOCALE(_Settings)
  const settingsLang = settingsLocale.split('-').slice(0, 1).join('-')

  if (documentLang !== settingsLang) {
    SET_DOCUMENT_LANG(settingsLang)
  }

  return settingsLang
}
