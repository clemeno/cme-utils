import { IS_SET } from '../check/is-set.util.js'
import { TO_STRING } from './to-string.util.js'

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
