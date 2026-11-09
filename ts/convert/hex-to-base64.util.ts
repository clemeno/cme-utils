import { IS_SET } from '../check/is-set.util.js'
import { TO_STRING } from './to-string.util.js'

/**
 * Converts a hexadecimal string into a base 64 string, with Buffer when given and btoa otherwise.
 * @param _ - The hexadecimal input and the Buffer class
 * @param _.Buffer - The Node `Buffer` class; when it is not usable, `btoa` is the fallback
 * @param _.hex - The hexadecimal string, two digits per byte
 * @returns The base 64 string, empty for an empty input
 * @example
 * ```typescript
 * HEX_TO_BASE64({ Buffer, hex: '4869' }) // returns 'SGk='
 * HEX_TO_BASE64({ Buffer: undefined, hex: '4869' }) // returns 'SGk='
 * HEX_TO_BASE64({ Buffer, hex: '' }) // returns ''
 * ```
 */
export function HEX_TO_BASE64<TypeofBuffer = any> (_: {
  Buffer: TypeofBuffer,
  hex: any
}): string {
  let res = ''

  let error: any

  const hexStr = TO_STRING(_.hex)

  try { res = (_.Buffer as any).from(hexStr, 'hex').toString('base64') } catch (err) { error = err }

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
