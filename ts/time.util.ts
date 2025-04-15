import { TO_NUMBER } from 'convert/convert.util.js'
import { DateTime, Settings } from 'luxon'
// import { env } from '../../../env/env'

// export const INITIAL_TZ: string = env.timezone

/** set the global timezone to `Luxon` `Settings` */
export const SET_TZ = (tz: string): void => {
  Settings.defaultZone = tz

  try { document.documentElement.setAttribute('tz', tz) } catch {}
}

/** get the global timezone from `Luxon` `Settings` */
export const GET_TZ = (): string => Settings.defaultZone.name

// * Luxon DateTime format constants
export const LUXON_FORMAT_H = 'HH'
export const LUXON_FORMAT_HM = 'HH:mm'
export const LUXON_FORMAT_HMS = 'HH:mm:ss'
export const LUXON_FORMAT_HMS_S = 'HH:mm:ss.SSS'
export const LUXON_FORMAT_Y = 'y'
export const LUXON_FORMAT_YM = 'y-MM'
export const LUXON_FORMAT_YMD = 'y-MM-dd'
export const LUXON_FORMAT_YMD_H = 'y-MM-dd HH'
export const LUXON_FORMAT_YMD_HM = 'y-MM-dd HH:mm'
export const LUXON_FORMAT_YMD_HMS = 'y-MM-dd HH:mm:ss'
export const LUXON_FORMAT_YMD_HMS_S = 'y-MM-dd HH:mm:ss.SSS'
export const LUXON_FORMAT_LOCAL_HM = 't'
export const LUXON_FORMAT_LOCAL_HMS = 'tt'
export const LUXON_FORMAT_LOCAL_YMD = 'D'
export const LUXON_FORMAT_LOCAL_YMD_HM = 'D t'
export const LUXON_FORMAT_LOCAL_YMD_HMS = 'D tt'
export const LUXON_FORMAT_LOCAL_YMD_HMS_S = 'D tt.SSS'

/** `Luxon` `DateTime` `UTC` */
export const NOW_UTC = (): DateTime => DateTime.utc()

/** `Luxon` `DateTime` `local` */
export const NOW = (): DateTime => DateTime.local()

/** `Luxon` `DateTime` set to the global timezone */
export const NOW_APP = (): DateTime => NOW().setZone(GET_TZ() ?? 'UTC')

/** current timestamp in milliseconds */
export const NOW_MS = (): number => +(new Date())

/** current unix timestamp in seconds */
export const NOW_UNIX = (): number => Math.trunc(+(new Date()) / 1e3)

/** current SQL `datetime` `UTC` - **without** timzeone display - using `Luxon` `DateTime` */
export const MYSQL_DATETIME_NOW_UTC = (): string => NOW_UTC().toFormat(LUXON_FORMAT_YMD_HMS)

/** `Luxon` `DateTime` 7 days before a moment (defaults to `now`) at midnight */
export const GET_7_DAYS_BEFORE_START = (m?: DateTime): DateTime => (m ?? NOW_APP()).minus({ day: 7 }).startOf('day')

/** `Luxon` `DateTime` 7 days before today at midnight */
export const GET_7_DAYS_AGO_START = (): DateTime => GET_7_DAYS_BEFORE_START(NOW_APP())

/** `Luxon` `DateTime` a moment (defaults to `now`) at the end of the day */
export const GET_DAY_STOP = (m?: DateTime): DateTime => (m ?? NOW_APP()).endOf('day')

/** `Luxon` `DateTime` today at the end of the day */
export const GET_TODAY_STOP = (): DateTime => GET_DAY_STOP(NOW_APP())

/**
 * Wait for a specified number of milliseconds and expect true.
 * @param ms milliseconds to wait
 * @returns expect true when the promise is resolved
 */
export const WAIT_MS = async (ms: any): Promise<true> => {
  return await new Promise(resolve => setTimeout(() => { resolve(true) }, TO_NUMBER(ms)))
}

/**
 * Just wait for a specified number of milliseconds.
 * @param ms milliseconds to wait
 * @returns the promise is resolved
 */
export const DELAY_MS = async (ms: number): Promise<any> => await new Promise(resolve => setTimeout(resolve, ms))
