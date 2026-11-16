import type { AppLuxonSettings } from '../app-luxon-settings.js'
import { GET_LOCALE } from './get-locale.util.js'

/**
 * Gets the global geo (the part of the locale after the language) from `Luxon` `Settings`. It neither reads nor writes the document: only `SET_LOCALE` updates the document attributes.
 * @param _Settings - The luxon `Settings` class, for example `Settings` of 'luxon'
 * @returns The geo of the default locale, or '' (empty string) when the locale has no geo
 * @example
 * ```typescript
 * Settings.defaultLocale = 'fr-CA'
 * GET_GEO(Settings) // returns 'CA'
 * Settings.defaultLocale = 'zh-Hans-CN'
 * GET_GEO(Settings) // returns 'Hans-CN'
 * Settings.defaultLocale = 'en'
 * GET_GEO(Settings) // returns ''
 * ```
 */
export function GET_GEO (_Settings: AppLuxonSettings): string {
  return GET_LOCALE(_Settings).split('-').slice(1).join('-')
}
