import { IS_NUMERIC } from './check/check.util.js'
import { TO_NUMBER } from './convert/convert.util.js'
import { GET_LOCALE } from './space.util.js'

/**
 * ! **Not secure**, simple random number generator.
 * @description use `crypto.getRandomValues` instead for secure random number generation
 */
export const GET_RANDOM_INT_BETWEEN = (_: { a: number, b: number }): number => {
  const a = Math.trunc(_.a)
  const b = Math.trunc(_.b)

  const min = Math.min(a, b)
  const max = Math.max(a, b)

  return Math.floor(Math.random() * Math.max(1, max - min)) + min
}

export const TO_LOCAL_NUMBER = (_: {
  x: any
  /** @type {Luxon.Settings} */
  Settings: any
}): string => IS_NUMERIC(_.x) ? TO_NUMBER(_.x).toLocaleString(GET_LOCALE(_.Settings)) : ''

export const TO_LOCAL_NUMBER_WITH_2_F_DIGITS = (_: {
  x: any
  /** @type {Luxon.Settings} */
  Settings: any
}): string => (
  IS_NUMERIC(_.x)
    ? TO_NUMBER(_.x).toLocaleString(GET_LOCALE(_.Settings), { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : ''
)

export const TO_LOCAL_NUMBER_WITH_1_F_DIGIT = (_: {
  x: any
  /** @type {Luxon.Settings} */
  Settings: any
}): string => (
  IS_NUMERIC(_.x)
    ? TO_NUMBER(_.x).toLocaleString(GET_LOCALE(_.Settings), { minimumFractionDigits: 1, maximumFractionDigits: 1 })
    : ''
)
