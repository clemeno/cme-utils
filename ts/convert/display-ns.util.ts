import { IS_SET } from '../check/is-set.util.js'
import type { numeric } from '../numeric.js'
import { TO_STRING } from './to-string.util.js'

export const DISPLAY_NS = (ns: any): numeric => (
  ns?.nsName ?? ns?.nsNumber ?? (IS_SET(ns?.nsId) ? `ID ${TO_STRING(ns.nsId)}` : '')
)
