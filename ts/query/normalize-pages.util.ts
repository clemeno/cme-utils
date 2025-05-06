import { TO_NUMBER } from '../convert/to-number.util.js'
import { TO_STRING } from '../convert/to-string.util.js'
import type { numeric } from '../numeric.js'

export const NORMALIZE_PAGES = (_: { normalizedPerPage: numeric, filteredCount: numeric }): string => {
  return TO_STRING(Math.ceil(TO_NUMBER(_.filteredCount ?? 1) / TO_NUMBER(_.normalizedPerPage ?? 1)))
}
