import { IS_A_STRING_AND_NOT_EMPTY, IS_NUMERIC } from 'check/check.util'
import { TO_NUMBER } from 'convert/convert.util.js'
import { TO_STRING } from 'convert/to-string.util'
// import dotenv from 'dotenv'
import { DateTime, Settings } from 'luxon'
import { GET_LOCALE } from 'space.util'

// dotenv.config()

// const ENV: Record<string, any> = process.env

// export const INITIAL_TZ: string = ENV.APP_TZ ?? 'UTC'

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

export const LUXON_IS_SAME_Y = (_: { ma: DateTime, mb: DateTime }): boolean => _.ma.year === _.mb.year

export const LUXON_IS_SAME_YM = (_: { ma: DateTime, mb: DateTime }): boolean => _.ma.month === _.mb.month && LUXON_IS_SAME_Y(_)

export const LUXON_IS_SAME_YMD = (_: { ma: DateTime, mb: DateTime }): boolean => _.ma.day === _.mb.day && LUXON_IS_SAME_YM(_)

export const LUXON_IS_SAME_YMDH = (_: { ma: DateTime, mb: DateTime }): boolean => _.ma.hour === _.mb.hour && LUXON_IS_SAME_YMD(_)

export const LUXON_IS_SAME_YMDHM = (_: { ma: DateTime, mb: DateTime }): boolean => _.ma.minute === _.mb.minute && LUXON_IS_SAME_YMDHM(_)

export const LUXON_IS_SAME_YMDHMS = (_: { ma: DateTime, mb: DateTime }): boolean => _.ma.toUnixInteger() === _.mb.toUnixInteger()

export const LUXON_IS_SAME = (_: { ma: DateTime, mb: DateTime }): boolean => +_.ma === +_.mb

export const FROM_ISO_TO_LOCAL_FORMAT = (_: { iso: any, format?: string }): string => {
  const m = IS_A_STRING_AND_NOT_EMPTY(TO_STRING(_.iso)) ? DateTime.fromISO(TO_STRING(_.iso)) : DateTime.invalid('iso')
  return m.isValid ? m.setZone(GET_TZ()).toFormat(_.format ?? LUXON_FORMAT_LOCAL_YMD_HMS_S_Z) : ''
}

export const FROM_ISO_TO_LOCAL_DT = (iso: any): string => FROM_ISO_TO_LOCAL_FORMAT({ iso, format: LUXON_FORMAT_LOCAL_YMD_HM })

export const FROM_ISO_TO_LOCAL_DTT = (iso: any): string => FROM_ISO_TO_LOCAL_FORMAT({ iso, format: LUXON_FORMAT_LOCAL_YMD_HMS })

export const FROM_ISO_TO_LOCAL_D = (iso: any): string => FROM_ISO_TO_LOCAL_FORMAT({ iso, format: LUXON_FORMAT_LOCAL_YMD })

export const FROM_ISO_TO_LOCAL_T = (iso: any): string => FROM_ISO_TO_LOCAL_FORMAT({ iso, format: LUXON_FORMAT_LOCAL_HM })

export const FROM_ISO_TO_LOCAL_TT = (iso: any): string => FROM_ISO_TO_LOCAL_FORMAT({ iso, format: LUXON_FORMAT_LOCAL_HMS })

export const TO_LOCAL_NUMBER = (x: any): string => IS_NUMERIC(x) ? TO_NUMBER(x).toLocaleString(GET_LOCALE()) : ''

export const TO_LOCAL_NUMBER_WITH_2_F_DIGITS = (x: any): string => {
  return IS_NUMERIC(x) ? TO_NUMBER(x).toLocaleString(GET_LOCALE(), { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
}

export const TO_LOCAL_NUMBER_WITH_1_F_DIGIT = (x: any): string => {
  return IS_NUMERIC(x) ? TO_NUMBER(x).toLocaleString(GET_LOCALE(), { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : ''
}

export const FROM_UNIX_TO_LOCAL_FORMAT = (_: { unix: any, format?: string }): string => {
  const m = IS_NUMERIC(_.unix) ? DateTime.fromSeconds(TO_NUMBER(_.unix)) : DateTime.invalid('unix')
  return m.isValid ? m.setZone(GET_TZ()).toFormat(_.format ?? LUXON_FORMAT_LOCAL_YMD_HMS_S_Z) : ''
}

export const FROM_UNIX_TO_LOCAL_DT = (unix: any): string => FROM_UNIX_TO_LOCAL_FORMAT({ unix, format: LUXON_FORMAT_LOCAL_YMD_HM })

export const FROM_UNIX_TO_LOCAL_DTT = (unix: any): string => FROM_UNIX_TO_LOCAL_FORMAT({ unix, format: LUXON_FORMAT_LOCAL_YMD_HMS })

export const FROM_UNIX_TO_LOCAL_D = (unix: any): string => FROM_UNIX_TO_LOCAL_FORMAT({ unix, format: LUXON_FORMAT_LOCAL_YMD })

export const FROM_UNIX_TO_LOCAL_T = (unix: any): string => FROM_UNIX_TO_LOCAL_FORMAT({ unix, format: LUXON_FORMAT_LOCAL_HM })

export const FROM_UNIX_TO_LOCAL_TT = (unix: any): string => FROM_UNIX_TO_LOCAL_FORMAT({ unix, format: LUXON_FORMAT_LOCAL_HMS })
