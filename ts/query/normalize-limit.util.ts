import { TO_STRING } from '../convert/to-string.util.js'
import type { numeric } from '../numeric.js'

export function NORMALIZE_LIMIT (normalizedPerPage: numeric): string {
  return TO_STRING(normalizedPerPage)
}
