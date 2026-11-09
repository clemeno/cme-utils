/**
 * Cleans a string for an Excel cell: removes accents (NFKD), drops the characters outside a safe set, and collapses whitespace into single spaces.
 * @param s - The string to sanitize
 * @returns The sanitized string; characters outside the safe set (such as CJK) are dropped
 * @example
 * ```typescript
 * SANITIZE_STRING_FOR_EXCEL('Café\tau  lait') // returns 'Cafe au lait'
 * SANITIZE_STRING_FOR_EXCEL('日本') // returns ''
 * SANITIZE_STRING_FOR_EXCEL('') // returns ''
 * ```
 */
export function SANITIZE_STRING_FOR_EXCEL (s: string): string {
  return s.normalize('NFKD').replace(/[^\w\s-,_!?[\](){};'"<>.@|\\/]+/gi, '').replace(/[\n\t\s]+/gi, ' ')
}
