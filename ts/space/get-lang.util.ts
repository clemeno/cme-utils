import type { AppLuxonSettings } from '../app-luxon-settings.js'
import { GET_LOCALE } from './get-locale.util.js'
import { SET_DOCUMENT_LANG } from './set-document-lang.util.js'

/**
 * Gets the global lang (the part of the locale before the first dash) from `Luxon` `Settings`, and syncs the document lang attribute with it.
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
  // missing outside a browser (Node, bun, a worker)
  const globalWindow: Partial<Window> | undefined = globalThis.window
  const documentLang = globalWindow?.document?.documentElement?.getAttribute('lang') ?? ''

  const settingsLocale = GET_LOCALE(_Settings)
  const settingsLang = settingsLocale.split('-').slice(0, 1).join('-')

  if (documentLang !== settingsLang) {
    SET_DOCUMENT_LANG(settingsLang)
  }

  return settingsLang
}
