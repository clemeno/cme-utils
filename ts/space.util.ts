// import { env } from 'env/env'
import { IS_A_STRING_AND_NOT_EMPTY } from './check/check.util.js'
// import dotenv from 'dotenv'
// import { Locale } from 'date-fns'
// import { enGB } from 'date-fns/locale'

// dotenv.config()

// const ENV: Record<string, any> = process.env

// export const INITIAL_LOCALE: string = ENV.APP_LOCALE ?? 'en-gb'

/** set the global locale to `Luxon` `Settings` */
export const SET_LOCALE = (_: {
  locale: string
  /** @type {Luxon.Settings} */
  Settings: any
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

/** get the global locale from `Luxon` `Settings` */
export const GET_LOCALE = (
  /** @type {Luxon.Settings} */
  Settings: any
): string => Settings.defaultLocale

export const SET_GEO = (geo: string): void => {
  try { document.documentElement.setAttribute('geo', geo) } catch {}
}

export const SET_GEO_FROM_LOCALE = (locale: string): void => {
  try { document.documentElement.setAttribute('geo', locale.split('-').slice(1).join('-')) } catch {}
}

export const GET_GEO = (
  /** @type {Luxon.Settings} */
  Settings: any
): string => {
  let geo = ''

  try { geo = document.documentElement.getAttribute('geo') ?? '' } catch {}

  if (geo.length < 1) {
    const geo = GET_LOCALE(Settings).split('-').slice(1).join('-')

    SET_GEO(geo)
  }

  return geo
}
