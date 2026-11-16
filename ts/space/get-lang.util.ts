import type { AppLuxonSettings } from '../app-luxon-settings.js'
import { GET_LOCALE } from './get-locale.util.js'

/**
 * Gets the global lang (the part of the locale before the first dash) from `Luxon` `Settings`. It neither reads nor writes the document: only `SET_LOCALE` updates the document attributes.
 * @param _Settings - The luxon `Settings` class, for example `Settings` of 'luxon'
 * @returns The lang of the default locale
 * @example
 * ```typescript
 * Settings.defaultLocale = 'fr-CA'
 * GET_LANG(Settings) // returns 'fr'
 * Settings.defaultLocale = 'en'
 * GET_LANG(Settings) // returns 'en'
 * ```
 */
export function GET_LANG (_Settings: AppLuxonSettings): string {
  return GET_LOCALE(_Settings).split('-').slice(0, 1).join('-')
}
