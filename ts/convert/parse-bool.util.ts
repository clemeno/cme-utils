import { IS_A_BOOLEAN } from '../check/is-a-boolean.util.js'
import { IS_A_NUMBER } from '../check/is-a-number.util.js'
import { IS_A_STRING } from '../check/is-a-string.util.js'
import { IS_SET } from '../check/is-set.util.js'

export const PARSE_BOOL = (v: any): boolean => {
  let res = false

  if (IS_SET(v)) {
    if (IS_A_BOOLEAN(v)) {
      res = v
    } else if (IS_A_NUMBER(v)) {
      res = +v === 1
    } else if (IS_A_STRING(v)) {
      const vl = v.toLowerCase()
      res = (vl === 'true') || (vl === '1') || (vl === 'yes') || (vl === 'on') || (vl === 'y') || (vl === 'ok')
    }
  }

  return res
}
