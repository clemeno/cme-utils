import type { AppLuxonSettings } from '../app-luxon-settings.js'
import { GET_LOCALE } from './get-locale.util.js'
import { SET_DOCUMENT_GEO } from './set-document-geo.util.js'

/**
 * Gets the global geo (the part of the locale after the language) from `Luxon` `Settings`, and syncs the document geo attribute with it.
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
  // missing outside a browser (Node, bun, a worker)
  const globalWindow: Partial<Window> | undefined = globalThis.window
  const documentGeo = globalWindow?.document?.documentElement?.getAttribute('geo') ?? ''

  const settingsLocale = GET_LOCALE(_Settings)
  const settingsGeo = settingsLocale.split('-').slice(1).join('-')

  if (documentGeo !== settingsGeo) {
    SET_DOCUMENT_GEO(settingsGeo)
  }

  return settingsGeo
}
