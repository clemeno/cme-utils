import { IS_NUMERIC } from 'check/check.util'
import { IS_SET } from 'check/is-set.util'
import { TO_NUMBER } from 'convert/convert.util'

// eslint-disable-next-line max-params
export const ARRAY_MAX = (a: any[]): any => a.reduce((m, v) => (!IS_SET(v) || (v < m)) ? m : v, null)

// eslint-disable-next-line max-params
export const ARRAY_MIN = (a: any[]): any => a.reduce((m, v) => (!IS_SET(v) || (m < v)) ? m : v, null)

export const ARRAY_SUM = (a: any[]): any => a.reduce(
  // eslint-disable-next-line max-params
  (s, v) => IS_NUMERIC(v) ? (IS_NUMERIC(s) ? TO_NUMBER(s) + TO_NUMBER(v) : TO_NUMBER(v)) : s,
  NaN
)

const IGNORE_DUPLICATES = (on: any): (element: any) => boolean => {
  const already = new Set()
  return (element: any) => {
    const value = on(element)
    const bNew = !already.has(value)
    bNew && already.add(value)
    return bNew
  }
}

export const ARRAY_UNIQUES = (_: { from: any[], on?: (element: any) => any }): any[] => (
  IS_SET(_.on) ? _.from.filter(IGNORE_DUPLICATES(_.on)) : Array.from(new Set(_.from))
)
