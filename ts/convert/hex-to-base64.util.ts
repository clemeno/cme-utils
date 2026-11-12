import { TO_STRING } from './to-string.util.js'

/**
 * Converts a hexadecimal string into a base 64 string, with Buffer when given and btoa otherwise.
 * @param _ - The hexadecimal input and the optional Buffer class
 * @param _.Buffer - The Node `Buffer` class; when it is missing, `btoa` is the fallback
 * @param _.hex - The hexadecimal string, two digits per byte
 * @returns The base 64 string of the bytes before the first pair that is not two hex digits, empty for an empty input
 * @example
 * ```typescript
 * HEX_TO_BASE64({ Buffer, hex: '4869' }) // returns 'SGk='
 * HEX_TO_BASE64({ Buffer: undefined, hex: '4869' }) // returns 'SGk='
 * HEX_TO_BASE64({ Buffer, hex: '' }) // returns ''
 * HEX_TO_BASE64({ hex: '48zz' }) // returns 'SA=='
 * ```
 */
export function HEX_TO_BASE64<TypeofBuffer = any> (_: {
  Buffer?: TypeofBuffer,
  hex: any
}): string {
  let res = ''

  const hexStr = TO_STRING(_.hex)

  if (_.Buffer != null) {
    res = (_.Buffer as any).from(hexStr, 'hex').toString('base64')
  } else {
    // like Buffer, it stops at the first pair that is not two hex digits, so btoa only gets char codes 0 to 255
    const validHex = /^(?:[0-9a-f]{2})*/i.exec(hexStr)?.[0] ?? ''
    const resList: string[] = []

    for (let charPos = 0; charPos < validHex.length; charPos += 2) {
      const hexByte = validHex.slice(charPos, charPos + 2)
      resList.push(String.fromCharCode(Number.parseInt(hexByte, 16)))
    }

    res = btoa(resList.join(''))
  }

  return res
}
