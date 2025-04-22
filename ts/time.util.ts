import type luxon from 'luxon'
import { IS_A_STRING_AND_NOT_EMPTY, IS_NUMERIC } from './check/check.util.js'
import { TO_NUMBER } from './convert/convert.util.js'
import { TO_STRING } from './convert/to-string.util.js'
// import dotenv from 'dotenv'

// dotenv.config()

// const ENV: Record<string, any> = process.env

// export const INITIAL_TZ: string = ENV.APP_TZ ?? 'UTC'

/** set the global timezone to `Luxon` `Settings` */
export const SET_TZ = (_: {
  tz: string
  Settings: typeof luxon.Settings
}): void => {
  const tz = IS_A_STRING_AND_NOT_EMPTY(_.tz) ? _.tz : 'UTC'

  _.Settings.defaultZone = tz

  try { document.documentElement.setAttribute('tz', tz) } catch {}
}

/** get the global timezone from `Luxon` `Settings` */
export const GET_TZ = (Settings: typeof luxon.Settings): string => Settings.defaultZone.name

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

export const LUXON_FORMAT_YMD_HMS_Z = 'y-MM-dd HH:mm:ss z'
export const LUXON_FORMAT_YMD_HMS_S_Z = 'y-MM-dd HH:mm:ss.SSS z'

export const LUXON_FORMAT_YMD_HMS_O = 'y-MM-dd HH:mm:ss ZZ'
export const LUXON_FORMAT_YMD_HMS_S_O = 'y-MM-dd HH:mm:ss.SSS ZZ'

export const LUXON_FORMAT_LOCAL_HM = 'T'
export const LUXON_FORMAT_LOCAL_HMS = 'TT'
export const LUXON_FORMAT_LOCAL_YMD = 'D'

export const LUXON_FORMAT_LOCAL_YMD_HM = 'D T'
export const LUXON_FORMAT_LOCAL_YMD_HMS = 'D TT'
export const LUXON_FORMAT_LOCAL_YMD_HMS_S = 'D TT.SSS'

export const LUXON_FORMAT_LOCAL_YMD_HMS_Z = 'D TT z'
export const LUXON_FORMAT_LOCAL_YMD_HMS_S_Z = 'D TT.SSS z'

export const LUXON_FORMAT_LOCAL_YMD_HMS_O = 'D TT ZZ'
export const LUXON_FORMAT_LOCAL_YMD_HMS_S_O = 'D TT.SSS ZZ'

export const LUXON_FORMAT_LOCAL_LONG_MONTH = 'MMMM'
export const LUXON_FORMAT_LOCAL_LONG_MONTH_Y = 'MMMM y'

/** `Luxon` `DateTime` `UTC` */
export const NOW_UTC = (DateTime: typeof luxon.DateTime): luxon.DateTime => DateTime.utc()

/** `Luxon` `DateTime` `local` */
export const NOW = (DateTime: typeof luxon.DateTime): luxon.DateTime => DateTime.local()

/** `Luxon` `DateTime` set to the global timezone */
export const NOW_APP = (_: {
  DateTime: typeof luxon.DateTime
  Settings: typeof luxon.Settings
}): luxon.DateTime => NOW(_.DateTime).setZone(GET_TZ(_.Settings) ?? 'UTC')

/** current timestamp in milliseconds */
export const NOW_MS = (): number => +(new Date())

/** current unix timestamp in seconds */
export const NOW_UNIX = (): number => Math.trunc(+(new Date()) / 1e3)

/** current SQL `datetime` `UTC` - **without** timzeone display - using `Luxon` `DateTime` */
export const MYSQL_DATETIME_NOW_UTC = (DateTime: typeof luxon.DateTime): string => NOW_UTC(DateTime).toFormat(LUXON_FORMAT_YMD_HMS)

/** `Luxon` `DateTime` 7 days before a moment (defaults to `now`) at midnight */
export const GET_7_DAYS_BEFORE_START = (_: {
  m?: luxon.DateTime
  DateTime: typeof luxon.DateTime
  Settings: typeof luxon.Settings
}): luxon.DateTime => (_.m ?? NOW_APP(_)).minus({ day: 7 }).startOf('day')

/** `Luxon` `DateTime` 7 days before today at midnight */
export const GET_7_DAYS_AGO_START = (_: {
  DateTime: typeof luxon.DateTime
  Settings: typeof luxon.Settings
}): luxon.DateTime => GET_7_DAYS_BEFORE_START({ m: NOW_APP(_), ..._ })

/** `Luxon` `DateTime` a moment (defaults to `now`) at the end of the day */
export const GET_DAY_STOP = (_: {
  m?: luxon.DateTime
  DateTime: typeof luxon.DateTime
  Settings: typeof luxon.Settings
}): luxon.DateTime => (_.m ?? NOW_APP(_)).endOf('day')

/** `Luxon` `DateTime` today at the end of the day */
export const GET_TODAY_STOP = (_: {
  DateTime: typeof luxon.DateTime
  Settings: typeof luxon.Settings
}): luxon.DateTime => GET_DAY_STOP({ m: NOW_APP(_), ..._ })

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

