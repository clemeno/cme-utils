import { IS_A_STRING_AND_NOT_EMPTY, IS_NUMERIC, IS_ON } from 'check/check.util'
import { IS_SET } from 'check/is-set.util'
import { TO_NUMBER } from 'convert/convert.util.js'
import { TO_STRING } from 'convert/to-string.util'
// import dotenv from 'dotenv'

// dotenv.config()

// const ENV: Record<string, any> = process.env

// export const INITIAL_TZ: string = ENV.APP_TZ ?? 'UTC'

/** set the global timezone to `Luxon` `Settings` */
export const SET_TZ = (_: {
  tz: string
  /** @type {Luxon.Settings} */
  Settings: any
}): void => {
  const tz = IS_A_STRING_AND_NOT_EMPTY(_.tz) ? _.tz : 'UTC'

  _.Settings.defaultZone = tz

  try { document.documentElement.setAttribute('tz', tz) } catch {}
}

/** get the global timezone from `Luxon` `Settings` */
export const GET_TZ = (
  /** @type {Luxon.Settings} */
  Settings: any
): string => Settings.defaultZone.name

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
export const NOW_UTC = <T = any> (
  /** @type {Luxon.DateTime} */
  DateTime: T
): T => (DateTime as any).utc()

/** `Luxon` `DateTime` `local` */
export const NOW = <T = any> (
  /** @type {Luxon.DateTime} */
  DateTime: T
): T => (DateTime as any).local()

/** `Luxon` `DateTime` set to the global timezone */
export const NOW_APP = <T = any> (_: {
  /** @type {Luxon.DateTime} */
  DateTime: T
  /** @type {Luxon.Settings} */
  Settings: any
}): T => (NOW(_.DateTime) as any).setZone(GET_TZ(_.Settings) ?? 'UTC')

/** current timestamp in milliseconds */
export const NOW_MS = (): number => +(new Date())

/** current unix timestamp in seconds */
export const NOW_UNIX = (): number => Math.trunc(+(new Date()) / 1e3)

/** current SQL `datetime` `UTC` - **without** timzeone display - using `Luxon` `DateTime` */
export const MYSQL_DATETIME_NOW_UTC = <T = any> (
  /** @type {Luxon.DateTime} */
  DateTime: T
): T => (NOW_UTC(DateTime) as any).toFormat(LUXON_FORMAT_YMD_HMS)

/** `Luxon` `DateTime` 7 days before a moment (defaults to `now`) at midnight */
export const GET_7_DAYS_BEFORE_START = <T = any> (_: {
  /** @type {Luxon.DateTime} */
  m?: T
  /** @type {Luxon.DateTime} */
  DateTime: T
  /** @type {Luxon.Settings} */
  Settings: any
}): T => ((_.m ?? NOW_APP(_)) as any).minus({ day: 7 }).startOf('day')

/** `Luxon` `DateTime` 7 days before today at midnight */
export const GET_7_DAYS_AGO_START = <T = any> (_: {
  /** @type {Luxon.DateTime} */
  DateTime: T
  /** @type {Luxon.Settings} */
  Settings: any
}): T => GET_7_DAYS_BEFORE_START({ m: NOW_APP(_), ..._ })

/** `Luxon` `DateTime` a moment (defaults to `now`) at the end of the day */
export const GET_DAY_STOP = <T = any> (_: {
  /** @type {Luxon.DateTime} */
  m?: T
  /** @type {Luxon.DateTime} */
  DateTime: T
  /** @type {Luxon.Settings} */
  Settings: any
}): T => ((_.m ?? NOW_APP(_)) as any).endOf('day')

/** `Luxon` `DateTime` today at the end of the day */
export const GET_TODAY_STOP = <T = any> (_: {
  /** @type {Luxon.DateTime} */
  DateTime: T
  /** @type {Luxon.Settings} */
  Settings: any
}): T => GET_DAY_STOP({ m: NOW_APP(_), ..._ })

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

export const LUXON_IS_SAME_Y = <T = any> (_: { ma: T, mb: T }): boolean => {
  return (_.ma as any).year === (_.mb as any).year
}

export const LUXON_IS_SAME_YM = <T = any> (_: { ma: T, mb: T }): boolean => {
  return ((_.ma as any).month === (_.mb as any).month) && LUXON_IS_SAME_Y(_)
}

export const LUXON_IS_SAME_YMD = <T = any> (_: { ma: T, mb: T }): boolean => {
  return ((_.ma as any).day === (_.mb as any).day) && LUXON_IS_SAME_YM(_)
}

