import type { AppLuxonSettings } from '../app-luxon-settings.js'

/**
 * Gets the global timezone from `Luxon` `Settings`. It neither reads nor writes the document: only `SET_TZ` (or `SET_DOCUMENT_TZ`) updates the document `tz` attribute.
 * * provide `Settings` -> import { Settings } from 'luxon'
 * @param _Settings - The luxon `Settings` class
 * @returns The name of the default zone
 * @example
 * ```typescript
 * Settings.defaultZone = 'Europe/Paris'
 * GET_TZ(Settings) // returns 'Europe/Paris'
 * Settings.defaultZone = 'UTC'
 * GET_TZ(Settings) // returns 'UTC'
 * ```
 */
export function GET_TZ (_Settings: AppLuxonSettings): string {
  return _Settings.defaultZone.name
}
