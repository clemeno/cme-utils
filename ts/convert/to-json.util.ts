import { IS_SET } from '../check/is-set.util.js'

export const TO_JSON = (v: any): string => {
  let res: string = ''

  if (IS_SET(v)) {
    try { res = JSON.stringify(v) } catch { }
  }

  return res
}
