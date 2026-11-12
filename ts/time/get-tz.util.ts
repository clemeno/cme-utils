import type { AppLuxonSettings } from '../app-luxon-settings.js'
import { SET_DOCUMENT_TZ } from './set-document-tz.util.js'

/**
 * get the global timezone from `Luxon` `Settings`
 * * provide `Settings` -> import { Settings } from 'luxon'
 * @param _Settings - The luxon `Settings` class
 * @returns The name of the default zone (also written on the document `tz` attribute when there is a document)
 * @example
 * ```typescript
 * Settings.defaultZone = 'Europe/Paris'
 * GET_TZ(Settings) // returns 'Europe/Paris'
 * Settings.defaultZone = 'UTC'
 * GET_TZ(Settings) // returns 'UTC'
 * ```
 */
export function GET_TZ (_Settings: AppLuxonSettings): string {
  // _Settings.defaultZone.name
  // missing outside a browser (Node, bun, a worker)
  const documentTz = globalThis.window?.document?.documentElement?.getAttribute('tz') ?? ''

  const settingsTz = _Settings.defaultZone.name

  if (documentTz !== settingsTz) {
    SET_DOCUMENT_TZ(settingsTz)
  }

  return settingsTz
}
