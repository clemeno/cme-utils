import { IS_A_STRING_AND_NOT_EMPTY } from '../check/is-a-string-and-not-empty.util.js'
import { TO_STRING } from './to-string.util.js'

export const TO_ANY = (json?: string): any => {
  let res: string = ''

  if (IS_A_STRING_AND_NOT_EMPTY(json)) {
    try { res = JSON.parse(TO_STRING(json)) } catch { }
  }

  return res
}
