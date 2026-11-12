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
  // missing outside a browser (Node, bun, a worker)
  const globalWindow: Partial<Window> | undefined = globalThis.window
  const baseURI = globalWindow?.document?.documentElement?.baseURI.replace(/\/$/, '') ?? ''

  return baseURI
}
