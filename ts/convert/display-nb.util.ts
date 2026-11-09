import { IS_SET } from '../check/is-set.util.js'
import type { numeric } from '../numeric.js'
import { TO_STRING } from './to-string.util.js'

/**
 * Gets the display value of an "nb" object: its `nbIdentifier`, else its `nbNumber`, else `ID <nbId>`.
 * @param nb - The object holding `nbIdentifier`, `nbNumber` or `nbId`
 * @returns The first value found, or an empty string when none is set
 * @example
 * ```typescript
 * DISPLAY_NB({ nbIdentifier: 'A1' }) // returns 'A1'
 * DISPLAY_NB({ nbNumber: 12 }) // returns 12
 * DISPLAY_NB({ nbId: 7 }) // returns 'ID 7'
 * DISPLAY_NB(null) // returns ''
 * ```
 */
export function DISPLAY_NB (nb: any): numeric {
  return (
    nb?.nbIdentifier ?? nb?.nbNumber ?? (IS_SET(nb?.nbId) ? `ID ${TO_STRING(nb.nbId)}` : '')
  )
}
