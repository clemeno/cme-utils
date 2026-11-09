import { TO_NUMBER } from '../convert/to-number.util.js'
import { TO_STRING } from '../convert/to-string.util.js'
import type { numeric } from '../numeric.js'

/**
 * Counts the pages needed to show the filtered rows: `ceil(filteredCount / perPage)`, as a string
 * @param _ - The row count and the per-page value
 * @param _.normalizedPerPage - The per-page value, from `NORMALIZE_PER_PAGE`
 * @param _.filteredCount - The number of rows after filtering
 * @returns The number of pages as a string
 * @example
 * ```typescript
 * NORMALIZE_PAGES({ normalizedPerPage: '10', filteredCount: '101' }) // returns '11'
 * NORMALIZE_PAGES({ normalizedPerPage: 10, filteredCount: 100 }) // returns '10'
 * NORMALIZE_PAGES({ normalizedPerPage: '10', filteredCount: '0' }) // returns '0'
 * ```
 */
export function NORMALIZE_PAGES (_: { normalizedPerPage: numeric, filteredCount: numeric }): string {
  return TO_STRING(Math.ceil(TO_NUMBER(_.filteredCount ?? 1) / TO_NUMBER(_.normalizedPerPage ?? 1)))
}
