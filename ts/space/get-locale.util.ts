import type { AppLuxonSettings } from '../app-luxon-settings.js'
import { IS_A_STRING_AND_NOT_EMPTY } from '../string/is-a-string-and-not-empty.util.js'
import { SET_DOCUMENT_LOCALE } from './set-document-locale.util.js'

/**
 * Gets the global locale from `Luxon` `Settings`, and syncs the document locale attribute with it.
 * An unset locale (luxon starts with `null`) or an empty one gives the system locale, the one luxon formats with.
 * @param _Settings - The luxon `Settings` class, for example `Settings` of 'luxon'
 * @returns The default locale of the settings, or the system locale when it is unset or empty
 * @example
 * ```typescript
 * Settings.defaultLocale = 'fr-CA'
 * GET_LOCALE(Settings) // returns 'fr-CA'
 * Settings.defaultLocale = 'en'
 * GET_LOCALE(Settings) // returns 'en'
 * Settings.defaultLocale = ''
 * GET_LOCALE(Settings) // returns the system locale, as for luxon's starting null
 * ```
 */
export function GET_LOCALE (_Settings: AppLuxonSettings): string {
  // missing outside a browser (Node, bun, a worker)
  const documentLocale = globalThis.window?.document?.documentElement?.getAttribute('locale') ?? ''

  const { defaultLocale } = _Settings

  // the system locale of luxon (its systemLocale()), which also treats an empty locale as unset
  const settingsLocale = IS_A_STRING_AND_NOT_EMPTY(defaultLocale) ? defaultLocale : new Intl.DateTimeFormat().resolvedOptions().locale

  if (documentLocale !== settingsLocale) {
    SET_DOCUMENT_LOCALE(settingsLocale)
  }

  return settingsLocale
}
