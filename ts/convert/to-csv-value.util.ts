import { IS_A_FUNCTION } from '../check/is-a-function.util.js'
import { IS_A_NUMBER } from '../check/is-a-number.util.js'
import { IS_A_STRING } from '../check/is-a-string.util.js'
import { IS_SET } from '../check/is-set.util.js'

export const TO_CSV_VALUE = (v: any): string => {
  let res: string = ''

  if (IS_SET(v)) {
    if (IS_A_NUMBER(v)) {
      res = v.toString()
    } else if (IS_A_STRING(v)) {
      res = JSON.stringify(v)
    } else if (IS_A_FUNCTION(v.toString)) {
      res = JSON.stringify(v.toString())
    } else {
      res = v
    }
  }

  return res
}
