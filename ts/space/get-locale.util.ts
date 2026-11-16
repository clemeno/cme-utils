import type { AppLuxonSettings } from '../app-luxon-settings.js'
import { IS_A_STRING_AND_NOT_EMPTY } from '../string/is-a-string-and-not-empty.util.js'

/**
 * Gets the global locale from `Luxon` `Settings`. It neither reads nor writes the document: only `SET_LOCALE` updates the document attributes.
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
  const { defaultLocale } = _Settings

  // the system locale of luxon (its systemLocale()), which also treats an empty locale as unset
  return IS_A_STRING_AND_NOT_EMPTY(defaultLocale) ? defaultLocale : new Intl.DateTimeFormat().resolvedOptions().locale
}
