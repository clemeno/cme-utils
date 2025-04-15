import { TO_STRING } from 'convert/to-string.util.js'
import { SYMBOLS } from '../constant.util.js'
import { type numeric } from '../numeric.js'
import { IS_EMPTY } from './is-empty.util.js'
import { IS_SET } from './is-set.util.js'

/** CHECK is `undefined` */
export const IS_UNDEFINED = (v: any): v is undefined => typeof v === 'undefined'

// /** CHECK is anything but `undefined` */
// export const IS_DEFINED = <T = any> (v: T | undefined): v is T => typeof v !== 'undefined'

/** CHECK (is `null`) */
export const IS_NULL = (v: any): v is null => v === null

// /** CHECK (is not `null`) */
// export const IS_NOT_NULL = <T = any> (v: T | null): v is T => v !== null

// /** CHECK (is `null`) or (is `undefined`) */
// export const IS_NOT_SET = (v: any): v is null | undefined => (v === null) || (typeof v === 'undefined')

/** CHECK (is a numeric `string`) or (a `number`, not `NaN`) */
export const IS_NUMERIC = (v: any): boolean => (
  ((typeof v === 'number') && !Number.isNaN(v)) ||
  ((typeof v === 'string') && (v !== '') && !Number.isNaN(Number(v)) && !Number.isNaN(Number.parseFloat(v)))
)

// /** CHECK is anything but a numeric `string` or a `number` */
// export const IS_NOT_NUMERIC = (v: any): boolean => {
//   const bNumber = typeof v === 'number'
//   const bString = typeof v === 'string'
//   return (
//     (!bNumber && !bString) ||
//     (bNumber && Number.isNaN(v)) ||
//     (bString && ((v === '') || ((+v - +v) !== 0)))
//   )
// }

/** CHECK (is a `number`) */
export const IS_A_NUMBER = (v: any): v is number => (typeof v === 'number') && !isNaN(v)

// /** CHECK (is not a `number`) or (is `NaN`) */
// export const IS_NOT_A_NUMBER = (v: any): boolean => (typeof v !== 'number') || isNaN(v)

/** CHECK (is a `string`) */
export const IS_A_STRING = (v: any): v is string => typeof v === 'string'

/** CHECK (is the `string` `''`) */
export const IS_A_STRING_AND_EMPTY = (v: any): v is string => v === ''

/** CHECK (is a `string`, not `''`) */
export const IS_A_STRING_AND_NOT_EMPTY = (v: any): v is string => (typeof v === 'string') && (v !== '')

/** CHECK (is an `object` instance, not `null`) */
export const IS_AN_OBJECT = (o: any): o is any => (o !== null) && (typeof o === 'object')

/** CHECK (is an `object` instance of `{}`, an empty `Record`) */
export const IS_AN_OBJECT_AND_EMPTY = (o: any): o is any => (o !== null) && (typeof o === 'object') && (Object.keys(o as Record<any, any>).length === 0)

/** CHECK (is an `object` instance, a `Record` with at least 1 key) */
export const IS_AN_OBJECT_AND_NOT_EMPTY = (o: any): o is any => (o !== null) && (typeof o === 'object') && (Object.keys(o as Record<any, any>).length !== 0)

/** CHECK (is an `Array` instance) */
export const IS_AN_ARRAY = <T = any> (v: any): v is T[] => Array.isArray(v)

/** CHECK (is an `Array` instance of `[]`, an empty ordered list) */
export const IS_AN_ARRAY_AND_EMPTY = <T = any> (v: any): v is T[] => Array.isArray(v) && (v.length === 0)

/** CHECK (is an `Array` instance of an oredered list with at least 1 slot) */
export const IS_AN_ARRAY_AND_NOT_EMPTY = <T = any> (v: any): v is T[] => Array.isArray(v) && (v.length !== 0)

/** CHECK (is a `Set` instance) */
export const IS_A_SET = <T> (o: any): o is Set<T> => o instanceof Set

/** CHECK (is a `Set` instance with at least 1 member) */
export const IS_A_SET_AND_NOT_EMPTY = <T> (o: any): o is Set<T> => (o instanceof Set) && (o.size !== 0)

/** CHECK (is a `Set` instance of the empty set `∅`) */
export const IS_A_SET_AND_EMPTY = <T> (o: any): o is Set<T> => (o instanceof Set) && (o.size === 0)

/** CHECK (is a `Map` instance) */
export const IS_A_MAP = <T = any, U = any> (o: any): o is Map<T, U> => o instanceof Map

export const IS_A_MAP_AND_NOT_EMPTY = <T, U> (o: any): o is Map<T, U> => (o instanceof Map) && (o.size !== 0)

/** CHECK (is a `Map` instance of the empty map `T:∅ → U`) */
export const IS_A_MAP_AND_EMPTY = <T = any, U = any> (o: any): o is Map<T, U> => (o instanceof Map) && (o.size === 0)

/** CHECK (is a `boolean`) */
export const IS_A_BOOLEAN = (v: any): v is boolean => typeof v === 'boolean'

/** CHECK (is a valid `Date` instance) */
export const IS_A_DATE_AND_NOT_EMPTY = (o: any): o is Date => (o instanceof Date) && ((+o - +o) === 0)

/** CHECK (is an invalid `Date` instance) */
export const IS_A_DATE_AND_EMPTY = (o: any): o is Date => (o instanceof Date) && ((+o - +o) !== 0)

