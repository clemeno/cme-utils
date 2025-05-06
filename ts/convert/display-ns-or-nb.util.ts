import { IS_A_STRING_AND_NOT_EMPTY } from '../check/is-a-string-and-not-empty.util.js'
import type { numeric } from '../numeric.js'
import { DISPLAY_NB } from './display-nb.util.js'
import { DISPLAY_NS } from './display-ns.util.js'

export const DISPLAY_NS_OR_NB = (_: { ns: any, nb: any }): numeric => {
  let res = DISPLAY_NS(_.ns)

  if (!IS_A_STRING_AND_NOT_EMPTY(res)) {
    res = DISPLAY_NB(_.nb)
  }

  return res
}
