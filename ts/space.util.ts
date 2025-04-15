// import { env } from 'env/env'
import { IS_A_STRING_AND_NOT_EMPTY } from 'check/check.util'
import dotenv from 'dotenv'
import { Settings } from 'luxon'
// import { Locale } from 'date-fns'
// import { enGB } from 'date-fns/locale'

dotenv.config()

const ENV: Record<string, any> = process.env

export const INITIAL_LOCALE: string = ENV.APP_LOCALE ?? 'en-gb'

/** set the global locale to `Luxon` `Settings` */
export const SET_LOCALE = (locale: string): void => {
  Settings.defaultLocale = locale

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
export const GET_LOCALE = (): string => Settings.defaultLocale

export const SET_GEO = (geo: string): void => {
  try { document.documentElement.setAttribute('geo', geo) } catch {}
}

export const SET_GEO_FROM_LOCALE = (locale: string): void => {
  try { document.documentElement.setAttribute('geo', locale.split('-').slice(1).join('-')) } catch {}
}

export const GET_GEO = (): string => {
  let geo = ''

  try { geo = document.documentElement.getAttribute('geo') ?? '' } catch {}

  if (geo.length < 1) {
    const geo = GET_LOCALE().split('-').slice(1).join('-')

    SET_GEO(geo)
  }

  return geo
}
