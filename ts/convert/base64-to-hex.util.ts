import { TO_STRING } from './to-string.util.js'

/**
 * Converts a base 64 string into a hexadecimal string, with Buffer when given and atob otherwise.
 * An invalid base 64 string gives an empty string.
 * @param _ - The base 64 input and the optional Buffer class
 * @param _.Buffer - The Node `Buffer` class, optional: `atob` is the fallback
 * @param _.base64 - The base 64 string
 * @returns The hexadecimal string, lowercase, two digits per byte
 * @example
 * ```typescript
 * BASE64_TO_HEX({ Buffer, base64: 'SGk=' }) // returns '4869'
 * BASE64_TO_HEX({ base64: 'SGk=' }) // returns '4869'
 * BASE64_TO_HEX({ base64: '' }) // returns ''
 * BASE64_TO_HEX({ base64: '!!' }) // returns ''
 * ```
 */
export function BASE64_TO_HEX<TypeofBuffer = any> (_: {
  Buffer?: TypeofBuffer
  base64: any
}): string {
  let res = ''

  const base64String = TO_STRING(_.base64)

  // * provide Buffer
  if (_.Buffer != null) {
    res = (_.Buffer as any).from(base64String, 'base64').toString('hex')
  } else {
    let raw = ''

    // an invalid base 64 string makes atob throw: the result stays empty
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
