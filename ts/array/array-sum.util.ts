import { IS_NUMERIC } from '../check/is-numeric.util.js'
import { IS_SET } from '../check/is-set.util.js'
import { TO_NUMBER } from '../convert/to-number.util.js'
import type { numeric } from '../numeric.js'

export const ARRAY_SUM = (a: numeric[]): number => {
  let sum = NaN

  for (const v of a) {
    if (IS_NUMERIC(v)) {
      const nv = TO_NUMBER(v)

      if (!IS_SET(sum)) {
        sum = nv
      } else {
        sum += nv
      }
    }
  }

  return sum
}
