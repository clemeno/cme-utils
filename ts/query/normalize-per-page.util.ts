import type { numeric } from '../numeric.js'
import { NORMALIZE_N_1 } from './normalize-n-1.util.js'

/**
 * Normalizes a per-page value: at least 1; `1` when it is not numeric
 * @param perPage - The requested number of rows per page
 * @returns The per-page value as a string
 * @example
 * ```typescript
 * NORMALIZE_PER_PAGE('10') // returns '10'
 * NORMALIZE_PER_PAGE(0) // returns '1'
 * NORMALIZE_PER_PAGE('abc') // returns '1'
 * ```
 */
export function NORMALIZE_PER_PAGE (perPage: numeric): string {
  return NORMALIZE_N_1({ n: perPage, max: Number.MAX_SAFE_INTEGER })
}
