import { IS_A_FUNCTION } from '../check/is-a-function.util.js'
import { IS_SET } from '../check/is-set.util.js'

export const TO_STRING = (_: any): string => {
  let res = ''

  if (IS_SET(_) && !Number.isNaN(_)) {
    if ((typeof _ === 'string')) {
      res = _
    } else if (Buffer.isBuffer(_)) {
      res = _.toString()
    } else if (typeof _ === 'object' && _ !== null) {
      res = JSON.stringify(_)
    } else if (IS_A_FUNCTION((_).toString)) {
      res = (_).toString()
    }
  }

  return res
}
