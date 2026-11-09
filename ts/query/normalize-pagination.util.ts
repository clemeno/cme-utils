import type { numeric } from '../numeric.js'
import { NORMALIZE_LIMIT } from './normalize-limit.util.js'
import { NORMALIZE_OFFSET } from './normalize-offset.util.js'
import { NORMALIZE_PAGE } from './normalize-page.util.js'
import { NORMALIZE_PAGES } from './normalize-pages.util.js'
import { NORMALIZE_PER_PAGE } from './normalize-per-page.util.js'

/**
 * Normalizes pagination inputs into the page, per-page, page count, SQL offset and SQL limit, all as strings
 * @param _ - The pagination inputs
 * @param _.page - The requested page number
 * @param _.perPage - The requested number of rows per page
 * @param _.filteredCount - The number of rows after filtering
 * @returns The normalized `normalizedPage`, `normalizedPerPage`, `normalizedPages`, `normalizedOffset` and `normalizedLimit`
 * @example
 * ```typescript
 * NORMALIZE_PAGINATION({ page: '3', perPage: '10', filteredCount: '25' }) // returns { normalizedPage: '3', normalizedPerPage: '10', normalizedPages: '3', normalizedOffset: '20', normalizedLimit: '10' }
 * NORMALIZE_PAGINATION({ page: '99', perPage: '10', filteredCount: '20' }) // returns { normalizedPage: '2', normalizedPerPage: '10', normalizedPages: '2', normalizedOffset: '10', normalizedLimit: '10' }
 * NORMALIZE_PAGINATION({ page: 'abc', perPage: 'x', filteredCount: '25' }) // returns { normalizedPage: '1', normalizedPerPage: '1', normalizedPages: '25', normalizedOffset: '0', normalizedLimit: '1' }
 * ```
 */
export function NORMALIZE_PAGINATION (_: {
  page: numeric
  perPage: numeric
  filteredCount: numeric
}): {
    normalizedPage: string
    normalizedPerPage: string
    normalizedPages: string
    normalizedOffset: string
    normalizedLimit: string
  } {
  const { page, perPage, filteredCount } = _
  const normalizedPerPage = NORMALIZE_PER_PAGE(perPage)
  const normalizedPages = NORMALIZE_PAGES({ normalizedPerPage, filteredCount })
  const normalizedPage = NORMALIZE_PAGE({ page, normalizedPages })
  const normalizedOffset = NORMALIZE_OFFSET({ normalizedPage, normalizedPerPage })
  const normalizedLimit = NORMALIZE_LIMIT(normalizedPerPage)

  return { normalizedPage, normalizedPerPage, normalizedPages, normalizedOffset, normalizedLimit }
}
