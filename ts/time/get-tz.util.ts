import { SET_DOCUMENT_TZ } from './set-document-tz.util.js'

/**
 * get the global timezone from `Luxon` `Settings`
 * * provide `Settings` -> import { Settings } from 'luxon'
 * @param _Settings - The luxon `Settings` class
 * @returns The name of the default zone (also written on the document `tz` attribute when there is a document)
 * @example
 * ```typescript
 * const settings = { defaultZone: { name: 'Europe/Paris' } }
 * GET_TZ(settings) // returns 'Europe/Paris'
 * const utcSettings = { defaultZone: { name: 'UTC' } }
 * GET_TZ(utcSettings) // returns 'UTC'
 * ```
 */
export function GET_TZ<TypeofSettings = any> (_Settings: TypeofSettings): string {
  // _Settings.defaultZone.name
  let documentTz = ''

  try {
    // @ts-ignore
    documentTz = window.document.documentElement.getAttribute('tz') ?? ''
  } catch {}

  const settingsTz = (_Settings as any).defaultZone.name

  if (documentTz !== settingsTz) {
    SET_DOCUMENT_TZ(settingsTz)
  }

  return settingsTz
}
