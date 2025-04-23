import { type DateTime } from 'luxon'
import { IS_AN_ARRAY, IS_A_BOOLEAN, IS_A_NUMBER, IS_A_STRING, IS_A_STRING_AND_NOT_EMPTY, IS_NUMERIC, IS_ON } from '../check/check.util.js'
import { IS_A_FUNCTION } from '../check/is-a-function.util.js'
import { IS_EMPTY } from '../check/is-empty.util.js'
import { IS_SET } from '../check/is-set.util.js'
import { SYMBOLS, SYMBOLS_BASE_256, SYMBOLS_LENGTH } from '../constant.util.js'
import { GET_ANY_OBJECT } from '../factory.util.js'
import { type numeric } from '../numeric.js'
import { TO_STRING } from './to-string.util.js'
// import dotenv from 'dotenv'

// dotenv.config()

// const ENV: Record<string, any> = process.env

export const TO_CANONICAL_STRING = (_: any): string => {
  return TO_STRING(_).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export const TO_BOOLEAN = (v: any): boolean => IS_NUMERIC(v) ? (+v !== 0) : !IS_EMPTY(v)

export const TO_NUMBER = (v: any): number => ((typeof v === 'boolean') ? (v ? 1 : 0) : Number.parseFloat(TO_STRING(v)))

/**
 * base convert big base small numbers
 */
export const BASE_CONVERT_BBSN = (_: { n: numeric, from: numeric, to: numeric }): string | null => {
  let res = ''

  const N = `${_.n}`
  const from = `${_.from}`
  const to = `${_.to}`

  if ((+from <= 0) || (SYMBOLS_LENGTH < +from)) {
    console.log(`Base from ${from} not in 1..${SYMBOLS_LENGTH}`)
  } else if ((+to <= 0) || (SYMBOLS_LENGTH < +to)) {
    console.log(`Base to ${to} not in 1..${SYMBOLS_LENGTH}`)
  } else {
    let bError = false

    let nBaseTen = 0

    if (+from === 10) {
      nBaseTen = Number.parseInt(N)
    } else {
      const sizeN = N.length

      for (let i = 0; !bError && (i < sizeN); i += 1) {
        const Ni = N[i]

        let mul = 0

        let bMulOk = bError

        while (!bMulOk && (mul < SYMBOLS_LENGTH)) {
          bMulOk = Ni === SYMBOLS[mul]

          if (!bMulOk) {
            mul += 1
          }
        }

        if (+from <= mul) {
          bError = true
          console.log(`Symbol not allowed in base ${from}`)
        } else if (bMulOk) {
          bError = true
          console.log('Symbol not found')
        } else {
          const exp = sizeN - i - 1
          nBaseTen += mul * ((exp === 0) ? 1 : Math.pow(+from, exp))
        }
      }
    }

    const bToBase10 = +to === 10

    const nTo: any[] = (nBaseTen === 0) ? [SYMBOLS[0]] : []

    if (!bError && !bToBase10) {
      while (!bError && (nBaseTen > 0)) {
        const mod = nBaseTen % +to

        if ((mod < 0) || (SYMBOLS_LENGTH <= mod)) {
          bError = true
          console.log(`Out of bounds mod ${mod} not in 0..${SYMBOLS_LENGTH}`)
        } else {
          nTo.push(SYMBOLS[mod])
          nBaseTen = Number.parseInt(`${nBaseTen / +to}`)
        }
      }
    }

    if (!bError) {
      res = bToBase10 ? nBaseTen.toString() : nTo.reverse().toString().replace(/,/g, '')
    }
  }

  return res
}

/**
 * from pure numeric string in base [2,36] to base [2,36] else throws
 */
export const REBASE = (_: { from: numeric, base: number, toBase: number }): string => {
  const { from, base, toBase } = _

  const range = SYMBOLS.split('')
  const fromRange = range.slice(0, base)
  const toRange = range.slice(0, toBase)

  let decValue = `${from}`.split('').reverse().reduce(
    // eslint-disable-next-line max-params
    (carry, digit, index) => {
      const indexOfDigit = fromRange.indexOf(digit)
      if (indexOfDigit === -1) {
        throw new Error(`Invalid digit '${digit}' in '${from}' for base ${base}`)
      }
      carry += indexOfDigit * Math.pow(base, index)
      return carry
    },
    0
  )

  let newValue = ''
  while (decValue > 0) {
    newValue = toRange[decValue % toBase] + newValue
    decValue = (decValue - (decValue % toBase)) / toBase
  }
  return (newValue === '') ? '0' : newValue
}

export const BIG_ADD_10 = (_: { x: numeric, y: numeric }): string => {
  let c = 0
  const r: number[] = []
  const x = `${_.x}`.split('').map(Number)
  const y = `${_.y}`.split('').map(Number)
  while ((x.length !== 0) || (y.length !== 0)) {
    const s = (x.pop() ?? 0) + (y.pop() ?? 0) + c
    r.unshift(s < 10 ? s : s - 10)
    c = s < 10 ? 0 : 1
  }
  if (c !== 0) {
    r.unshift(c)
  }
  return r.join('')
}

export const BIG_16_TO_BIG_10 = (_s: numeric): string => {
  let dec = '0'
  const input = (IS_SET(_s) && (((typeof _s === 'number') && !isNaN(_s)) || (_s !== 'NaN'))) ? `${_s}` : ''
  for (const c of input.split('')) {
    const n = Number.parseInt(c, 16)
    for (let t = 8; t !== 0; t >>= 1) {
      dec = BIG_ADD_10({ x: dec, y: dec })
      if ((n & t) !== 0) {
        dec = BIG_ADD_10({ x: dec, y: '1' })
      }
    }
  }
  return (input !== '') ? dec : ''
}

export const BIG_10_TO_BIG_16 = (_s: numeric): string => {
  const hex: Array<string | undefined> = []
  const sStr = (IS_SET(_s) && (((typeof _s === 'number') && !isNaN(_s)) || (_s !== 'NaN'))) ? `${_s}` : ''
  if (sStr === '0') {
    hex.push('0')
  } else {
    const dec = sStr.split('')
    const sum: number[] = []
    let i: number
    let s: number
    while (dec.length !== 0) {
      s = +(dec.shift() ?? 0)
      for (i = 0; (s !== 0) || i < sum.length; i += 1) {
        s += ((sum[i] ?? 0)) * 10
        sum[i] = s % 16
        s = (s - sum[i]) / 16
      }
    }
    while (sum.length !== 0) {
      hex.push(sum.pop()?.toString(16))
    }
  }
  return hex.join('')
}

export const FROM_BASE_10_TO_16 = (_: numeric): string => BIG_10_TO_BIG_16(_)

export const FROM_BASE_16_TO_10 = (_: numeric): string => BIG_16_TO_BIG_10(_)

export const FROM_BASE_16_TO_CARD_SERIAL = (_: string): string => {
  let res = ''

  if (IS_A_STRING_AND_NOT_EMPTY(_)) {
    const s = `${_}`.padStart(16, '0')

    res = `${s.slice(-16, -8)} ${s.slice(-8)}`
  }

  return res
}

export const FROM_BASE_10_TO_CARD_SERIAL = (_: numeric): string => FROM_BASE_16_TO_CARD_SERIAL(FROM_BASE_10_TO_16(_))

// export const ENV_APP_CSN_DISPLAY = TO_STRING(ENV.APP_CSN_DISPLAY)
// export const ENV_CSN_DEC_NUMBER = ENV_APP_CSN_DISPLAY.toLowerCase() === 'dec_number'
// export const ENV_CSN_HEX_NUMBER = ENV_APP_CSN_DISPLAY.toLowerCase() === 'hex_number'
// export const ENV_CSN_HEX_CARD = ENV_APP_CSN_DISPLAY.toLowerCase() === 'hex_card'

export const FROM_BASE_16_TO_CSN_DISPLAY = (_: { from: numeric, bCsnHexCard: boolean, csnDecNumber: boolean }): string => {
  let res = TO_STRING(_.from)

  if (_.bCsnHexCard) {
    res = FROM_BASE_16_TO_CARD_SERIAL(res)
  } else if (_.csnDecNumber) {
    res = FROM_BASE_16_TO_10(res)
  }

  return res
}

export const FROM_BASE_10_TO_CSN_DISPLAY = (_: { from: numeric, bCsnHexNumber: boolean, bCsnHexCard: boolean }): string => {
  let res = TO_STRING(_.from)

  if (_.bCsnHexNumber || _.bCsnHexCard) {
    res = FROM_BASE_10_TO_16(res)

    if (_.bCsnHexCard) {
      res = FROM_BASE_16_TO_CARD_SERIAL(res)
    }
  }

  return res
}

/**
 * Converts a `Array<T extends Record<PropertyKey, any>>` into a `Record<T[K], T[V]>` using specified keys
 * @param list Array of objects to convert
 * @param keyA Name of the property to use as Record key
 * @param keyB Name of the property to use as Record value
 * @returns Record mapping keyA values to keyB values
 */
export function FROM_LIST_TO_A_B_RECORD<
  T extends Record<PropertyKey, any>,
  K extends keyof T,
  V extends keyof T
> (_: { list: T[] | ReadonlyArray<T>, keyA: K, keyB: V }): Record<T[K], T[V]> {
  const res = GET_ANY_OBJECT()

  for (const row of _.list) {
    res[row[_.keyA]] = row[_.keyB]
  }

  return res as Record<T[K], T[V]>
}

/**
 * Convert a list of options to a mapping of each `{ [value]: label }` in a single object
 * @param optionList list of objects matching `{ value, label }`
 * @returns a `Record` where the keys are the stringified values and the values are the stringified labels
 * @example `[{ value: 1, label: 'One' }, { value: 2, label: 'Two' }]` -> `{ '1': 'One', '2': 'Two' }`
 */
export const FROM_LIST_TO_VALUE_LABEL_RECORD = <T extends Record<PropertyKey, any>> (
  list: T[] | ReadonlyArray<T>
): Record<T['value'], T['label']> => FROM_LIST_TO_A_B_RECORD({ list, keyA: 'value', keyB: 'label' })

export const TO_JSON = (v: any): string => {
  let res: string = ''
  if (IS_SET(v)) {
    try { res = JSON.stringify(v) } catch { }
  }
  return res
}

export const TO_ANY = (json?: string): any => {
  let res: string = ''
  if (IS_A_STRING_AND_NOT_EMPTY(json)) {
    try { res = JSON.parse(TO_STRING(json)) } catch { }
  }
  return res
}

export const TRIM_DATA = (_: { object: any, depth?: number }): any => {
  const o: any = _.object
  const depth = _.depth ?? Number.MAX_SAFE_INTEGER

  let res: any

  if (IS_SET(o)) {
    if (Array.isArray(o)) {
      res = o.map((row: any) => TRIM_DATA({ object: row, depth: depth - 1 }))
    } else if ((o !== null) && (typeof o === 'object')) {
      for (const k in o) {
        const kOfO = k as keyof typeof o

        if (IS_SET(o[kOfO])) {
          if (!IS_SET(res)) {
            res = {}
          }

          res[k] = o[kOfO]

          if (Array.isArray(res[k])) {
            res[k] = res[k].map((row: any) => TRIM_DATA({ object: row, depth: depth - 1 }))
          } else if (typeof res[k] === 'object') {
            if (res[k] instanceof Date) {
              res[k] = res[k].toISOString()
            } else {
              res[k] = TRIM_DATA({ object: res[k], depth: depth - 1 })
            }
          }
        }
      }
    } else {
      res = o
    }
  }

  return res
}

export const BIT_SET = (_: { on: number, at: number, to: 0 | 1 }): number => {
  const mask = 1 << _.at
  return (_.on & ~mask) | ((_.to << _.at) & mask)
}

export const BIT_KILL = (_: { on: number, at: number }): number => {
  const mask = 1 << _.at
  return (_.on & ~mask) | ((0 << _.at) & mask)
}

// BIG base SMALL number input
export const PARSE_INT_FROM_CUSTOM_BASE = (_: { input: string, base: string }): number => _.base.indexOf(_.input)

export const SET_CHAR_AT = (_: { input: string, at: number, set: string }): string => {
  return `${_.input.slice(0, _.at)}${_.set}${_.input.slice(_.at + _.set.length)}`
}

export const BYTE_ARRAY_LIKE_TO_BASE_256 = (o: any): string => {
  return TO_ANY_ARRAY(o).map(v => BASE_CONVERT_BBSN({ n: TO_STRING(v), from: 10, to: 256 })).join('')
}

export const BASE_256_TO_ARRAY_10 = (s: string): number[] => {
  const base = SYMBOLS_BASE_256
  return TO_ANY_ARRAY(s).map((input: string) => PARSE_INT_FROM_CUSTOM_BASE({ input, base }))
}

export const BASE_256_TO_ARRAY_16 = (s: string): string[] => BASE_256_TO_ARRAY_10(s).map(FROM_BASE_10_TO_16)

export const ARRAY_LIKE_10_TO_ARRAY_16 = (b: any): string[] => TO_ANY_ARRAY(b).map(v => FROM_BASE_10_TO_16(TO_STRING(v)))

export const BUFFER_TO_UUID = (b: any): string => {
  const input = TO_ANY_ARRAY(b).slice(0, 16)

  const parts = [
    input.slice(0, 4),
    input.slice(4, 6),
    input.slice(6, 8),
    input.slice(8, 10),
    input.slice(10, 16),
  ]

  return parts.map(p => ARRAY_LIKE_10_TO_ARRAY_16(p).map(s => s.padStart(2, '0')).join('')).join('-')
}

// export const convertUnsignedToSigned2bytes = ( v: number ): number => ( v > 32767 ) ? ( v - 65536 ) : v
// export const convertSignedToUnsigned2bytes = ( v: number ): number => ( v < 0 ) ? (v + 65536) : v

export const SIGNED_TO_UNSIGNED = (_: { value: number, bits: number }): number => {
  const maxUnsignedValue = Math.pow(2, _.bits)
  return (_.value < 0) ? (_.value + maxUnsignedValue) : _.value
}
export const UNSIGNED_TO_SIGNED = (_: { value: number, bits: number }): number => {
  const maxUnsignedValue = Math.pow(2, _.bits)
  return (_.value > ((maxUnsignedValue / 2) - 1)) ? (_.value - maxUnsignedValue) : _.value
}

// Buffer.from( 'test' ).toString( 'ascii' )
// export const BYTE_ARRAY_LIKE_TO_STRING = (b: any): string => TO_ANY_ARRAY(b).map(v => String.fromCharCode(v)).join('')

export const IGNORE_DUPLICATES = (on: (element: any) => any): (elem: any) => boolean => {
  const already = new Set()
  return element => {
    const value = on(element)
    const bNew = !already.has(value)
    bNew && already.add(value)
    return bNew
  }
}

export const TO_UNIQUE_ARRAY = (_: { from: any[], on?: (element: any) => any }): any[] => {
  const { from, on } = _
  return IS_SET(on) ? from.filter(IGNORE_DUPLICATES(on ?? (e => true))) : Array.from(new Set(from))
}

export const PERIOD_EXPORT = (_: { min: any, max: any, label: string }): string => {
  return `${TO_STRING(_.min?.toISOString())}_§§_${TO_STRING(_.max?.toISOString())}_§§_${_.label}`
}
export const PERIOD_IMPORT = (_: { input: string, DateTime: typeof DateTime }): { min: any, max: any, label: string } => {
  const [minIso, maxIso, label] = _.input.split('_§§_')

  const mMin = _.DateTime.fromISO(minIso)
  const mMax = _.DateTime.fromISO(maxIso)

  return { min: IS_ON(mMin.isValid) ? mMin : minIso, max: IS_ON(mMax.isValid) ? mMax : maxIso, label }
}

export const DISPLAY_NS = (ns: any): numeric => (
  ns?.nsName ?? ns?.nsNumber ?? (IS_SET(ns?.nsId) ? `ID ${TO_STRING(ns.nsId)}` : '')
)
export const DISPLAY_NB = (nb: any): numeric => (
  nb?.nbIdentifier ?? nb?.nbNumber ?? (IS_SET(nb?.nbId) ? `ID ${TO_STRING(nb.nbId)}` : '')
)
export const DISPLAY_NS_OR_NB = (_: { ns: any, nb: any }): numeric => {
  let res = DISPLAY_NS(_.ns)
  if (!IS_A_STRING_AND_NOT_EMPTY(res)) {
    res = DISPLAY_NB(_.nb)
  }
  return res
}

export const TO_ANY_ARRAY = (from: any): any[] => {
  let res: any[] = []

  if (IS_AN_ARRAY(from)) {
    res = from
  } else {
    try { res = Array.from(from as ArrayLike<any> | Iterable<any>) } catch { }
  }

  return res
}

export function TO_ARRAY<T> (from: any): T[] {
  let res: T[] = []

  if (IS_AN_ARRAY(from)) {
    res = from
  } else {
    try { res = Array.from(from as ArrayLike<any> | Iterable<any>) } catch { }
  }

  return res
}

export const BASE64_TO_HEX = (base64: any): string => {
  let res = ''

  let error: any

  const base64String = TO_STRING(base64)

  try { res = Buffer.from(base64String, 'base64').toString('hex') } catch (err) { error = err }

  if (IS_SET(error)) {
    let raw = ''

    try { raw = atob(base64String) } catch { }

    const resList: string[] = []

    for (let charPos = 0; charPos < raw.length; charPos += 1) {
      const hex = raw.charCodeAt(charPos).toString(16)
      resList.push(`${(hex.length < 2) ? '0' : ''}${hex}`)
    }

    res = resList.join('')
  }

  return res
}

export const HEX_TO_BASE64 = (hex: any): string => {
  let res = ''

  let error: any

  const hexStr = TO_STRING(hex)

  try { res = Buffer.from(hexStr, 'hex').toString('base64') } catch (err) { error = err }

  if (IS_SET(error)) {
    const resList: string[] = []

    for (let charPos = 0; charPos < hexStr.length; charPos += 2) {
      const hexByte = hexStr.slice(charPos, charPos + 2)
      resList.push(String.fromCharCode(Number.parseInt(hexByte, 16)))
    }

    try { res = btoa(resList.join('')) } catch { }
  }

  return res
}

export const TO_CSV_VALUE = (v: any): string => {
  let res: string = ''

  if (IS_SET(v)) {
    if (IS_A_NUMBER(v)) {
      res = v.toString()
    } else if (IS_A_STRING(v)) {
      res = JSON.stringify(v)
    } else if (IS_A_FUNCTION(v.toString)) {
      res = JSON.stringify(v.toString())
    } else {
      res = v
    }
  }

  return res
}

export const FROM_BASE_64_TO_UINT8_LIST = (base64: string): number[] => {
  let res = new Uint8Array(0)

  let bErr = false

  // * try server-side
  try { res = new Uint8Array(Buffer.from(base64, 'base64')) } catch { bErr = true }

  if (bErr) {
    // * try client-side
    try {
      const raw = atob(base64)

      const resList: number[] = []

      for (let charPos = 0; charPos < raw.length; charPos += 1) {
        resList.push(raw.charCodeAt(charPos))
      }

      res = new Uint8Array(resList)
    } catch {
      bErr = true
    }
  }

  return Array.from(res)
}

export const SANITIZE_STRING_FOR_EXCEL = (s: string): string => {
  return s.normalize('NFKD').replace(/[^\w\s-,_!?[\](){};'"<>.@|\\/]+/gi, '').replace(/[\n\t\s]+/gi, ' ')
}

export const PARSE_BOOL = (v: any): boolean => {
  let res = false

  if (IS_SET(v)) {
    if (IS_A_BOOLEAN(v)) {
      res = v
    } else if (IS_A_NUMBER(v)) {
      res = +v === 1
    } else if (IS_A_STRING(v)) {
      const vl = v.toLowerCase()
      res = (vl === 'true') || (vl === '1') || (vl === 'yes') || (vl === 'on') || (vl === 'y') || (vl === 'ok')
    }
  }

  return res
}
