import { GET_LOCALE } from './get-locale.util.js'
import { SET_DOCUMENT_GEO } from './set-document-geo.util.js'

/**
 * Gets the global geo (the part of the locale after the language) from `Luxon` `Settings`, and syncs the document geo attribute with it.
 * @param _Settings - The luxon `Settings` class, for example `Settings` of 'luxon'
 * @returns The geo of the default locale, or '' (empty string) when the locale has no geo
 * @example
 * ```typescript
 * GET_GEO({ defaultLocale: 'fr-CA' }) // returns 'CA'
 * GET_GEO({ defaultLocale: 'zh-Hans-CN' }) // returns 'Hans-CN'
 * GET_GEO({ defaultLocale: 'en' }) // returns ''
 * ```
 */
export function GET_GEO<TypeofSettings = any> (_Settings: TypeofSettings): string {
  let documentGeo = ''

  try {
    // @ts-ignore
    documentGeo = window.document.documentElement.getAttribute('geo') ?? ''
  } catch {}

  const settingsLocale = GET_LOCALE(_Settings)
  const settingsGeo = settingsLocale.split('-').slice(1).join('-')

  if (documentGeo !== settingsGeo) {
    SET_DOCUMENT_GEO(settingsGeo)
  }

  return settingsGeo
}
