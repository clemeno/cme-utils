import type { Settings } from 'luxon'
import { GET_LOCALE } from './get-locale.util.js'
import { SET_DOCUMENT_GEO } from './set-document-geo.util.js'

export const GET_GEO = (_Settings: typeof Settings): string => {
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
