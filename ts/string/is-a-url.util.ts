/** @returns {boolean} `s` is a url string. It must be safe to instantiate a new URL(`s`) */
export function IS_A_URL (s: string): boolean {
  return /^(https?:)?\/\//.test(s)
}
