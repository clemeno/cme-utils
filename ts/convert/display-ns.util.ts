import { IS_SET } from '../check/is-set.util.js'
import type { numeric } from '../numeric.js'
import { TO_STRING } from './to-string.util.js'

/**
 * Gets the display value of an "ns" object: its `nsName`, else its `nsNumber`, else `ID <nsId>`.
 * @param ns - The object holding `nsName`, `nsNumber` or `nsId`
 * @returns The first value found, or an empty string when none is set
 * @example
 * ```typescript
 * DISPLAY_NS({ nsName: 'Main' }) // returns 'Main'
 * DISPLAY_NS({ nsNumber: 3 }) // returns 3
 * DISPLAY_NS({ nsId: 9 }) // returns 'ID 9'
 * DISPLAY_NS(undefined) // returns ''
 * ```
 */
export function DISPLAY_NS (ns: any): numeric {
  return (
    ns?.nsName ?? ns?.nsNumber ?? (IS_SET(ns?.nsId) ? `ID ${TO_STRING(ns.nsId)}` : '')
  )
}
