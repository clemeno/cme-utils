import { IS_AN_ARRAY_AND_NOT_EMPTY } from '../array/is-an-array-and-not-empty.util.js'
import { IS_NULL } from '../check/is-null.util.js'
import { IS_ON } from '../check/is-on.util.js'
import { IS_SET } from '../check/is-set.util.js'
import { IS_A_STRING_AND_NOT_EMPTY } from '../string/is-a-string-and-not-empty.util.js'
import { TO_NUMBER } from './to-number.util.js'
import { TO_STRING } from './to-string.util.js'

const _PRIMITIVE_CONSTRUCTOR_TYPES = ['boolean', 'number', 'string', 'array'] as const

const _DTYPE_CONVERTERS: Partial<Record<string, (x: string) => unknown>> = {
  i: (x: string): number => parseInt(x, 10),
  b: (x: string): boolean => parseInt(x, 10) !== 0,
  d: (x: string): number => parseFloat(x),
}

/**
 * Serializes a JavaScript value to a PHP `serialize()` compatible string.
 * Handles null, boolean, number (int/float), string, arrays, and plain objects.
 * Functions are omitted (serialized as an empty string).
 * @param mixedValue - The value to serialize
 * @returns PHP-serialized string representation
 * @example
 * ```typescript
 * TO_PHP_SERIALIZE(null)              // returns 'N;'
 * TO_PHP_SERIALIZE(true)              // returns 'b:1;'
 * TO_PHP_SERIALIZE(42)                // returns 'i:42;'
 * TO_PHP_SERIALIZE(3.14)              // returns 'd:3.14;'
 * TO_PHP_SERIALIZE('hello')           // returns 's:5:"hello";'
 * TO_PHP_SERIALIZE([1, 'two'])        // returns 'a:2:{i:0;i:1;i:1;s:3:"two";}'
 * ```
 */
export function TO_PHP_SERIALIZE (mixedValue: unknown): string {
  const _utf8Size = (str: string): number => {
    let size = 0

    for (let i = 0; i < str.length; i += 1) {
      const code = str.charCodeAt(i)
      if (code < 0x0080) {
        size += 1
      } else if (code < 0x0800) {
        size += 2
      } else {
        size += 3
      }
    }

    return size
  }

  const _getType = (inp: unknown): string => {
    let type: string = IS_NULL(inp) ? 'null' : typeof inp
    let match

    if (IS_SET(inp) && (type === 'object')) {
      const inpObj = inp as Record<string, unknown>

      if (!IS_ON(inpObj['constructor'])) {
        type = 'object'
      } else {
        let cons = TO_STRING(inpObj['constructor'])

        match = cons.match(/(\w+)\(/)

        if (IS_AN_ARRAY_AND_NOT_EMPTY(match)) {
          cons = match[1].toLowerCase()
        }

        const _t = TO_STRING(_PRIMITIVE_CONSTRUCTOR_TYPES.find(t => cons === t))

        if (IS_A_STRING_AND_NOT_EMPTY(_t)) {
          type = _t
        }
      }
    }

    return type
  }

  const type = _getType(mixedValue)

  let val = 'N'

  if ('function' === type) {
    val = ''
  } else if ('boolean' === type) {
    val = 'b:' + (IS_ON(mixedValue) ? '1' : '0')
  } else if ('number' === type) {
    val = `${(Math.round(mixedValue as number) === TO_NUMBER(mixedValue)) ? 'i' : 'd'}:${TO_STRING(mixedValue)}`
  } else if ('string' === type) {
    val = `s:${_utf8Size(mixedValue as string)}:"${TO_STRING(mixedValue)}"`
  } else if (('array' === type) || ('object' === type)) {
    val = 'a'

    let ktype = ''
    let vals = ''
    let count = 0

    const mixedObj = mixedValue as Record<string, unknown>

    for (const key of Object.keys(mixedObj)) {
      if (IS_SET(mixedObj[key])) {
        ktype = _getType(mixedObj[key])

        if ('function' !== ktype) {
          const okey = (IS_ON(key.match(/^[0-9]+$/)) ? parseInt(key, 10) : key)

          vals = `${vals}${TO_PHP_SERIALIZE(okey)}${TO_PHP_SERIALIZE(mixedObj[key])}`

          count += 1
        }
      }
    }

    val = `${val}:${TO_STRING(count)}:{${TO_STRING(vals)}}`
  }

  if ((type !== 'object') && (type !== 'array')) {
    val = `${val};`
  }

  return val
}

/**
 * Decodes a raw UTF-8 byte-string (as returned inside PHP serialized data) to a
 * JavaScript string with the correct Unicode characters.
 * @param strData - The raw UTF-8 encoded byte string to decode
 * @returns Decoded Unicode string
 * @example
 * ```typescript
 * TO_UTF8_DECODED('hello')   // returns 'hello'
 * TO_UTF8_DECODED('')        // returns ''
 * ```
 */
export function TO_UTF8_DECODED (strData: unknown): string {
  const tmpArr: string[] = []

  let i = 0
  let ac = 0
  let c1 = 0
  let c2 = 0
  let c3 = 0

  const data = TO_STRING(strData)

  while (i < data.length) {
    c1 = data.charCodeAt(i)

    if (c1 < 128) {
      tmpArr[ac] = String.fromCharCode(c1)

      ac += 1

      i += 1
    } else if ((c1 > 191) && (c1 < 224)) {
      c2 = data.charCodeAt(i + 1)

      tmpArr[ac] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63))

      ac += 1

      i += 2
    } else {
      c2 = data.charCodeAt(i + 1)
      c3 = data.charCodeAt(i + 2)

      tmpArr[ac] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))

      ac += 1

      i += 3
    }
  }

  return tmpArr.join('')
}

