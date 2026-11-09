import type { bool } from '../bool.js'
import { TO_NUMBER } from '../convert/to-number.util.js'
import { IS_NUMERIC } from '../number/is-numeric.util.js'

/**
 * CHECK (is a `bool`-like value: `true`/`false`, `0`/`1`, or a string such as `yes`/`no`, `on`/`off`, `y`/`n`, `ok`/`ko`, in any case)
 * @param v - The value to check
 * @returns `true` when `v` can be read as a boolean
 * @example
 * ```typescript
 * IS_BOOL(true) // returns true
 * IS_BOOL(1) // returns true
 * IS_BOOL('Yes') // returns true
 * IS_BOOL('off') // returns true
 * IS_BOOL(2) // returns false
 * IS_BOOL('maybe') // returns false
 * IS_BOOL(null) // returns false
 * ```
 */
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
