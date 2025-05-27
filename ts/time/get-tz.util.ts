import { SET_DOCUMENT_TZ } from './set-document-tz.util.js'

/**
 * get the global timezone from `Luxon` `Settings`
 * * provide `Settings` -> import type { Settings } from 'luxon'
 */
export const GET_TZ = <TypeofSettings = any> (_Settings: TypeofSettings): string => {
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
