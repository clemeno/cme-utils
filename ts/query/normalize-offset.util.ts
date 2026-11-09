import { TO_NUMBER } from '../convert/to-number.util.js'
import { TO_STRING } from '../convert/to-string.util.js'
import type { numeric } from '../numeric.js'

/**
 * Gets the SQL offset of a page: `(page - 1) * perPage`, as a string
 * @param _ - The normalized page and per-page values
 * @param _.normalizedPage - The page number, from `NORMALIZE_PAGE`
 * @param _.normalizedPerPage - The per-page value, from `NORMALIZE_PER_PAGE`
 * @returns The offset as a string
 * @example
 * ```typescript
 * NORMALIZE_OFFSET({ normalizedPage: '3', normalizedPerPage: '10' }) // returns '20'
 * NORMALIZE_OFFSET({ normalizedPage: 1, normalizedPerPage: 10 }) // returns '0'
 * ```
 */
export function NORMALIZE_OFFSET (_: { normalizedPage: numeric, normalizedPerPage: numeric }): string {
  return TO_STRING((TO_NUMBER(_.normalizedPage) - 1) * TO_NUMBER(_.normalizedPerPage))
}
