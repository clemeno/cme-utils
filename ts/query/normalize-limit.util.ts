import { TO_STRING } from '../convert/to-string.util.js'
import type { numeric } from '../numeric.js'

export const NORMALIZE_LIMIT = (normalizedPerPage: numeric): string => TO_STRING(normalizedPerPage)
