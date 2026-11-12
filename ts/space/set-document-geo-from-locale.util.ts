/**
 * Sets the geo attribute of the document element from a locale: the part after the language. Does nothing outside a browser (no window).
 * @param locale - The locale, for example 'fr-CA'
 * @returns Nothing
 * @example
 * ```typescript
 * SET_DOCUMENT_GEO_FROM_LOCALE('fr-CA') // in a browser, sets <html geo="CA">
 * SET_DOCUMENT_GEO_FROM_LOCALE('zh-CN-Hans') // in a browser, sets <html geo="CN-Hans">
 * SET_DOCUMENT_GEO_FROM_LOCALE('fr') // in a browser, sets <html geo="">
 * // outside a browser (no window), it does nothing
 * SET_DOCUMENT_GEO_FROM_LOCALE('fr-CA') // returns undefined
 * ```
 */
export function SET_DOCUMENT_GEO_FROM_LOCALE (locale: string): void {
  // missing outside a browser (Node, bun, a worker)
  const globalWindow: Partial<Window> | undefined = globalThis.window
  globalWindow?.document?.documentElement?.setAttribute('geo', locale.split('-').slice(1).join('-'))
}
