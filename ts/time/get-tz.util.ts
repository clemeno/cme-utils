import type { Settings } from 'luxon'
import { SET_DOCUMENT_TZ } from './set-document-tz.util.js'

/** get the global timezone from `Luxon` `Settings` */
export const GET_TZ = (_Settings: typeof Settings): string => {
  // _Settings.defaultZone.name
  let documentTz = ''

  try {
    // @ts-ignore
    documentTz = window.document.documentElement.getAttribute('tz') ?? ''
  } catch {}

  const settingsTz = _Settings.defaultZone.name

  if (documentTz !== settingsTz) {
    SET_DOCUMENT_TZ(settingsTz)
  }

  return settingsTz
}
