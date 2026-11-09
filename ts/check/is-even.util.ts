import { TO_NUMBER } from '../convert/to-number.util.js'
import { IS_NUMERIC } from '../number/is-numeric.util.js'

/** CHECK (is an even `numeric` value) */
export function IS_EVEN (v: any): boolean {
  let res = false

  if (IS_NUMERIC(v)) {
    res = (TO_NUMBER(v) % 2) === 0
  }

  return res
}
