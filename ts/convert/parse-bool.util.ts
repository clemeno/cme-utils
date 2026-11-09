import { IS_A_BOOLEAN } from '../check/is-a-boolean.util.js'
import { IS_A_NUMBER } from '../check/is-a-number.util.js'
import { IS_A_STRING } from '../string/is-a-string.util.js'
import { IS_SET } from '../check/is-set.util.js'
import { TO_NUMBER } from './to-number.util.js'

/**
 * Parses a loose boolean: a boolean, the number 1, or one of the strings
 * `true`, `1`, `yes`, `on`, `y`, `ok` (any case) give `true`; everything else gives `false`.
 * @param v - The value to parse
 * @returns `true` or `false`, `false` for null, undefined and unknown values
 * @example
 * ```typescript
 * PARSE_BOOL('yes') // returns true
 * PARSE_BOOL(1) // returns true
 * PARSE_BOOL('Off') // returns false
 * PARSE_BOOL(2) // returns false
 * PARSE_BOOL(null) // returns false
 * ```
 */
export function PARSE_BOOL (v: any): boolean {
  let res = false

  if (IS_SET(v)) {
    if (IS_A_BOOLEAN(v)) {
      res = v
    } else if (IS_A_NUMBER(v)) {
      res = TO_NUMBER(v) === 1
    } else if (IS_A_STRING(v)) {
      const vl = v.toLowerCase()
      res = (vl === 'true') || (vl === '1') || (vl === 'yes') || (vl === 'on') || (vl === 'y') || (vl === 'ok')
    }
  }

  return res
}
