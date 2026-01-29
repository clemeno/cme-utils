import { IS_SET } from '../check/is-set.util.js'

export const TO_JSON = (v: unknown): string => {
  let res: string = ''

  if (IS_SET(v)) {
    try {
      const json = JSON.stringify(v)
      res = json !== undefined ? json : ''
    } catch { }
  }

  return res
}
