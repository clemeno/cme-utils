import type { numeric } from '../numeric.js'
import { NORMALIZE_LIMIT } from './normalize-limit.util.js'
import { NORMALIZE_OFFSET } from './normalize-offset.util.js'
import { NORMALIZE_PAGE } from './normalize-page.util.js'
import { NORMALIZE_PAGES } from './normalize-pages.util.js'
import { NORMALIZE_PER_PAGE } from './normalize-per-page.util.js'

export const NORMALIZE_PAGINATION = (_: {
  page: numeric
  perPage: numeric
  filteredCount: numeric
}): {
  normalizedPage: string
  normalizedPerPage: string
  normalizedPages: string
  normalizedOffset: string
  normalizedLimit: string
} => {
  const { page, perPage, filteredCount } = _
  const normalizedPerPage = NORMALIZE_PER_PAGE(perPage)
  const normalizedPages = NORMALIZE_PAGES({ normalizedPerPage, filteredCount })
  const normalizedPage = NORMALIZE_PAGE({ page, normalizedPages })
  const normalizedOffset = NORMALIZE_OFFSET({ normalizedPage, normalizedPerPage })
  const normalizedLimit = NORMALIZE_LIMIT(normalizedPerPage)

  return { normalizedPage, normalizedPerPage, normalizedPages, normalizedOffset, normalizedLimit }
}