/**
 * Parses a PHP `serialize()` string back into the equivalent JavaScript value.
 * Supports null (`N`), boolean (`b`), integer (`i`), float (`d`), string (`s`),
 * and array/object (`a`) types.
 * Throws on malformed input or unsupported type tokens.
 * @param _data - A PHP-serialized string
 * @returns The deserialized JavaScript value
 * @example
 * ```typescript
 * FROM_PHP_UNSERIALIZE('N;')                          // returns null
 * FROM_PHP_UNSERIALIZE('b:1;')                        // returns true
 * FROM_PHP_UNSERIALIZE('i:42;')                       // returns 42
 * FROM_PHP_UNSERIALIZE('s:5:"hello";')                // returns 'hello'
 * FROM_PHP_UNSERIALIZE('a:2:{i:0;i:1;i:1;s:3:"two";}') // returns { 0: 1, 1: 'two' }
 * ```
 */
export function FROM_PHP_UNSERIALIZE (_data: string): unknown {
  const utf8Overhead = (chr: string): number => {
    const code = chr.charCodeAt(0)
    return (code < 0x0080) ? 0 : ((code < 0x0800) ? 1 : 2)
  }

  function readUntil (_: { data: string, offset: number, stopchr: string }): [number, string] {
    const { data, offset, stopchr } = _

    const buf: string[] = []

    let chr = data.slice(offset, offset + 1)

    let i = 2

    while (chr !== stopchr) {
      if ((i + offset) > data.length) {
        throw new Error('PHP unserialize: unexpected end of data')
      }

      buf.push(chr)

      chr = data.slice(offset + (i - 1), offset + i)

      i += 1
    }

    return [buf.length, buf.join('')]
  }

  function readChrs (_: { data: string, offset: number, len: number }): [number, string] {
    const { data, offset, len } = _

    let l = len

    const buf: string[] = []

    for (let i = 0; i < l; i += 1) {
      const chr = data.slice(offset + (i - 1), offset + i)

      buf.push(chr)

      l -= utf8Overhead(chr)
    }

    return [buf.length, buf.join('')]
  }

  function _unserialize (_: { data: string, _offset: number }): [string, number, unknown] {
    const { data, _offset } = _

    const offset = !IS_ON(_offset) ? 0 : _offset

    const dtype = (data.slice(offset, offset + 1)).toLowerCase()

    let dataoffset = offset + 2

    let readData: [number, string]
    let chrs = 0
    let readdata: unknown

    let ccount: [number, string]
    let stringlength: string

    let keyandchrs: [number, string]
    let keys = ''

    if (('i' === dtype) || ('b' === dtype) || ('d' === dtype)) {
      readData = readUntil({ data, offset: dataoffset, stopchr: ';' })
      chrs = readData[0]
      readdata = readData[1]

      dataoffset += chrs + 1
    } else if ('n' === dtype) {
      readdata = null
    } else if ('s' === dtype) {
      ccount = readUntil({ data, offset: dataoffset, stopchr: ':' })
      chrs = ccount[0]
      stringlength = ccount[1]

      dataoffset += chrs + 2

      readData = readChrs({ data, offset: dataoffset + 1, len: parseInt(stringlength, 10) })
      chrs = readData[0]
      readdata = readData[1]

      dataoffset += chrs + 2

      if ((chrs !== parseInt(stringlength, 10)) && (chrs !== (readdata as string).length)) {
        throw new Error('PHP unserialize: string length mismatch')
      }

      readdata = TO_UTF8_DECODED(readdata)
    } else if ('a' === dtype) {
      const readRecord: Record<string, unknown> = {}

      keyandchrs = readUntil({ data, offset: dataoffset, stopchr: ':' })
      chrs = keyandchrs[0]
      keys = keyandchrs[1]

      dataoffset += chrs + 2

      for (let i = 0; i < parseInt(keys, 10); i += 1) {
        const kprops = _unserialize({ data, _offset: dataoffset })
        const kchrs = kprops[1]
        const key = kprops[2]

        dataoffset += kchrs

        const vprops = _unserialize({ data, _offset: dataoffset })
        const vchrs = vprops[1]
        const value = vprops[2]

        dataoffset += vchrs

        readRecord[TO_STRING(key)] = value
      }

      readdata = readRecord

      dataoffset += 1
    } else {
      throw new Error(`PHP unserialize: unknown data type '${dtype}'`)
    }

    const _convert = _DTYPE_CONVERTERS[dtype]

    return [dtype, dataoffset - offset, _convert !== undefined ? _convert(readdata as string) : readdata]
  }

  return _unserialize({ data: TO_STRING(_data), _offset: 0 })[2]
}
