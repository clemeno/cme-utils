/**
 * Checks whether a string ends with the .png extension, case insensitive.
 * @param s - The string to check
 * @returns true if `s` ends with .png, false otherwise
 * @example
 * ```typescript
 * IS_A_DOT_PNG('a.png') // returns true
 * IS_A_DOT_PNG('A.PNG') // returns true
 * IS_A_DOT_PNG('a.png.jpg') // returns false
 * IS_A_DOT_PNG('') // returns false
 * ```
 */
export function IS_A_DOT_PNG (s: string): boolean {
  return /\.png$/i.test(s)
}
