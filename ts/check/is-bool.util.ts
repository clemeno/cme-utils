import type { bool } from '../bool.js'
import { TO_NUMBER } from '../convert/to-number.util.js'
import { IS_NUMERIC } from '../number/is-numeric.util.js'

export function IS_BOOL (v: any): v is bool {
  let res = (v === true) || (v === false)

  if (IS_NUMERIC(v)) {
    res = (TO_NUMBER(v) === 0) || (TO_NUMBER(v) === 1)
  } else if (typeof v === 'string') {
    const vl = v.toLowerCase()
    res = (
      (vl === '1') ||
      (vl === '0') ||
      (vl === 'true') ||
      (vl === 'false') ||
      (vl === 'yes') ||
      (vl === 'no') ||
      (vl === 'on') ||
      (vl === 'off') ||
      (vl === 'y') ||
      (vl === 'n') ||
      (vl === 'ok') ||
      (vl === 'ko')
    )
  }

  return res
}
