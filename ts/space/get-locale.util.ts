import { SET_DOCUMENT_LOCALE } from './set-document-locale.util.js'

/**
 * get the global locale from `Luxon` `Settings`
 * * provide Settings -> import type { Settings } from 'luxon'
 */
export const GET_LOCALE = <TypeofSettings = any> (_Settings: TypeofSettings): string => {
  let documentLocale = ''

  try {
    // @ts-ignore
    documentLocale = window.document.documentElement.getAttribute('locale') ?? ''
  } catch {}

  const { defaultLocale } = _Settings as any

  const settingsLocale = defaultLocale

  if (documentLocale !== settingsLocale) {
    SET_DOCUMENT_LOCALE(settingsLocale)
  }

  return settingsLocale
}
