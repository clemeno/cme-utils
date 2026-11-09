/** @returns {boolean} `s` has the .png extension - case insensitive - in the end? */
export function IS_A_DOT_PNG (s: string): boolean {
  return /\.png$/i.test(s)
}
