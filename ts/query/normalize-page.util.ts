import type { numeric } from '../numeric.js'
import { NORMALIZE_N_1 } from './normalize-n-1.util.js'

/**
 * Normalizes a page number: at least 1 and at most the number of pages; `1` when it is not numeric
 * @param _ - The page and the number of pages
 * @param _.page - The requested page number
 * @param _.normalizedPages - The number of pages, from `NORMALIZE_PAGES`
 * @returns The page number as a string
 * @example
 * ```typescript
 * NORMALIZE_PAGE({ page: '2', normalizedPages: '5' }) // returns '2'
 * NORMALIZE_PAGE({ page: '99', normalizedPages: '5' }) // returns '5'
 * NORMALIZE_PAGE({ page: '0', normalizedPages: '5' }) // returns '1'
 * NORMALIZE_PAGE({ page: 'abc', normalizedPages: '5' }) // returns '1'
 * ```
 */
export function NORMALIZE_PAGE (_: { page: numeric, normalizedPages: numeric }): string {
  return NORMALIZE_N_1({ n: _.page, max: _.normalizedPages })
}