export const LUXON_IS_SAME_YMDH = <T = any> (_: { ma: T, mb: T }): boolean => {
  return ((_.ma as any).hour === (_.mb as any).hour) && LUXON_IS_SAME_YMD(_)
}

export const LUXON_IS_SAME_YMDHM = <T = any> (_: { ma: T, mb: T }): boolean => {
  return ((_.ma as any).minute === (_.mb as any).minute) && LUXON_IS_SAME_YMDHM(_)
}

export const LUXON_IS_SAME_YMDHMS = <T = any> (_: { ma: T, mb: T }): boolean => {
  return (_.ma as any).toUnixInteger() === (_.mb as any).toUnixInteger()
}

export const LUXON_IS_SAME = <T = any>(_: { ma: T, mb: T }): boolean => +_.ma === +_.mb

export const FROM_ISO_TO_LOCAL_FORMAT = (_: {
  iso: any
  format?: string
  /** @type {Luxon.DateTime} */
  DateTime: any
  /** @type {Luxon.Settings} */
  Settings: any
}): string => {
  const m = IS_A_STRING_AND_NOT_EMPTY(TO_STRING(_.iso)) ? _.DateTime.fromISO(TO_STRING(_.iso)) : _.DateTime.invalid('iso')
  return IS_ON(m.isValid) ? m.setZone(GET_TZ(_)).toFormat(_.format ?? LUXON_FORMAT_LOCAL_YMD_HMS_S_Z) : ''
}

export const FROM_ISO_TO_LOCAL_DT = (_: {
  iso: any
  /** @type {Luxon.DateTime} */
  DateTime: any
  /** @type {Luxon.Settings} */
  Settings: any
}): string => FROM_ISO_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_YMD_HM })

export const FROM_ISO_TO_LOCAL_DTT = (_: {
  iso: any
  /** @type {Luxon.DateTime} */
  DateTime: any
  /** @type {Luxon.Settings} */
  Settings: any
}): string => FROM_ISO_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_YMD_HMS })

export const FROM_ISO_TO_LOCAL_D = (_: {
  iso: any
  /** @type {Luxon.DateTime} */
  DateTime: any
  /** @type {Luxon.Settings} */
  Settings: any
}): string => FROM_ISO_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_YMD })

export const FROM_ISO_TO_LOCAL_T = (_: {
  iso: any
  /** @type {Luxon.DateTime} */
  DateTime: any
  /** @type {Luxon.Settings} */
  Settings: any
}): string => FROM_ISO_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_HM })

export const FROM_ISO_TO_LOCAL_TT = (_: {
  iso: any
  /** @type {Luxon.DateTime} */
  DateTime: any
  /** @type {Luxon.Settings} */
  Settings: any
}): string => FROM_ISO_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_HMS })

export const FROM_UNIX_TO_LOCAL_FORMAT = (_: {
  unix: any
  format?: string
  /** @type {Luxon.DateTime} */
  DateTime: any
  /** @type {Luxon.Settings} */
  Settings: any
}): string => {
  const m = IS_NUMERIC(_.unix) ? _.DateTime.fromSeconds(TO_NUMBER(_.unix)) : _.DateTime.invalid('unix')
  return IS_SET(m.isValid) ? m.setZone(GET_TZ(_)).toFormat(_.format ?? LUXON_FORMAT_LOCAL_YMD_HMS_S_Z) : ''
}

export const FROM_UNIX_TO_LOCAL_DT = (_: {
  unix: any
  /** @type {Luxon.DateTime} */
  DateTime: any
  /** @type {Luxon.Settings} */
  Settings: any
}): string => FROM_UNIX_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_YMD_HM })

export const FROM_UNIX_TO_LOCAL_DTT = (_: {
  unix: any
  /** @type {Luxon.DateTime} */
  DateTime: any
  /** @type {Luxon.Settings} */
  Settings: any
}): string => FROM_UNIX_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_YMD_HMS })

export const FROM_UNIX_TO_LOCAL_D = (_: {
  unix: any
  /** @type {Luxon.DateTime} */
  DateTime: any
  /** @type {Luxon.Settings} */
  Settings: any
}): string => FROM_UNIX_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_YMD })

export const FROM_UNIX_TO_LOCAL_T = (_: {
  unix: any
  /** @type {Luxon.DateTime} */
  DateTime: any
  /** @type {Luxon.Settings} */
  Settings: any
}): string => FROM_UNIX_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_HM })

export const FROM_UNIX_TO_LOCAL_TT = (_: {
  unix: any
  /** @type {Luxon.DateTime} */
  DateTime: any
  /** @type {Luxon.Settings} */
  Settings: any
}): string => FROM_UNIX_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_HMS })
