import type { Settings } from 'luxon'
import { GET_LOCALE } from './get-locale.util.js'
import { SET_DOCUMENT_LANG } from './set-document-lang.util.js'

export const GET_LANG = (_Settings: typeof Settings): string => {
  let documentLang = ''

  try {
    // @ts-ignore
    documentLang = window.document.documentElement.getAttribute('lang') ?? ''
  } catch {}

  const settingsLocale = GET_LOCALE(_Settings)
  const settingsLang = settingsLocale.split('-').slice(0, 1).join('-')

  if (documentLang !== settingsLang) {
    SET_DOCUMENT_LANG(settingsLang)
  }

  return settingsLang
}
