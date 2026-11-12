/**
 * Reads the base URI of the current browser document, without its trailing slash.
 * @returns The base URI (e.g. `https://example.com/app`), or an empty string without a browser document (Node, bun, a worker)
 * @example
 * ```typescript
 * // in a browser at https://example.com/app/, the call gives 'https://example.com/app'
 * // without a window
 * GET_BASE_URI() // returns ''
 * ```
 */
export function GET_BASE_URI (): string {
  // missing outside a browser (Node, bun, a worker)
  const baseURI = globalThis.window?.document?.documentElement?.baseURI.replace(/\/$/, '') ?? ''

  return baseURI
}
