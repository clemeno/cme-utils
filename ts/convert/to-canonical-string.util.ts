import { TO_STRING } from './to-string.util.js'

/**
 * Converts a value into a canonical string for comparison: TO_STRING, accents removed, lowercase.
 * @param _ - The value to convert
 * @returns The canonical string, empty for null and undefined
 * @example
 * ```typescript
 * TO_CANONICAL_STRING('Éléphant') // returns 'elephant'
 * TO_CANONICAL_STRING(42) // returns '42'
 * TO_CANONICAL_STRING(null) // returns ''
 * ```
 */
export function TO_CANONICAL_STRING (_: any): string {
  return TO_STRING(_).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}
