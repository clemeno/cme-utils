/**
 * Checks whether a string is a url string, starting with http://, https:// or //. It must be safe to instantiate a new URL(`s`).
 * @param s - The string to check
 * @returns true if `s` looks like a url, false otherwise
 * @example
 * ```typescript
 * IS_A_URL('https://example.com/a.png') // returns true
 * IS_A_URL('//example.com') // returns true
 * IS_A_URL('./uploads/a.png') // returns false
 * IS_A_URL('') // returns false
 * ```
 */
export function IS_A_URL (s: string): boolean {
  return /^(https?:)?\/\//.test(s)
}
