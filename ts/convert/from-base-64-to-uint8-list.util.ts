/**
 * Decodes a base 64 string into a list of byte values, with Buffer when given and atob otherwise.
 * An invalid base 64 string gives an empty list.
 * @param _ - The base 64 input and the optional Buffer class
 * @param _.Buffer - The Node `Buffer` class, optional: `atob` is the fallback
 * @param _.base64 - The base 64 string
 * @returns The bytes as an array of numbers 0..255
 * @example
 * ```typescript
 * FROM_BASE_64_TO_UINT8_LIST({ Buffer, base64: 'SGk=' }) // returns [72, 105]
 * FROM_BASE_64_TO_UINT8_LIST({ base64: 'SGk=' }) // returns [72, 105]
 * FROM_BASE_64_TO_UINT8_LIST({ base64: '' }) // returns []
 * FROM_BASE_64_TO_UINT8_LIST({ base64: '!!' }) // returns []
 * ```
 */
export function FROM_BASE_64_TO_UINT8_LIST<TypeofBuffer = any> (_: {
  Buffer?: TypeofBuffer
  base64: string
}): number[] {
  let res = new Uint8Array(0)

  // * provide Buffer
  if (_.Buffer != null) {
    res = new Uint8Array((_.Buffer as any).from(_.base64, 'base64'))
  } else {
    // an invalid base 64 string makes atob throw: the result stays empty
    try {
      const raw = atob(_.base64)

      const resList: number[] = []

      for (let charPos = 0; charPos < raw.length; charPos += 1) {
        resList.push(raw.charCodeAt(charPos))
      }

      res = new Uint8Array(resList)
    } catch { }
  }

  return Array.from(res)
}
