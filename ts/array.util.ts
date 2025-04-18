import { IS_NUMERIC, IS_ON } from 'check/check.util'
import { IS_SET } from 'check/is-set.util'
import { TO_NUMBER } from 'convert/convert.util'
import { type numeric } from 'numeric'

export const ARRAY_MAX = <T = any> (a: T[] | readonly T[]): T | undefined => {
  let max: any

  for (const v of a) {
    if (IS_SET(v)) {
      if (!IS_SET(max) || (max < v)) {
        max = v
      }
    }
  }

  return max
}

export const ARRAY_MIN = <T = any> (a: T[]): T | undefined => {
  let min: any

  for (const v of a) {
    if (IS_SET(v)) {
      if (!IS_SET(min) || (min > v)) {
        min = v
      }
    }
  }

  return min
}

export const ARRAY_SUM = (a: numeric[]): number => {
  let sum = NaN

  for (const v of a) {
    if (IS_NUMERIC(v)) {
      const nv = TO_NUMBER(v)

      if (!IS_SET(sum)) {
        sum = nv
      } else {
        sum += nv
      }
    }
  }

  return sum
}

const IGNORE_DUPLICATES = <T = any, U = any> (on: (element: T) => U): (element: T) => boolean => {
  const already = new Set<U>()

  return element => {
    const value = on(element)
    const bNew = !already.has(value)

    if (bNew) {
      already.add(value)
    }

    return bNew
  }
}

export const ARRAY_UNIQUES = <T = any> (_: { from: T[], on?: (element: T) => T }): T[] => (
  IS_SET(_.on) ? _.from.filter(IGNORE_DUPLICATES(_.on)) : Array.from(new Set(_.from))
)

export const ARRAY_MIN_MAX = <T = any> (a: T[]): { min: T | undefined, max: T | undefined } => {
  let min: T | undefined
  let max: T | undefined

  for (const element of a) {
    if (IS_SET(element)) {
      if (!IS_SET(min) || (element < min)) {
        min = element
      }

      if (!IS_SET(max) || (max < element)) {
        max = element
      }
    }
  }

  return { min, max }
}

export const ARRAY_MEDIAN = (arr: numeric[]): number => {
  let res = NaN

  const count = arr.length

  if (0 < count) {
    // eslint-disable-next-line max-params
    const sortedNList = arr.slice().map(TO_NUMBER).sort((a, b) => a - b)

    const indexM = Math.floor(count / 2)

    res = IS_ON(count % 2) ? sortedNList[indexM] : ((+sortedNList[indexM] + +sortedNList[indexM + 1]) / 2)
  }

  return res
}

export const ARRAY_AVERAGE = (a: numeric[]): number => (0 < a.length) ? (ARRAY_SUM(a) / a.length) : NaN
