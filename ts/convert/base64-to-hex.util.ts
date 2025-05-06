import { IS_SET } from '../check/is-set.util.js'
import { TO_STRING } from './to-string.util.js'

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
