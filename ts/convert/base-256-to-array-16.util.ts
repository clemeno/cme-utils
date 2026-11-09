import { BASE_256_TO_ARRAY_10 } from './base-256-to-array-10.util.js'
import { FROM_BASE_10_TO_16 } from './from-base-10-to-16.util.js'

export function BASE_256_TO_ARRAY_16 (s: string): string[] {
  return BASE_256_TO_ARRAY_10(s).map(FROM_BASE_10_TO_16)
}
