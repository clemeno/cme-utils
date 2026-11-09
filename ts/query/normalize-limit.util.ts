import { TO_STRING } from '../convert/to-string.util.js'
import type { numeric } from '../numeric.js'

/**
 * Gets the SQL limit of a page: the normalized per-page value, as a string
 * @param normalizedPerPage - The per-page value, from `NORMALIZE_PER_PAGE`
 * @returns The limit as a string
 * @example
 * ```typescript
 * NORMALIZE_LIMIT('10') // returns '10'
 * NORMALIZE_LIMIT(25) // returns '25'
 * ```
 */
export function NORMALIZE_LIMIT (normalizedPerPage: numeric): string {
  return TO_STRING(normalizedPerPage)
}
