import { SET_DOCUMENT_LOCALE } from './set-document-locale.util.js'

/**
 * Gets the global locale from `Luxon` `Settings`, and syncs the document locale attribute with it.
 * @param _Settings - The luxon `Settings` class, for example `Settings` of 'luxon'
 * @returns The default locale of the settings
 * @example
 * ```typescript
 * GET_LOCALE({ defaultLocale: 'fr-CA' }) // returns 'fr-CA'
 * GET_LOCALE({ defaultLocale: 'en' }) // returns 'en'
 * ```
 */
export function GET_LOCALE<TypeofSettings = any> (_Settings: TypeofSettings): string {
  let documentLocale = ''

  try {
    // @ts-ignore
    documentLocale = window.document.documentElement.getAttribute('locale') ?? ''
  } catch {}

  const { defaultLocale } = _Settings as any

  const settingsLocale = defaultLocale

  if (documentLocale !== settingsLocale) {
    SET_DOCUMENT_LOCALE(settingsLocale)
  }

  return settingsLocale
}
