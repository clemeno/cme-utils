import type { AppLuxonSettings } from '../app-luxon-settings.js'
import { SET_DOCUMENT_LOCALE } from './set-document-locale.util.js'

/**
 * Gets the global locale from `Luxon` `Settings`, and syncs the document locale attribute with it.
 * @param _Settings - The luxon `Settings` class, for example `Settings` of 'luxon'
 * @returns The default locale of the settings
 * @example
 * ```typescript
 * Settings.defaultLocale = 'fr-CA'
 * GET_LOCALE(Settings) // returns 'fr-CA'
 * Settings.defaultLocale = 'en'
 * GET_LOCALE(Settings) // returns 'en'
 * ```
 */
export function GET_LOCALE (_Settings: AppLuxonSettings): string {
  // missing outside a browser (Node, bun, a worker)
  const globalWindow: Partial<Window> | undefined = globalThis.window
  const documentLocale = globalWindow?.document?.documentElement?.getAttribute('locale') ?? ''

  const { defaultLocale } = _Settings

  const settingsLocale = defaultLocale

  if (documentLocale !== settingsLocale) {
    SET_DOCUMENT_LOCALE(settingsLocale)
  }

  return settingsLocale
}
