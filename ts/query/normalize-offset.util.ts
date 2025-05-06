import { TO_NUMBER } from '../convert/to-number.util.js'
import { TO_STRING } from '../convert/to-string.util.js'
import type { numeric } from '../numeric.js'

export const NORMALIZE_OFFSET = (_: { normalizedPage: numeric, normalizedPerPage: numeric }): string => {
  return TO_STRING((TO_NUMBER(_.normalizedPage) - 1) * TO_NUMBER(_.normalizedPerPage))
}
