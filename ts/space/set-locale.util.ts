import type { Settings } from 'luxon'
import { IS_A_STRING_AND_NOT_EMPTY } from '../check/is-a-string-and-not-empty.util.js'

/** set the global locale to `Luxon` `Settings` */
export const SET_LOCALE = (_: {
  locale: string
  Settings: typeof Settings
}): void => {
  const locale = IS_A_STRING_AND_NOT_EMPTY(_.locale) ? _.locale : 'en-gb'

  _.Settings.defaultLocale = locale

  const partList = locale.split('-')

  const lang = partList[0]
  const geo = partList.slice(1).join('-')

  try { document.documentElement.setAttribute('lang', lang) } catch {}
  try { document.documentElement.setAttribute('locale', locale) } catch {}

  if (IS_A_STRING_AND_NOT_EMPTY(geo)) {
    try { document.documentElement.setAttribute('geo', geo) } catch {}
  }
}
