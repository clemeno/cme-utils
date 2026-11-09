/**
 * Reads the base URI of the current browser document, without its trailing slash.
 * @returns The base URI (e.g. `https://example.com/app`), or an empty string when there is no `window` (Node, Bun)
 * @example
 * ```typescript
 * // in a browser at https://example.com/app/, the call gives 'https://example.com/app'
 * // without a window
 * GET_BASE_URI() // returns ''
 * ```
 */
export function GET_BASE_URI (): string {
  let baseURI = ''

  try {
    // @ts-ignore
    baseURI = window.document.documentElement.baseURI.replace(/\/$/, '')
  } catch { }

  return baseURI
}
