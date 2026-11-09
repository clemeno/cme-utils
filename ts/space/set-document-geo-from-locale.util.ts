/**
 * Sets the geo attribute of the document element from a locale: the part after the language. Does nothing outside a browser (no window).
 * @param locale - The locale, for example 'fr-CA'
 * @returns Nothing
 * @example
 * ```typescript
 * SET_DOCUMENT_GEO_FROM_LOCALE('fr-CA') // returns undefined
 * ```
 */
export function SET_DOCUMENT_GEO_FROM_LOCALE (locale: string): void {
  try {
    // @ts-ignore
    window.document.documentElement.setAttribute('geo', locale.split('-').slice(1).join('-'))
  } catch {}
}