/** CHECK (is `falsy`) */
export const IS_OFF = (v: any): boolean => (
  (typeof v === 'undefined') ||
  (v === null) ||
  (v === false) ||
  (v === '') ||
  (v === 0) ||
  ((typeof v === 'number') && isNaN(v))
)

/** CHECK (is `truthy`) */
export const IS_ON = <T = any> (v: T | null | undefined | false | '' | 0): v is T => !IS_OFF(v)

/** CHECK (is an even `numeric` value) */
export const IS_EVEN = (v: any): boolean => {
  let res = false

  if (IS_NUMERIC(v)) {
    res = (+v % 2) === 0
  } else if (IS_SET(v) && !IS_EMPTY(v)) {
    const _v = `${v as string}`

    res = _v.length > 0

    if (res) {
      res = (SYMBOLS.indexOf(_v[_v.length - 1]) % 2) === 0
    }
  }

  return res
}

/** CHECK (is an odd `numeric` value) */
export const IS_ODD = (v: any): boolean => {
  let res = false

  if (IS_NUMERIC(v)) {
    res = (+v % 2) === 1
  } else if (IS_SET(v) && !IS_EMPTY(v)) {
    const _v = `${v as string}`

    res = _v.length > 0

    if (res) {
      res = (SYMBOLS.indexOf(_v[_v.length - 1]) % 2) === 1
    }
  }

  return res
}

/** CHECK (is a `numeric` value `∈ [ε, MAX_SAFE_INTEGER]`) */
export const IS_NUMERIC_AND_SAFE = (v: any): v is numeric => IS_NUMERIC(v) && (Number.EPSILON <= +v) && (+v <= Number.MAX_SAFE_INTEGER)

/** CHECK (is a `numeric` value `∉ [ε, MAX_SAFE_INTEGER]`) */
export const IS_NUMERIC_AND_UNSAFE = (v: any): v is numeric => IS_NUMERIC(v) && (+v < Number.EPSILON) && (Number.MAX_SAFE_INTEGER < +v)

/** CHECK (is a `RegExp` matching a full `string` without whitespace) */
export const REGEXP_NO_WHITESPACE = /^\S*$/g

/** CHECK (is the `string` of a `RegExp` matching a full `string` without whitespace) */
export const REGEXP_NO_WHITESPACE_STRING = '^\\S*$'

/** CHECK (is a `RegExp` matching a full email `string`) */
export const REGEX_EMAIL = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g

/** CHECK (is the `string` of a `RegExp` matching a full email `string`) */
export const REGEX_EMAIL_STRING = '^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$'

/** CHECK (is a URL `string` for public API routes) */
export const IS_A_PUBLIC_URL = (rawUrl?: string): boolean => {
  const url = TO_STRING(rawUrl)

  // allow paths:
  const publicPathWhitelist: string[] = [
    // '/account_token'
  ]

  const bIsAPublicUrl = (
    // here we hardcode that root ( / ) and ( /public followed by _ or / ) paths are public
    ['', '/', '/public_', '/public/'].includes(url.slice(0, 8)) ||
    // double / can happen on loosely configured hostings, remove the "false &&" guard to enable this check
    // but the hosting should be strictly configured in the first place to form canonical urls (with single slashes)
    (false && ['//public_', '//public/'].includes(url.slice(0, 9))) ||
    publicPathWhitelist.some(path => url.split(/[#?]/)[0] === path)
  )

  // console.log({ url, bIsAPublicUrl })

  return bIsAPublicUrl
  // return true
}

/**
 * CHECK (is `that` `true` ? Return `that` value in any case, except if we have to `throw` a given `Error` if `that` is `false`)
 * @deprecated Use the `if (!that) { throw Error }` syntax instead so that TypeScript interpret the `if` statement as a real `Guard`
 */
export const CHECK = (_: { that: boolean, orThrow?: any }): boolean => {
  if (IS_SET(_.orThrow) && !_.that) {
    throw _.orThrow
  }

  return _.that
}

/** CHECK (is a `key` `of` `object` instance) */
export const IS_KEY_OF_OBJECT = (_: { key: numeric, of?: any }): boolean => {
  return IS_AN_OBJECT_AND_NOT_EMPTY(_.of) && Object.keys(_.of as Record<any, any>).includes(TO_STRING(_.key))
}

export const MAX_UINT64 = 18446744073709551615n

export const MAX_INT64 = 9223372036854775807n

export const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER

export const MAX_UINT32 = 4294967295

export const MAX_INT32 = 2147483647

export const MAX_UINT16 = 65535

export const MAX_INT16 = 32767

export const MAX_UINT8 = 255

export const MAX_INT8 = 127

export const MAX_UINT4 = 15

export const MAX_INT4 = 7

/** ε */
export const MIN_STEP = Number.EPSILON

export const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER

/** CHECK (moment a === moment b), with moment = numeric (timestamp) | Date | DateTime ... */
export const SAME_MOMENT = <T = any> (_: { a: T, b: T }): boolean => (IS_SET(_.a) ? +_.a : null) === (IS_SET(_.b) ? +_.b : null)

/** CHECK (date a === date b), with date = numeric (timestamp) | Date | DateTime ... */
export const SAME_DATE = SAME_MOMENT

/** CHECK (datetime a === datetime b), with datetime = numeric (timestamp) | Date | DateTime ... */
export const SAME_DATETIME = SAME_MOMENT
