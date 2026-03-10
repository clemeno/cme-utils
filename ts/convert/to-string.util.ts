import { IS_A_FUNCTION } from '../check/is-a-function.util.js'
import { IS_SET } from '../check/is-set.util.js'

export const TO_STRING = (_: any): string => {
  let res = ''

  if (IS_SET(_) && !Number.isNaN(_)) {
    let bBuffer = false

    try { bBuffer = (typeof Buffer !== 'undefined') && (Buffer as any).isBuffer(_) } catch { }

    if (typeof _ === 'string') {
      res = _
    } else if (bBuffer) {
      res = _.toString()
    } else if (typeof _ === 'object') {
      res = JSON.stringify(_)
    } else if (IS_A_FUNCTION((_).toString)) {
      res = (_).toString()
    }
  }

  return res
}
