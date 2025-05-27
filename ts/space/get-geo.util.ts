import { GET_LOCALE } from './get-locale.util.js'
import { SET_DOCUMENT_GEO } from './set-document-geo.util.js'

/**
 * get the global geo from `Luxon` `Settings`
 * * provide Settings -> import type { Settings } from 'luxon'
 */
export const GET_GEO = <TypeofSettings = any> (_Settings: TypeofSettings): string => {
  let documentGeo = ''

  try {
    // @ts-ignore
    documentGeo = window.document.documentElement.getAttribute('geo') ?? ''
  } catch {}

  const settingsLocale = GET_LOCALE(_Settings)
  const settingsGeo = settingsLocale.split('-').slice(1).join('-')

  if (documentGeo !== settingsGeo) {
    SET_DOCUMENT_GEO(settingsGeo)
  }

  return settingsGeo
}