export const LUXON_IS_SAME_Y = (_: { ma: luxon.DateTime, mb: luxon.DateTime }): boolean => {
  return _.ma.year === _.mb.year
}

export const LUXON_IS_SAME_YM = (_: { ma: luxon.DateTime, mb: luxon.DateTime }): boolean => {
  return (_.ma.month === _.mb.month) && LUXON_IS_SAME_Y(_)
}

export const LUXON_IS_SAME_YMD = (_: { ma: luxon.DateTime, mb: luxon.DateTime }): boolean => {
  return (_.ma.day === _.mb.day) && LUXON_IS_SAME_YM(_)
}

export const LUXON_IS_SAME_YMDH = (_: { ma: luxon.DateTime, mb: luxon.DateTime }): boolean => {
  return (_.ma.hour === _.mb.hour) && LUXON_IS_SAME_YMD(_)
}

export const LUXON_IS_SAME_YMDHM = (_: { ma: luxon.DateTime, mb: luxon.DateTime }): boolean => {
  return (_.ma.minute === _.mb.minute) && LUXON_IS_SAME_YMDHM(_)
}

export const LUXON_IS_SAME_YMDHMS = (_: { ma: luxon.DateTime, mb: luxon.DateTime }): boolean => {
  return _.ma.toUnixInteger() === _.mb.toUnixInteger()
}

export const LUXON_IS_SAME = (_: { ma: luxon.DateTime, mb: luxon.DateTime }): boolean => +_.ma === +_.mb

export const FROM_ISO_TO_LOCAL_FORMAT = (_: {
  iso: any
  format?: string
  DateTime: typeof luxon.DateTime
  Settings: typeof luxon.Settings
}): string => {
  const m = IS_A_STRING_AND_NOT_EMPTY(TO_STRING(_.iso)) ? _.DateTime.fromISO(TO_STRING(_.iso)) : _.DateTime.invalid('iso')
  return m.isValid ? m.setZone(GET_TZ(_.Settings)).toFormat(_.format ?? LUXON_FORMAT_LOCAL_YMD_HMS_S_Z) : ''
}

export const FROM_ISO_TO_LOCAL_DT = (_: {
  iso: any
  DateTime: typeof luxon.DateTime
  Settings: typeof luxon.Settings
}): string => FROM_ISO_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_YMD_HM })

export const FROM_ISO_TO_LOCAL_DTT = (_: {
  iso: any
  DateTime: typeof luxon.DateTime
  Settings: typeof luxon.Settings
}): string => FROM_ISO_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_YMD_HMS })

export const FROM_ISO_TO_LOCAL_D = (_: {
  iso: any
  DateTime: typeof luxon.DateTime
  Settings: typeof luxon.Settings
}): string => FROM_ISO_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_YMD })

export const FROM_ISO_TO_LOCAL_T = (_: {
  iso: any
  DateTime: typeof luxon.DateTime
  Settings: typeof luxon.Settings
}): string => FROM_ISO_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_HM })

export const FROM_ISO_TO_LOCAL_TT = (_: {
  iso: any
  DateTime: typeof luxon.DateTime
  Settings: typeof luxon.Settings
}): string => FROM_ISO_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_HMS })

export const FROM_UNIX_TO_LOCAL_FORMAT = (_: {
  unix: any
  format?: string
  DateTime: typeof luxon.DateTime
  Settings: typeof luxon.Settings
}): string => {
  const m = IS_NUMERIC(_.unix) ? _.DateTime.fromSeconds(TO_NUMBER(_.unix)) : _.DateTime.invalid('unix')
  return m.isValid ? m.setZone(GET_TZ(_.Settings)).toFormat(_.format ?? LUXON_FORMAT_LOCAL_YMD_HMS_S_Z) : ''
}

export const FROM_UNIX_TO_LOCAL_DT = (_: {
  unix: any
  DateTime: typeof luxon.DateTime
  Settings: typeof luxon.Settings
}): string => FROM_UNIX_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_YMD_HM })

export const FROM_UNIX_TO_LOCAL_DTT = (_: {
  unix: any
  DateTime: typeof luxon.DateTime
  Settings: typeof luxon.Settings
}): string => FROM_UNIX_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_YMD_HMS })

export const FROM_UNIX_TO_LOCAL_D = (_: {
  unix: any
  DateTime: typeof luxon.DateTime
  Settings: typeof luxon.Settings
}): string => FROM_UNIX_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_YMD })

export const FROM_UNIX_TO_LOCAL_T = (_: {
  unix: any
  DateTime: typeof luxon.DateTime
  Settings: typeof luxon.Settings
}): string => FROM_UNIX_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_HM })

export const FROM_UNIX_TO_LOCAL_TT = (_: {
  unix: any
  DateTime: typeof luxon.DateTime
  Settings: typeof luxon.Settings
}): string => FROM_UNIX_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_HMS })
