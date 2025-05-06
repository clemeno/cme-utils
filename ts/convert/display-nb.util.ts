import { IS_SET } from '../check/is-set.util.js'
import type { numeric } from '../numeric.js'
import { TO_STRING } from './to-string.util.js'

export const DISPLAY_NB = (nb: any): numeric => (
  nb?.nbIdentifier ?? nb?.nbNumber ?? (IS_SET(nb?.nbId) ? `ID ${TO_STRING(nb.nbId)}` : '')
)
