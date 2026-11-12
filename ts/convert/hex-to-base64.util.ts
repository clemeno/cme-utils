import { TO_STRING } from './to-string.util.js'

/**
 * Converts a hexadecimal string into a base 64 string, with Buffer when given and btoa otherwise.
 * @param _ - The hexadecimal input and the Buffer class
 * @param _.Buffer - The Node `Buffer` class; when it is missing, `btoa` is the fallback
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

  const hexStr = TO_STRING(_.hex)

  if (_.Buffer != null) {
    res = (_.Buffer as any).from(hexStr, 'hex').toString('base64')
  } else {
    const resList: string[] = []

    for (let charPos = 0; charPos < hexStr.length; charPos += 2) {
      const hexByte = hexStr.slice(charPos, charPos + 2)
      resList.push(String.fromCharCode(Number.parseInt(hexByte, 16)))
    }

    // an invalid hex digit ('-1' gives the char code 0xffff) makes btoa throw: the result stays empty
    try { res = btoa(resList.join('')) } catch { }
  }

  return res
}
