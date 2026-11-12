/**
 * Sets the lang attribute of the document element. Does nothing outside a browser (no window).
 * @param lang - The lang, for example 'fr'
 * @returns Nothing
 * @example
 * ```typescript
 * SET_DOCUMENT_LANG('fr') // in a browser, sets <html lang="fr">
 * // outside a browser (no window), it does nothing
 * SET_DOCUMENT_LANG('fr') // returns undefined
 * ```
 */
export function SET_DOCUMENT_LANG (lang: string): void {
  // missing outside a browser (Node, bun, a worker)
  const globalWindow: Partial<Window> | undefined = globalThis.window
  globalWindow?.document?.documentElement?.setAttribute('lang', lang)
}
