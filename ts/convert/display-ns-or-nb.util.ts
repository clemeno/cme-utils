import { IS_A_STRING_AND_NOT_EMPTY } from '../string/is-a-string-and-not-empty.util.js'
import type { numeric } from '../numeric.js'
import { DISPLAY_NB } from './display-nb.util.js'
import { DISPLAY_NS } from './display-ns.util.js'

/**
 * Gets the display value of an "ns" object, or of an "nb" object when the "ns" one is not a non-empty string.
 * @param _ - The two objects
 * @param _.ns - The object read by DISPLAY_NS
 * @param _.nb - The object read by DISPLAY_NB, used when `ns` gives no non-empty string
 * @returns The display value, an empty string when none is set
 * @example
 * ```typescript
 * DISPLAY_NS_OR_NB({ ns: { nsName: 'Main' }, nb: { nbNumber: 1 } }) // returns 'Main'
 * DISPLAY_NS_OR_NB({ ns: null, nb: { nbNumber: 1 } }) // returns 1
 * DISPLAY_NS_OR_NB({ ns: null, nb: null }) // returns ''
 * ```
 */
export function DISPLAY_NS_OR_NB (_: { ns: any, nb: any }): numeric {
  let res = DISPLAY_NS(_.ns)

  if (!IS_A_STRING_AND_NOT_EMPTY(res)) {
    res = DISPLAY_NB(_.nb)
  }

  return res
}
