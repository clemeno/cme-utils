import type { Settings } from 'luxon'
import { SET_DOCUMENT_LOCALE } from './set-document-locale.util.js'

/** get the global locale from `Luxon` `Settings` */
export const GET_LOCALE = (_Settings: typeof Settings): string => {
  let documentLocale = ''

  try {
    // @ts-ignore
    documentLocale = window.document.documentElement.getAttribute('locale') ?? ''
  } catch {}

  const settingsLocale = _Settings.defaultLocale

  if (documentLocale !== settingsLocale) {
    SET_DOCUMENT_LOCALE(settingsLocale)
  }

  return settingsLocale
}
