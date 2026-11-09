/**
 * Sets the locale attribute of the document element. Does nothing outside a browser (no window).
 * @param locale - The locale, for example 'fr-CA'
 * @returns Nothing
 * @example
 * ```typescript
 * SET_DOCUMENT_LOCALE('fr-CA') // in a browser, sets <html locale="fr-CA">
 * // outside a browser (no window), it does nothing
 * SET_DOCUMENT_LOCALE('fr-CA') // returns undefined
 * ```
 */
export function SET_DOCUMENT_LOCALE (locale: string): void {
  try {
    // @ts-ignore
    window.document.documentElement.setAttribute('locale', locale)
  } catch {}
}
