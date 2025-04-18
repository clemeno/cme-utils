import { IS_NUMERIC } from 'check/check.util'
import { TO_NUMBER } from 'convert/convert.util'
import { GET_LOCALE } from 'space.util'

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

export const TO_LOCAL_NUMBER = (x: any): string => IS_NUMERIC(x) ? TO_NUMBER(x).toLocaleString(GET_LOCALE()) : ''

export const TO_LOCAL_NUMBER_WITH_2_F_DIGITS = (x: any): string => {
  return IS_NUMERIC(x) ? TO_NUMBER(x).toLocaleString(GET_LOCALE(), { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
}

export const TO_LOCAL_NUMBER_WITH_1_F_DIGIT = (x: any): string => {
  return IS_NUMERIC(x) ? TO_NUMBER(x).toLocaleString(GET_LOCALE(), { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : ''
}
