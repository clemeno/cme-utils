// import { env } from 'env/env'
import { Settings } from 'luxon'
// import { Locale } from 'date-fns'
// import { enGB } from 'date-fns/locale'

// export const INITIAL_LOCALE: string = env.locale

/** set the global locale to `Luxon` `Settings` */
export const SET_LOCALE = (locale: string): void => {
  Settings.defaultLocale = locale

  try { document.documentElement.setAttribute('lang', locale.split('-')[0]) } catch {}
  try { document.documentElement.setAttribute('locale', locale) } catch {}
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
